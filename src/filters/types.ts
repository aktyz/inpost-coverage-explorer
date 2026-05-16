import { type CountryCode, type PointType, type Status } from "../types/point";

export interface PointFilters {
	country: CountryCode | "ALL";
	status: Status | "ALL";
	type: PointType | "ALL";

	search: string;
}
