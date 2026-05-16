export const COUNTRY_CODES = [
	"AT", "BE", "DE", "DK", "ES", "FI", "FR",
	"GB", "HU", "IT", "LU", "NL", "PL", "PT", "SE"
] as const;

export type CountryCode = typeof COUNTRY_CODES[number];

export const STATUSES = [
	"Created",
	"Disabled",
	"NonOperating",
	"Operating",
	"Overloaded"
] as const;

export type Status = typeof STATUSES[number];

export const POINT_TYPES = [
	"parcel_locker",
	"parcel_locker_superpop",
	"pok",
	"pop",
	"pudo_mini",
	"refrigerated_locker_machine"
] as const;

export type PointType = typeof POINT_TYPES[number];

export interface Point {
	name: string; // "ADA01M"
	types: PointType[]; // ["parcel_locker"]
	status: Status; // "Operating"

	country: CountryCode; // "PL"
	latitude: number; // 22.26405
	longitude: number; // 51.73834
	location_description: string; // "At the Lewiatan store"
	opening_hours: string; // "24/7"

	city: string; // "Adamów"
	province: string; // "lubelskie"
	post_code: string; // "21-412"
	street: string; // "Kościuszki"
	building_number: string; // "27"
	flat_number: string; // null
	payment_available: boolean; // true

	image_url: string; // "https://static.easypack24.net/points/pl/images/ADA01M.jpg"

	delivery_area_id: string; // "OOO"
	micro_delivery_area_id: string; // "OOOG"
}
