import { useMemo } from "react";
import { type Point } from "../types/point";

interface Props {
	allPoints: Point[];
	filteredPoints: Point[];
}

export function CountryAnalytics({ allPoints, filteredPoints }: Props) {
	const stats = useMemo(() => {
		const totalByCountry = new Map<string, number>();
		const filteredByCountry = new Map<string, number>();

		allPoints.forEach((p) => {
			totalByCountry.set(p.country, (totalByCountry.get(p.country) ?? 0) + 1);
		});

		filteredPoints.forEach((p) => {
			filteredByCountry.set(p.country, (filteredByCountry.get(p.country) ?? 0) + 1);
		});

		return Array.from(totalByCountry.entries())
			.map(([country, total]) => ({
				country,
				total,
				filtered: filteredByCountry.get(country) ?? 0,
			}))
			.sort((a, b) => b.filtered - a.filtered);
	}, [allPoints, filteredPoints]);

	return (
		<div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
			<h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
				Points per Country
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
				{stats.map(({ country, total, filtered }) => {
					const ratio = total > 0 ? filtered / total : 0;
					return (
						<div
							key={country}
							className="border border-gray-100 rounded-xl p-3 bg-gray-50"
						>
							<div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
								{country}
							</div>
							<div className="mt-1 text-2xl font-bold text-gray-900">
								{filtered.toLocaleString()}
							</div>
							<div className="text-xs text-gray-400">
								of {total.toLocaleString()}
							</div>
							<div className="mt-2 h-1.5 rounded-full bg-gray-200 overflow-hidden">
								<div
									className="h-full bg-yellow-400 rounded-full transition-all duration-300"
									style={{ width: `${ratio * 100}%` }}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
