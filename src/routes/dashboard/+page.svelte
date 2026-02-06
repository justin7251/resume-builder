<svelte:head>
	<title>Dashboard - ResumePro</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 text-slate-900">
	<header class="bg-white border-b border-slate-200">
		<div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
			<div class="flex items-center gap-3 font-semibold">
				<span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">R</span>
				<span>ResumePro</span>
			</div>
			<nav class="hidden md:flex items-center gap-6 text-sm text-slate-500">
				<a href="/dashboard" class="text-blue-600 font-semibold">Dashboard</a>
				<a href="/templates" class="hover:text-slate-900">Templates</a>
				<a href="/files" class="hover:text-slate-900">My Files</a>
				<a href="/jobs" class="hover:text-slate-900">Job Search</a>
			</nav>
			<div class="flex items-center gap-4">
				<div class="relative">
					<input
						type="text"
						placeholder="Search resumes..."
						class="w-64 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
					/>
				</div>
				<button class="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-500">
					<span class="material-symbols-outlined text-base">notifications</span>
				</button>
				<div class="flex items-center gap-2">
					<div class="text-right text-xs">
						<div class="font-semibold text-slate-700">Alex Johnson</div>
						<div class="text-slate-400">Pro Member</div>
					</div>
					<div class="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">
						AJ
					</div>
				</div>
			</div>
		</div>
	</header>

	<main class="max-w-6xl mx-auto px-6 py-8">
		<div class="flex flex-col lg:flex-row gap-8">
			<section class="flex-1">
				<div class="flex items-start justify-between gap-6">
					<div>
						<h1 class="text-2xl font-bold">Welcome back, Alex</h1>
						<p class="text-slate-500 mt-2">You have 4 active resumes and 2 pending job matches.</p>
					</div>
					<a
						href="/builder"
						class="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
					>
						<span class="material-symbols-outlined text-base">add</span>
						Create New Resume
					</a>
				</div>

				<div class="mt-8 flex items-center gap-3 text-sm font-semibold">
					<span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
						<span class="material-symbols-outlined text-base">grid_view</span>
					</span>
					My Resumes
				</div>

				<div class="mt-6 grid md:grid-cols-3 gap-6">
					{#each [
						{ name: 'Senior Product Designer', time: 'Last edited 2 hours ago' },
						{ name: 'Tech Lead Portfolio', time: 'Last edited yesterday' },
						{ name: 'General CV - 2024', time: 'Last edited Oct 12, 2024' }
					] as card}
						<div class="bg-white border border-slate-200 rounded-2xl shadow-sm">
							<div class="p-4">
								<div class="h-40 rounded-xl bg-slate-100 border border-slate-200"></div>
							</div>
							<div class="px-4 pb-4">
								<div class="font-semibold">{card.name}</div>
								<div class="text-xs text-slate-500 mt-1">{card.time}</div>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<aside class="w-full lg:w-80 space-y-6">
				<div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
					<div class="flex items-center gap-3">
						<span class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
							<span class="material-symbols-outlined text-base">rocket_launch</span>
						</span>
						<div>
							<div class="font-semibold">Job Match Optimizer</div>
							<div class="text-xs text-slate-500">Check your ATS compatibility</div>
						</div>
					</div>
					<div class="mt-4 text-xs text-slate-500 font-semibold">1. SELECT RESUME</div>
					<select class="mt-2 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
						<option>Senior Product Designer</option>
					</select>
					<div class="mt-4 text-xs text-slate-500 font-semibold">2. PASTE JOB DESCRIPTION</div>
					<textarea
						class="mt-2 w-full h-24 border border-slate-200 rounded-lg px-3 py-2 text-sm"
						placeholder="Paste requirements here..."
					></textarea>
					<button class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
						Check Match Score
					</button>
				</div>

				<div class="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
					<div class="flex items-center justify-between text-sm text-slate-300">
						<span>Last Scan Result</span>
						<span class="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
					</div>
					<div class="mt-4 flex items-center justify-center">
						<div class="score-ring">
							<div class="text-center">
								<div class="text-2xl font-semibold">85%</div>
								<div class="text-xs text-slate-300">Score</div>
							</div>
						</div>
					</div>
					<div class="mt-4 text-sm text-slate-300">"Senior Designer at Figma"</div>
					<div class="mt-3">
						<div class="flex items-center justify-between text-xs text-slate-400">
							<span>Keywords matched</span>
							<span>12/15</span>
						</div>
						<div class="h-2 bg-slate-700 rounded-full mt-2">
							<div class="h-2 bg-blue-500 rounded-full" style="width: 80%;"></div>
						</div>
					</div>
					<button class="mt-5 w-full border border-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm hover:bg-slate-800">
						View Optimization Tips
					</button>
				</div>

				<div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
					<div class="font-semibold mb-3">Resume Tips</div>
					<ul class="text-sm text-slate-600 space-y-2">
						<li>Include measurable achievements like "increased sales by 20%".</li>
						<li>Keep your contact info up to date and clean.</li>
					</ul>
				</div>
			</aside>
		</div>
	</main>
</div>
