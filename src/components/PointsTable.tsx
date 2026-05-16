import { type Point } from "../types/point";

interface Props {
	points: Point[];
}

export function PointsTable({ points }: Props) {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Country</th>
					<th>City</th>
					<th>Status</th>
					<th>Types</th>
				</tr>
			</thead>

			<tbody>
				{points.slice(0, 200).map(point => (
					<tr key={point.name}>
						<td>{point.name}</td>
						<td>{point.country}</td>
						<td>{point.city}</td>
						<td>{point.status}</td>
						<td>
							{point.types.join(", ")}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
