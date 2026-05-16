interface FilterPanelProps {
	columnId: string;
	values: string[];
	selectedFilters: string[];
	onFilterChange: (columnId: string, value: string) => void;
	isVisible: boolean;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

export function FilterPanel({
	columnId,
	values,
	selectedFilters,
	onFilterChange,
	isVisible,
	onMouseEnter,
	onMouseLeave,
}: FilterPanelProps) {
	const displayLimit = 20;
	const isLimitedDisplay = values.length > displayLimit;
	const valuesToShow = isLimitedDisplay ? values.slice(0, displayLimit) : values;

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
			<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
				{valuesToShow.map((value) => (
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
				{isLimitedDisplay && (
					<div style={{ marginTop: "5px", fontSize: "11px", color: "var(--text-secondary)", fontStyle: "italic" }}>
						... and {values.length - displayLimit} more
					</div>
				)}
			</div>
		</div>
	);
}
