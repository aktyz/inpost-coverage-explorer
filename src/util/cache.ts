/**
 * Cache management utility using IndexedDB for large datasets
 * Stores data with timestamps for optional expiration
 */

interface CacheEntry<T> {
  key: string;
  data: T;
  timestamp: number;
}

const DB_NAME = "InPostCache";
const STORE_NAME = "cache";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

const CACHE_KEYS = {
  INPOST_POINTS: "inpost_points_cache",
} as const;

let dbInstance: IDBDatabase | null = null;

async function getDB(): Promise<IDBDatabase> {
  if (dbInstance) return dbInstance;

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => {
      console.error("IndexedDB open failed:", request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };
  });
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onerror = () => {
        console.error("Cache read error:", request.error);
        resolve(null);
      };

      request.onsuccess = () => {
        const entry: CacheEntry<T> | undefined = request.result;
        if (!entry) {
          console.log(`Cache miss for key: ${key}`);
          resolve(null);
          return;
        }

        const now = Date.now();
        // Check if cache has expired
        if (now - entry.timestamp > CACHE_DURATION_MS) {
          console.log(`Cache expired for key: ${key}`);
          deleteCacheData(key);
          resolve(null);
          return;
        }

        console.log(
          `Cache hit for key: ${key}. Age: ${Math.round((now - entry.timestamp) / 1000)}s`
        );
        resolve(entry.data);
      };
    });
  } catch (error) {
    console.error("Error reading from cache:", error);
    return null;
  }
}

export async function setCacheData<T>(key: string, data: T): Promise<void> {
  try {
    const db = await getDB();
    const serialized = JSON.stringify(data);
    const sizeInMB = (new Blob([serialized]).size / 1024 / 1024).toFixed(2);
    console.log(`Caching data for key: ${key}. Size: ${sizeInMB}MB`);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const entry: CacheEntry<T> = {
        key,
        data,
        timestamp: Date.now(),
      };
      const request = store.put(entry);

      request.onerror = () => {
        console.error("Cache write error:", request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        console.log(`Successfully cached ${key}`);
        resolve();
      };
    });
  } catch (error) {
    console.error("Error writing to cache:", error);
  }
}

export async function deleteCacheData(key: string): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        console.log(`Deleted cache for key: ${key}`);
        resolve();
      };
    });
  } catch (error) {
    console.error("Error deleting cache:", error);
  }
}

export async function clearAllCache(): Promise<void> {
  try {
    const db = await getDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        console.log("Cleared all cache");
        resolve();
      };
    });
  } catch (error) {
    console.error("Error clearing all cache:", error);
  }
}

export { CACHE_KEYS };
