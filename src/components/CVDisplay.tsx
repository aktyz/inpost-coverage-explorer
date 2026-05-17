interface CVData {
	name: string;
	title: string;
	phone: string;
	email: string;
	github: string;
	linkedin: string;
	summary: string;
	skills: {
		languages: string[];
		backendData: string[];
		toolsInfra: string[];
		debuggingSystems: string[];
		ai: string[];
		foreignLanguages: string[];
	};
	experience: Array<{
		title: string;
		company: string;
		period: string;
		highlights: string[];
	}>;
	education: Array<{
		program: string;
		institution: string;
		period: string;
	}>;
	additional: string[];
}

const cvData: CVData = {
	name: "ZYTA SŁOWIAŃSKA",
	title: "SOFTWARE ENGINEER",
	phone: "(48) 668 173 312",
	email: "zyta.slowianska@gmail.com",
	github: "github.com/aktyz",
	linkedin: "linkedin.com/in/zyta-slowianska/",
	summary: "Backend Software Engineer with 4+ years of experience building and supporting production systems at Goldman Sachs, focused on data processing, backend services, and production reliability. Experience in debugging distributed systems, working with SQL-based data pipelines, and developing backend components in C/C++, Java, and Node.js.",
	skills: {
		languages: ["C/C++", "JavaScript", "SQL", "Python"],
		backendData: ["REST APIs", "PostgreSQL", "Node.js"],
		toolsInfra: ["Linux", "Git", "Docker", "CI/CD"],
		debuggingSystems: ["GDB", "Valgrind", "Multithreading (POSIX Threads)"],
		ai: ["LLM Fundamentals", "AI Agents (Personal Projects)"],
		foreignLanguages: ["English (TOEIC 975)", "French (DALF C1)"],
	},
	experience: [
		{
			title: "FOUNDER & TECHNICAL PRODUCT LEAD",
			company: "SkillCompass / Survey2Earn",
			period: "Sep 2025 – Present",
			highlights: [
				"Built backend components for blockchain-based system (Solana), implementing reward logic and contribution tracking (MVP)",
				"Built developer integration layer (npm SDK + API wrapper) enabling external systems to interact with smart-contract-based reward protocols",
				"Implemented backend data flows between API, SDK, and smart contract layer",
			],
		},
		{
			title: "SOFTWARE ENGINEERING SABBATICAL",
			company: "",
			period: "Dec 2024 – Aug 2025",
			highlights: [
				"Built production-grade Unix-like shell in C, implementing process execution, piping, file I/O, and robust command parsing with strict edge-case handling",
				"Built backend systems in C/C++, including a multithreaded HTTP server (request parsing, routing, client handling) and concurrency-safe components (POSIX threads, mutexes)",
				"Obtained AI in Business Development Certificate from Google in Feb 2025",
			],
		},
		{
			title: "SOFTWARE ENGINEER – RISK PLATFORM (VP / ASSOCIATE)",
			company: "Goldman Sachs",
			period: "Nov 2019 – Nov 2024",
			highlights: [
				"Built and maintained backend services for risk analytics platform supporting production workflows",
				"Built risk visualization system used by ~6,000–9,000 VP–C-level stakeholders, supporting operational risk and uncertainty analysis",
				"Reduced incident resolution time by ~90–95% (days → ~45 min) via automated validation, correction tooling, and structured debugging workflows",
				"Resolved 150–250 high-severity production incidents annually across global trading and risk systems",
				"Built full-stack internal platform (React / Spring Boot / MongoDB) centralizing unstructured analytical data, improving retrieval time by ~83% (30 min → 5 min)",
			],
		},
		{
			title: "REFERENCE DATA & PRICING SYSTEMS ENGINEER",
			company: "BNP Paribas Securities Services/Goldman Sachs",
			period: "Jun 2014 – Oct 2019",
			highlights: [
				"Maintained financial data pipelines and pricing systems, ensuring correctness of data used in valuation and reporting. Performed SQL-based data validation and resolved data inconsistencies across external providers (Bloomberg, fund administrators)",
				"Executed monthly hedge fund valuation workflows (~30 portfolios) with multi-layer dependency resolution across external data providers (Bloomberg / fund admins)",
				"Improved data integrity and continuity of production pricing systems, supporting downstream NAV reporting and risk analytics across distributed custody infrastructure",
			],
		},
	],
	education: [
		{
			program: "COMMON CORE CURRICULUM – SOFTWARE ENGINEERING",
			institution: "42 Warsaw",
			period: "Feb 2024 – Present",
		},
		{
			program: "ADVANCED MASTER – ECONOMICS OF GLOBALISATION AND EUROPEAN INTEGRATION",
			institution: "Erasmus Mundus Joint Program",
			period: "2012 – 2014",
		},
		{
			program: "MASTER – ECONOMICS AND INTERNATIONAL MANAGEMENT",
			institution: "Lille 1 University",
			period: "2011 – 2012",
		},
		{
			program: "BA – INTERNATIONAL ECONOMIC RELATIONS",
			institution: "Warsaw School of Economics",
			period: "2006 – 2010",
		},
	],
	additional: ["Finance domain knowledge", "Risk Management exposure", "Bloomberg", "Touch typing (65 WPM)"],
};

export function CVDisplay() {
	return (
		<div className="min-h-screen bg-gray-50 text-gray-900">
			<div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
				{/* Header */}
				<div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 relative overflow-hidden">
					<div className="max-w-4xl mx-auto">
						<h1 className="text-4xl font-bold tracking-tight">{cvData.name}</h1>
						<p className="text-lg text-gray-600 mt-1">{cvData.title}</p>
						<div className="flex flex-wrap gap-3 mt-4 text-sm">
							<a
								href={`tel:${cvData.phone}`}
								className="
									px-3 py-1
									rounded-full
									bg-gray-100
									text-gray-700
									hover:bg-yellow-100
									hover:text-gray-900
									transition
									"
							>
								{cvData.phone}
							</a>
							<a
								href={`mailto:${cvData.email}`}
								className="
									px-3 py-1
									rounded-full
									bg-gray-100
									text-gray-700
									hover:bg-yellow-100
									hover:text-gray-900
									transition
									"
							>
								{cvData.email}
							</a>
							<a
								href={`https://${cvData.github}`}
								target="_blank"
								rel="noopener noreferrer"
								className="
									px-3 py-1
									rounded-full
									bg-gray-100
									text-gray-700
									hover:bg-yellow-100
									hover:text-gray-900
									transition
									"
							>
								{cvData.github}
							</a>
							<a
								href={`https://${cvData.linkedin}`}
								target="_blank"
								rel="noopener noreferrer"
								className="
									px-3 py-1
									rounded-full
									bg-gray-100
									text-gray-700
									hover:bg-yellow-100
									hover:text-gray-900
									transition
									"
							>
								{cvData.linkedin}
							</a>
						</div>
					</div>
				</div>

				{/* Summary */}
				<div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
					<div className="max-w-4xl mx-auto">
						<p className="text-gray-700 leading-relaxed">{cvData.summary}</p>
					</div>
				</div>

				{/* Technical Skills */}
				<div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-lg font-bold tracking-wide uppercase text-gray-800 mb-6 flex items-center gap-2">TECHNICAL SKILLS</h2>
						<span className="w-2 h-2 bg-yellow-400 rounded-full" />
						<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
							<div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
								<h3 className="font-semibold text-xs uppercase tracking-wide text-gray-700 mb-3">LANGUAGES</h3>
								<ul className="space-y-1">
									{cvData.skills.languages.map((skill) => (
										<li key={skill} className="text-sm text-gray-700 py-0.5">
											{skill}
										</li>
									))}
								</ul>
							</div>
							<div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
								<h3 className="font-semibold text-xs uppercase tracking-wide text-gray-700 mb-3">BACKEND & DATA</h3>
								<ul className="space-y-1">
									{cvData.skills.backendData.map((skill) => (
										<li key={skill} className="text-sm text-gray-700 py-0.5">
											{skill}
										</li>
									))}
								</ul>
							</div>
							<div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
								<h3 className="font-semibold text-xs uppercase tracking-wide text-gray-700 mb-3">TOOLS & INFRASTRUCTURE</h3>
								<ul className="space-y-1">
									{cvData.skills.toolsInfra.map((skill) => (
										<li key={skill} className="text-sm text-gray-700 py-0.5">
											{skill}
										</li>
									))}
								</ul>
							</div>
							<div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
								<h3 className="font-semibold text-xs uppercase tracking-wide text-gray-700 mb-3">DEBUGGING & SYSTEMS</h3>
								<ul className="space-y-1">
									{cvData.skills.debuggingSystems.map((skill) => (
										<li key={skill} className="text-sm text-gray-700 py-0.5">
											{skill}
										</li>
									))}
								</ul>
							</div>
							<div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
								<h3 className="font-semibold text-xs uppercase tracking-wide text-gray-700 mb-3">AI</h3>
								<ul className="space-y-1">
									{cvData.skills.ai.map((skill) => (
										<li key={skill} className="text-sm text-gray-700 py-0.5">
											{skill}
										</li>
									))}
								</ul>
							</div>
							<div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
								<h3 className="font-semibold text-xs uppercase tracking-wide text-gray-700 mb-3">FOREIGN LANGUAGES</h3>
								<ul className="space-y-1">
									{cvData.skills.foreignLanguages.map((skill) => (
										<li key={skill} className="text-sm text-gray-700 py-0.5">
											{skill}
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>

				{/* Experience */}
				<div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-lg font-bold tracking-wide uppercase text-gray-800 mb-6 flex items-center gap-2">EXPERIENCE</h2>
						<div className="space-y-8">
							{cvData.experience.map((job, index) => (
								<div
									key={index}
									className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-sm transition"
								>
									<div className="flex justify-between items-start mb-2">
										<div>
											<h3
												className="font-semibold text-lg text-gray-900"
											>
												{job.title}
											</h3>
											{job.company &&
											<p
												className="text-sm text-gray-600"
											>
												{job.company}
											</p>}
										</div>
										<span
											className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap"
										>
											{job.period}
										</span>
									</div>
									<ul className="space-y-2">
										{job.highlights.map((highlight, idx) => (
											<li key={idx} className="text-sm text-gray-700 ml-4 flex gap-2">
												<span className="text-yellow-400 mt-1">▹</span>
												<span>{highlight}</span>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Education */}
				<div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-lg font-bold tracking-wide uppercase text-gray-800 mb-6 flex items-center gap-2">EDUCATION</h2>
						<div className="space-y-4">
							{cvData.education.map((edu, index) => (
								<div
									key={index}
									className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
								>
									<div className="flex justify-between items-start">
										<div>
											<h3 className="font-semibold text-lg text-gray-900">{edu.program}</h3>
											<p className="text-sm text-gray-600">{edu.institution}</p>
										</div>
										<span
											className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap"
										>
											{edu.period}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Additional Information */}
				<div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-lg font-bold tracking-wide uppercase text-gray-800 mb-6 flex items-center gap-2">ADDITIONAL INFORMATION</h2>
						<div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
							<ul className="space-y-2">
								{cvData.additional.map((item, index) => (
									<li key={index} className="text-sm text-gray-700 py-0.5">
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
