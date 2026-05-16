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

	if (!isVisible) {
		return null;
	}

	return (
		<div
			style={{
				position: "absolute",
				top: "100%",
				left: "0",
				backgroundColor: "var(--background-secondary)",
				border: "1px solid var(--border-color)",
				borderRadius: "4px",
				padding: "10px",
				minWidth: "250px",
				maxWidth: "300px",
				maxHeight: "300px",
				overflowY: "auto",
				zIndex: 1000,
				boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
			}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{isTextSearch ? (
				<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
						style={{
							padding: "6px",
							border: "1px solid var(--border-color)",
							borderRadius: "3px",
							fontSize: "12px",
							backgroundColor: "var(--background-primary)",
							color: "var(--text-primary)",
						}}
					/>
					{inputValue && (
						<button
							onClick={() => {
								setInputValue("");
								onSearchChange?.(columnId, "");
							}}
							style={{
								padding: "4px 8px",
								fontSize: "12px",
								backgroundColor: "var(--background-secondary)",
								border: "1px solid var(--border-color)",
								borderRadius: "3px",
								cursor: "pointer",
							}}
						>
							Clear
						</button>
					)}
				</div>
			) : (
				<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
					{values.map((value) => (
						<label key={value} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "12px" }}>
							<input
								type="checkbox"
								checked={selectedFilters.includes(value)}
								onChange={() => onFilterChange(columnId, value)}
								style={{ cursor: "pointer" }}
							/>
							<span>{value}</span>
						</label>
					))}
					{values.length > 20 && (
						<div style={{ marginTop: "5px", fontSize: "11px", color: "var(--text-secondary)", fontStyle: "italic" }}>
							... and {values.length - 20} more
						</div>
					)}
				</div>
			)}
		</div>
	);
}
