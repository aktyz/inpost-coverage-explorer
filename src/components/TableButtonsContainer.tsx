interface TableButtonsContainerProps {
	onClearFilters: () => void;
	onPreviousPage: () => void;
	onNextPage: () => void;
	canGoPrevious: boolean;
	canGoNext: boolean;
	hasActiveFilters: boolean;
	currentPage: number;
	pageCount: number;
	filteredRowCount: number;
	totalRowCount: number;
	columnFilters: Record<string, (string | string[])[]>;
	textSearchFilters: Record<string, string>;
}

export function TableButtonsContainer({
	onClearFilters,
	onPreviousPage,
	onNextPage,
	canGoPrevious,
	canGoNext,
	hasActiveFilters,
	currentPage,
	pageCount,
	filteredRowCount,
	totalRowCount,
	columnFilters,
	textSearchFilters,
}: TableButtonsContainerProps) {
	return (
		<div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4">
			{/* Column Filters Summary */}
			{(Object.keys(columnFilters).length > 0 || Object.values(textSearchFilters).some(v => v.length > 0)) && (
				<div
					className="
					bg-white
					border
					border-gray-200
					rounded-xl
					p-4
					shadow-sm
					space-y-3
				"
				>
					<h2 className="text-sm font-semibold text-gray-800">
						Active Filters
					</h2>
					<div className="flex flex-wrap gap-2">
					{Object.entries(columnFilters).map(([columnId, values]) => (
						<div
							key={columnId}
							className="
								inline-flex
								items-center
								gap-2
								bg-yellow-50
								border
								border-yellow-200
								text-gray-800
								rounded-lg
								px-3
								py-2
								text-sm
							"
						>
							<span className="font-semibold text-black">
							{columnId.charAt(0).toUpperCase() + columnId.slice(1).replace(/_/g, " ")}:
							</span>
							<span className="text-gray-700">
								{(values as string[]).join(", ")}
							</span>
						</div>
					))}
					{Object.entries(textSearchFilters).map(([columnId, searchValue]) => (
						searchValue && (
							<div
								key={columnId}
								className="
									inline-flex
									items-center
									gap-2
									bg-yellow-50
									border
									border-yellow-200
									text-gray-800
									rounded-lg
									px-3
									py-2
									text-sm
								"
							>
								<span
									className="font-semibold text-black"
								>
									{columnId.charAt(0).toUpperCase() + columnId.slice(1).replace(/_/g, " ")}:
								</span>
								<span className="text-gray-700">
								"{searchValue}"
								</span>
							</div>
						)
						))}
					</div>
					{/* Filter Controls */}
					{hasActiveFilters && (
						<div className="flex justify-end">
							<button
								onClick={onClearFilters}
								className="
									bg-yellow-400
									hover:bg-yellow-500
									text-black
									font-medium
									px-4
									py-2
									rounded-lg
									transition-colors
									duration-200
								"
							>
								Clear All Filters
							</button>
						</div>
					)}
				</div>
			)}



			{/* Pagination Controls */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex items-center gap-3">
					<button
						onClick={onPreviousPage}
						disabled={!canGoPrevious}
						className="
							px-4
							py-2
							rounded-lg
							border
							border-gray-300
							bg-white
							text-gray-800
							font-medium
							hover:bg-gray-100
							disabled:opacity-40
							disabled:cursor-not-allowed
							transition-colors
							duration-200
						"
					>
						Previous
					</button>
					<span className="text-sm font-medium text-gray-700">
						Page {currentPage} of {pageCount}
					</span>
					<button
						onClick={onNextPage}
						disabled={!canGoNext}
						className="
							px-4
							py-2
							rounded-lg
							border
							border-gray-300
							bg-white
							text-gray-800
							font-medium
							hover:bg-gray-100
							disabled:opacity-40
							disabled:cursor-not-allowed
							transition-colors
							duration-200
						"
					>
						Next
					</button>
				</div>

				<span className="text-sm text-gray-600">
					Showing {filteredRowCount} of {totalRowCount} results
				</span>
			</div>
		</div>
	);
}
