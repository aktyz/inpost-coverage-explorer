import { useState, useMemo } from "react";
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type SortingState,
} from "@tanstack/react-table";
import { type Point } from "../types/point";
import { FilterPanel } from "./FilterPanel";

interface Props {
	points: Point[];
}

const ITEMS_PER_PAGE = 50;

// Type for column filters: column ID -> array of selected values
type ColumnFilters = Record<string, (string | string[])[]>;
// Type for text search filters: column ID -> search string
type TextSearchFilters = Record<string, string>;

const defaultColumns: ColumnDef<Point, any>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "country",
		header: "Country",
	},
	{
		accessorKey: "city",
		header: "City",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "types",
		header: "Types",
		cell: (info) => (info.getValue() as string[]).join(", "),
	},
	{
		id: "address",
		header: "Address",
		cell: (info) => {
			const row = info.row.original;
			const parts = [row.street];
			if (row.building_number) parts.push(row.building_number);
			if (row.flat_number) parts.push(`\\${row.flat_number}`);
			return parts.join("  ");
		},
	},
	{
		accessorKey: "location_description",
		header: "Location Description",
	},
];

export function PointsTable({ points }: Props) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFilters>({});
	const [textSearchFilters, setTextSearchFilters] = useState<TextSearchFilters>({});
	const [hoveredFilterColumn, setHoveredFilterColumn] = useState<string | null>(null);

	// Extract unique values for each column
	const uniqueColumnValues = useMemo(() => {
		const values: Record<string, Set<string>> = {
			name: new Set(),
			country: new Set(),
			city: new Set(),
			status: new Set(),
			types: new Set(),
			location_description: new Set(),
		};

		points.forEach((point) => {
			values.name.add(point.name);
			values.country.add(point.country);
			values.city.add(point.city);
			values.status.add(point.status);
			point.types.forEach((type) => values.types.add(type));
			values.location_description.add(point.location_description);
		});

		// Convert sets to sorted arrays
		const result: Record<string, string[]> = {};
		Object.entries(values).forEach(([key, set]) => {
			result[key] = Array.from(set).sort();
		});
		return result;
	}, [points]);

	// Apply column filters and text search filters
	const filteredPoints = useMemo(() => {
		const hasCheckboxFilters = Object.keys(columnFilters).length > 0;
		const hasTextSearchFilters = Object.keys(textSearchFilters).length > 0 && Object.values(textSearchFilters).some(v => v.length > 0);

		if (!hasCheckboxFilters && !hasTextSearchFilters) {
			return points;
		}

		return points.filter((point) => {
			// Apply checkbox filters (OR logic within columns, AND logic between columns)
			for (const [columnId, selectedValues] of Object.entries(columnFilters)) {
				if (selectedValues.length === 0) continue;

				let matches = false;
				const pointValue = (point as any)[columnId];

				if (Array.isArray(pointValue)) {
					matches = selectedValues.some((selectedValue) =>
						pointValue.includes(selectedValue as string)
					);
				} else {
					matches = selectedValues.includes(pointValue);
				}

				if (!matches) {
					return false;
				}
			}

			// Apply text search filters (case-insensitive substring matching)
			for (const [columnId, searchValue] of Object.entries(textSearchFilters)) {
				if (!searchValue.length) continue;

				let searchText = "";

				// Handle different column types
				if (columnId === "address") {
					const parts = [point.street];
					if (point.building_number) parts.push(point.building_number);
					if (point.flat_number) parts.push(point.flat_number);
					searchText = parts.join(" ");
				} else {
					const pointValue = (point as any)[columnId];
					searchText = String(pointValue || "");
				}

				// Case-insensitive substring match
				if (!searchText.toLowerCase().includes(searchValue.toLowerCase())) {
					return false;
				}
			}

			return true;
		});
	}, [points, columnFilters, textSearchFilters]);

	const table = useReactTable({
		data: filteredPoints,
		columns: defaultColumns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: ITEMS_PER_PAGE,
			},
		},
	});

	const getSortIndicator = (columnId: string) => {
		const sortingState = table.getState().sorting;
		const sortingColumn = sortingState.find((s) => s.id === columnId);
		if (!sortingColumn) return null;
		return sortingColumn.desc ? " ↓" : " ↑";
	};

	const toggleColumnFilter = (columnId: string, value: string) => {
		setColumnFilters((prev) => {
			const currentFilters = prev[columnId] || [];
			const newFilters = currentFilters.includes(value)
				? currentFilters.filter((v) => v !== value)
				: [...currentFilters, value];

			if (newFilters.length === 0) {
				const updated = { ...prev };
				delete updated[columnId];
				return updated;
			}

			return {
				...prev,
				[columnId]: newFilters,
			};
		});
	};

	const handleTextSearchChange = (columnId: string, value: string) => {
		setTextSearchFilters((prev) => {
			if (!value) {
				const updated = { ...prev };
				delete updated[columnId];
				return updated;
			}
			return {
				...prev,
				[columnId]: value,
			};
		});
	};

	const clearAllFilters = () => {
		setColumnFilters({});
		setTextSearchFilters({});
	};

	return (
		<div>
			{/* Column Filters Summary */}
			<div style={{ marginTop: "20px", marginBottom: "20px" }}>
			{(Object.keys(columnFilters).length > 0 || Object.values(textSearchFilters).some(v => v.length > 0)) && (
				<div>
					<strong>Active Filters:</strong>
					{Object.entries(columnFilters).map(([columnId, values]) => (
						<div key={columnId} style={{ fontSize: "12px", marginTop: "5px" }}>
							<strong>{columnId.charAt(0).toUpperCase() + columnId.slice(1).replace(/_/g, " ")}:</strong> {(values as string[]).join(", ")}
						</div>
					))}
					{Object.entries(textSearchFilters).map(([columnId, searchValue]) => (
						searchValue && (
							<div key={columnId} style={{ fontSize: "12px", marginTop: "5px" }}>
								<strong>{columnId.charAt(0).toUpperCase() + columnId.slice(1).replace(/_/g, " ")}:</strong> "{searchValue}"
							</div>
						)
						))}
						<button onClick={clearAllFilters} style={{ marginTop: "10px", padding: "4px 8px" }}>
							Clear All Filters
						</button>
					</div>
				)}
			</div>

			{/* Table */}
			<table style={{ position: "relative" }}>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								const columnId = header.column.id;
								const showFilterPanel = hoveredFilterColumn === columnId;
								const values = uniqueColumnValues[columnId as keyof typeof uniqueColumnValues] || [];
								const selectedFilters = (columnFilters[columnId] || []) as string[];


								return (
									<th
										key={header.id}
										onClick={header.column.getToggleSortingHandler()}
										title={header.column.getCanSort() ? "Click to sort" : undefined}
										onMouseEnter={() => setHoveredFilterColumn(columnId)}
										onMouseLeave={() => setHoveredFilterColumn(null)}
										style={{ position: "relative", cursor: header.column.getCanSort() ? "pointer" : "default" }}
									>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
										{header.column.getCanSort() && getSortIndicator(header.column.id)}

										{/* Filter Panel - Shows on Hover */}
										<FilterPanel
											columnId={columnId}
											values={values}
											selectedFilters={selectedFilters}
											onFilterChange={toggleColumnFilter}
											isVisible={showFilterPanel}
											onMouseEnter={() => setHoveredFilterColumn(columnId)}
											onMouseLeave={() => setHoveredFilterColumn(null)}
											searchValue={textSearchFilters[columnId] || ""}
											onSearchChange={handleTextSearchChange}
										/>
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination Controls */}
			<div>
				<div>
					<button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</button>
					<span>
						Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</span>
					<button
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</button>
				</div>

				<span>
					Showing {table.getRowModel().rows.length} of {filteredPoints.length} results
				</span>
			</div>
		</div>
	);
}
