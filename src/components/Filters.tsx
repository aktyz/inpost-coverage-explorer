import {
	COUNTRY_CODES,
	STATUSES,
	POINT_TYPES
} from "../types/point";

import { type PointFilters } from "../filters/types";

interface Props {
	filters: PointFilters;
	onChange: (filters: PointFilters) => void;
}

export function Filters({
	filters,
	onChange
}: Props) {
	return (
		<div>
			<select
				value={filters.country}
				onChange={(e) =>
					onChange({
						...filters,
						country: e.target.value as any
					})
				}
			>
				<option value="ALL">All Countries</option>

				{COUNTRY_CODES.map(country => (
					<option
						key={country}
						value={country}
					>
						{country}
					</option>
				))}
			</select>

			<select
				value={filters.status}
				onChange={(e) =>
					onChange({
						...filters,
						status: e.target.value as any
					})
				}
			>
				<option value="ALL">All Statuses</option>

				{STATUSES.map(status => (
					<option
						key={status}
						value={status}
					>
						{status}
					</option>
				))}
			</select>

			<select
				value={filters.type}
				onChange={(e) =>
					onChange({
						...filters,
						type: e.target.value as any
					})
				}
			>
				<option value="ALL">All Types</option>

				{POINT_TYPES.map(type => (
					<option
						key={type}
						value={type}
					>
						{type}
					</option>
				))}
			</select>

			<input
				placeholder="Search city or name"
				value={filters.search}
				onChange={(e) =>
					onChange({
						...filters,
						search: e.target.value
					})
				}
			/>
		</div>
	);
}
