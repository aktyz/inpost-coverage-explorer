const BASE_URL = "https://api-global-points.easypack24.net/v1/points";

export async function fetchPoints() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch InPost points");
  }

  const data = await response.json();

  return data;
}

export async function fetchAllPoints() {
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
	return allPoints;
}
