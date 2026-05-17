import { useState, useEffect } from "react";

interface FilterPanelProps {
	columnId: string;
	values: string[];
	selectedFilters: string[];
	onFilterChange: (columnId: string, value: string) => void;
	isVisible: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	searchValue?: string;
	onSearchChange?: (columnId: string, value: string) => void;
}

const TEXT_SEARCH_COLUMNS = ["name", "city", "address", "location_description"];

export function FilterPanel({
	columnId,
	values,
	selectedFilters,
	onFilterChange,
	isVisible,
	onMouseEnter,
	onMouseLeave,
	searchValue = "",
	onSearchChange,
}: FilterPanelProps) {
	const isTextSearch = TEXT_SEARCH_COLUMNS.includes(columnId);
	const [inputValue, setInputValue] = useState(searchValue);

	useEffect(() => {
		setInputValue(searchValue);
	}, [searchValue]);

	return (
		<div
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={(e) => e.stopPropagation()}
			className={`
				absolute
				z-50
				mt-2
				w-72
				bg-white
				border
				border-gray-200
				rounded-xl
				shadow-lg
				p-3
				transition
				duration-150
				${isVisible ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}
			`}
		>
			{isTextSearch ? (
				<div className="space-y-2">
					<input
						type="text"
						placeholder="Search..."
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								onSearchChange?.(columnId, inputValue);
							}
						}}
						className="
							w-full
							px-3
							py-2
							text-sm
							border
							border-gray-300
							rounded-lg
							bg-white
							text-gray-800
							placeholder-gray-400
							focus:outline-none
							focus:ring-2
							focus:ring-yellow-400
						"
					/>
					{inputValue && (
						<button
							onClick={() => {
								setInputValue("");
								onSearchChange?.(columnId, "");
							}}
							className="
								text-sm
								text-gray-600
								hover:text-gray-900
								transition-colors
							"
						>
							Clear
						</button>
					)}
				</div>
			) : (
				<div className="max-h-60 overflow-y-auto space-y-2 pr-1">
					{values.map((value) => (
						<label
							key={value}
							className="
								flex
								items-center
								gap-2
								text-sm
								text-gray-700
								hover:bg-gray-50
								px-2
								py-1
								rounded-md
								cursor-pointer
							"
						>
							<input
								type="checkbox"
								checked={selectedFilters.includes(value)}
								onChange={() => onFilterChange(columnId, value)}
								className="
									accent-yellow-400
									w-4
									h-4
								"
							/>
							<span className="select-none">{value}</span>
						</label>
					))}
					{values.length > 20 && (
						<div
							className="text-xs text-gray-500 mt-2 px-2"
						>
							... and {values.length - 20} more
						</div>
					)}
				</div>
			)}
		</div>
	);
}
