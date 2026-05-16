import { useState } from "react";
import { type Point } from "../types/point";

interface Props {
	points: Point[];
}

const ITEMS_PER_PAGE = 50;

export function PointsTable({ points }: Props) {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(points.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentPoints = points.slice(startIndex, endIndex);

	return (
		<div>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Country</th>
					<th>City</th>
					<th>Status</th>
					<th>Types</th>
					<th>Address</th>
					<th>Location Description</th>
				</tr>
			</thead>

			<tbody>
				{currentPoints.map(point => (
					<tr key={point.name}>
						<td>{point.name}</td>
						<td>{point.country}</td>
						<td>{point.city}</td>
						<td>{point.status}</td>
						<td>
							{point.types.join(", ")}
						</td>
						<td>
							{point.street}{point.building_number ? "  " + point.building_number : ""}{point.flat_number ? "\\" + point.flat_number : ""}
						</td>
						<td>{point.location_description}</td>
					</tr>
				))}
			</tbody>
		</table>

		<div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
			<button
				onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
				disabled={currentPage === 1}
			>
				Previous
			</button>
			<span>
				Page {currentPage} of {totalPages}
			</span>
			<button
				onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</div>
		</div>
	);
}
