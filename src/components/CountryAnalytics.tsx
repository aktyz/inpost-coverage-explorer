import { useMemo } from "react";
import { type Point, type Status, STATUSES } from "../types/point";

interface Props {
	filteredPoints: Point[];
}

const STATUS_STYLES: Record<Status, { bar: string; dot: string; label: string }> = {
	Operating:    { bar: "bg-emerald-500", dot: "bg-emerald-500", label: "Operating" },
	Overloaded:   { bar: "bg-red-500",     dot: "bg-red-500",     label: "Overloaded" },
	NonOperating: { bar: "bg-amber-400",   dot: "bg-amber-400",   label: "Non-Operating" },
	Created:      { bar: "bg-sky-400",     dot: "bg-sky-400",     label: "Created" },
	Disabled:     { bar: "bg-gray-300",    dot: "bg-gray-300",    label: "Disabled" },
};

const STATUS_ORDER: Status[] = ["Operating", "Overloaded", "NonOperating", "Created", "Disabled"];

const emptyByStatus = (): Record<Status, number> =>
	Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<Status, number>;

export function CountryAnalytics({ filteredPoints }: Props) {
	const { stats, totalFiltered } = useMemo(() => {
		const countByCountry = new Map<string, number>();
		const statusByCountry = new Map<string, Record<Status, number>>();

		filteredPoints.forEach((p) => {
			countByCountry.set(p.country, (countByCountry.get(p.country) ?? 0) + 1);

			if (!statusByCountry.has(p.country)) {
				statusByCountry.set(p.country, emptyByStatus());
			}
			statusByCountry.get(p.country)![p.status]++;
		});

		const sorted = Array.from(countByCountry.entries())
			.map(([country, count]) => ({
				country,
				count,
				byStatus: statusByCountry.get(country) ?? emptyByStatus(),
			}))
			.sort((a, b) => b.count - a.count);

		return { stats: sorted, totalFiltered: filteredPoints.length };
	}, [filteredPoints]);

	return (
		<div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
			<div className="flex flex-wrap items-center justify-between gap-4 mb-4">
				<h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
					Points per Country
				</h2>
				<div className="flex flex-wrap gap-x-4 gap-y-1">
					{STATUS_ORDER.map((status) => (
						<span key={status} className="flex items-center gap-1.5 text-xs text-gray-500">
							<span className={`inline-block w-2 h-2 rounded-full ${STATUS_STYLES[status].dot}`} />
							{STATUS_STYLES[status].label}
						</span>
					))}
				</div>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
				{stats.map(({ country, count, byStatus }) => (
					<div
						key={country}
						className="
							border border-gray-100 rounded-xl p-3
							bg-gray-50 hover:bg-yellow-50
							transition-colors duration-150
						"
					>
						<div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
							{country}
						</div>
						<div className="mt-1 text-2xl font-extrabold text-gray-900 leading-none">
							{count.toLocaleString()}
						</div>
						<div className="mt-0.5 text-xs text-gray-400">
							of {totalFiltered.toLocaleString()}
						</div>

						{/* Bar: always full width, segments = status share within this country's filtered points */}
						<div className="mt-3 h-1.5 rounded-full bg-gray-200 overflow-hidden flex">
							{STATUS_ORDER.map((status) => {
								const pct = count > 0 ? (byStatus[status] / count) * 100 : 0;
								if (pct === 0) return null;
								return (
									<div
										key={status}
										className={`h-full ${STATUS_STYLES[status].bar} transition-all duration-300`}
										style={{ width: `${pct}%` }}
										title={`${STATUS_STYLES[status].label}: ${byStatus[status].toLocaleString()}`}
									/>
								);
							})}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
