import { type Point } from "../types/point";
import { type PointFilters } from "./types";

export function filterPoints(
	points: Point[],
	filters: PointFilters
) {
	return points.filter(point => {
		const matchesCountry =
			filters.country === "ALL" ||
			point.country === filters.country;

		const matchesStatus =
			filters.status === "ALL" ||
			point.status === filters.status;

		const matchesType =
			filters.type === "ALL" ||
			point.types.includes(filters.type);

		const search = filters.search.toLowerCase();

		const matchesSearch =
			search === "" ||
			point.name.toLowerCase().includes(search) ||
			point.city.toLowerCase().includes(search);

		return (
			matchesCountry &&
			matchesStatus &&
			matchesType &&
			matchesSearch
		);
	});
}
