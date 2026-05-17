import { mapInpostPointApiToPoint } from "../mappers/pointMapper";
import { getCachedData, setCacheData, CACHE_KEYS } from "../util/cache";
import type { Point } from "../types/point";

const BASE_URL = "https://api-global-points.easypack24.net/v1/points";

export async function fetchPoints() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch InPost points");
  }

  const data = await response.json();

  return data;
}

export async function fetchAllPoints(forceRefresh: boolean = false): Promise<{ points: Point[]; fromCache: boolean }> {
	// Check cache first if not forcing refresh
	if (!forceRefresh) {
		const cached = await getCachedData<Point[]>(CACHE_KEYS.INPOST_POINTS);
		if (cached) {
			console.log("Loading data from cache");
			return { points: cached, fromCache: true };
		}
	}

	console.log("Fetching fresh data from API");
	let allPoints = [];
	let page = 1;
	let hasMore = true;

	while (hasMore) {
		const response = await fetch(
			`${BASE_URL}?page=${page}&per_page=500`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch InPost points");
		}

		const data = await response.json();
		allPoints.push(...data.items);
		hasMore = data.items.length > 0;
		page++;
	}

	const excludedNames = new Set([
		"FR000001",
		"FR00666T",
		"FR00667T",
		"FR03296T",
		"FR066974T",
		"PNN01M",
		"GLE01M",
		"OCZ01G",
		"KRA50N",
		"KON08N"
	]);

	// Filter out points with city name "test" (case-insensitive) or name containing "test"
	const filteredPoints = allPoints.filter(
		point =>
			!excludedNames.has(point.name) &&
			point.address_details.city.toLowerCase() !== "test" &&
			!point.name.toLowerCase().includes("test")
	);

	const mappedPoints = filteredPoints.map(mapInpostPointApiToPoint);

	// Store in cache
	await setCacheData(CACHE_KEYS.INPOST_POINTS, mappedPoints);

	return { points: mappedPoints, fromCache: false };
}
