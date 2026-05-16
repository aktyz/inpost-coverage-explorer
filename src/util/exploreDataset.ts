import { type Point } from "../types/point";

export function getUniqueCountries(points: Point[]) {
	return [...new Set(points.map(point => point.country))]
		.sort();
}

export function getUniqueStatuses(points: Point[]) {
	return [...new Set(points.map(point => point.status))]
		.sort();
}

export function getUniquePointTypes(points: Point[]) {
	return [
		...new Set(
			points.flatMap(point => point.types)
		)
	].sort();
}
