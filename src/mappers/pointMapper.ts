import { type InPostPointApi } from "../types/inpost";
import { type Point, type PointType, type Status, type CountryCode } from "../types/point";

function normalizePointType(rawType: string): PointType {
	const normalized = rawType.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");
	return normalized as PointType;
}

function normalizeStatus(rawStatus: string): Status {
	return rawStatus as Status;
}

function normalizeCountryCode(rawCountry: string): CountryCode {
	return rawCountry as CountryCode;
}

export function mapInpostPointApiToPoint(
	apiPoint: InPostPointApi
): Point {
	return {
		name: apiPoint.name,
		types: apiPoint.type.map(normalizePointType),
		status: normalizeStatus(apiPoint.status),

		country: normalizeCountryCode(apiPoint.country),
		latitude: apiPoint.location.latitude,
		longitude: apiPoint.location.longitude,
		location_description: apiPoint.location_description,
		opening_hours: apiPoint.opening_hours,

		city: apiPoint.address_details.city,
		province: apiPoint.address_details.province,
		post_code: apiPoint.address_details.post_code,
		street: apiPoint.address_details.street,
		building_number: apiPoint.address_details.building_number,
		flat_number: apiPoint.address_details.flat_number,
		payment_available: apiPoint.payment_available,

		image_url: apiPoint.image_url,
		delivery_area_id: apiPoint.delivery_area_id,
		micro_delivery_area_id: apiPoint.micro_area_id
	};
}
