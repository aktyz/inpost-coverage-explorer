
export interface InPostPointApi {
	name: string;
	country: string;
	type: string[];
	status: string;
	location: {
		latitude: number;
		longitude: number;
	}
	location_description: string;
	opening_hours: string;
	address_details: {
		city: string;
		province: string;
		post_code: string;
		street: string;
		building_number: string;
		flat_number: string;
	}
	payment_available: boolean;
	image_url: string;
	delivery_area_id: string;
	micro_area_id: string;
}
