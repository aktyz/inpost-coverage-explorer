
export interface InPostPointApi {
	name: string; // "ADA01M"
	type: string[]; // ["parcel_locker"]
	status: string; // "Operating"

	country: string; // "PL"
	location: {
		latitude: number; // 22.26405
		longitude: number; // 51.73834
	}
	location_description: string; // "At the Lewiatan store"
	opening_hours: string; // "24/7"
	address_details: {
		city: string; // "Adamów"
		province: string; // "lubelskie"
		post_code: string; // "21-412"
		street: string; // "Kościuszki"
		building_number: string; // "27"
		flat_number: string; // null
	}
	payment_available: boolean; // true
	image_url: string; // "https://static.easypack24.net/points/pl/images/ADA01M.jpg"
	delivery_area_id: string; // "OOO"
	micro_area_id: string; // "OOOG"
}
