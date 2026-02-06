<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { TEMPLATE_DATA } from '$lib/templateData';

	const sampleResume = {
		personal: {
			name: 'Alex Morgan',
			title: 'Product Designer',
			email: 'alex.morgan@example.com',
			phone: '+1 (555) 000-0000',
			location: 'San Francisco, CA',
			website: 'alexmorgan.design',
			summary:
				'<p>Product designer with 6+ years of experience building user-centered platforms. Led cross-functional teams to ship features that improved activation by 24%.</p>'
		},
		experience: [
			{
				company: 'TechCorp Systems',
				position: 'Senior Product Designer',
				startDate: 'Jan 2021',
				endDate: '',
				description:
					'<ul><li>Owned onboarding redesign, lifting conversion by 22%.</li><li>Built a shared design system across 6 teams.</li></ul>',
				current: true
			}
		],
		education: [
			{
				institution: 'University of California, Berkeley',
				degree: 'B.A.',
				field: 'Cognitive Science',
				startDate: '2014',
				endDate: '2018',
				description: 'Focus on HCI and design research.'
			}
		],
		skills: [
			{ name: 'Figma', level: 9 },
			{ name: 'Design Systems', level: 8 },
			{ name: 'User Research', level: 8 }
		]
	};

	const templates = TEMPLATE_DATA;

	$: templateId = $page.params.id;
	$: template = templates.find((item) => item.id === templateId) || templates[0];

	function useTemplate() {
		goto(`/builder?template=${templateId}`);
	}
</script>

<svelte:head>
	<title>{template ? `${template.name} Breakdown` : 'Template Breakdown'} - Resume Builder</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 text-slate-900">
	<div class="flex">
		<aside class="hidden lg:flex w-64 bg-white border-r border-slate-200 min-h-screen flex-col">
			<div class="p-6 border-b border-slate-100 flex items-center gap-3 font-semibold">
				<span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
					<span class="material-symbols-outlined text-base">description</span>
				</span>
				<span>ResuMaker</span>
			</div>
			<div class="p-6">
				<div class="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-3">Navigation</div>
				<a
					href="/templates"
					class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
				>
					<span class="material-symbols-outlined text-base">grid_view</span>
					Back to Gallery
				</a>
				<div class="text-xs uppercase tracking-wide text-slate-400 font-semibold mt-8 mb-3">
					Template Specs
				</div>
				<div class="space-y-3 text-sm text-slate-600">
					<div class="flex items-center gap-2">
						<span class="material-symbols-outlined text-base text-blue-600">verified</span>
						<span>v2.4 (Latest)</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="material-symbols-outlined text-base text-blue-600">article</span>
						<span>Single & Multi-page</span>
					</div>
				</div>
			</div>
		</aside>

		<main class="flex-1 flex flex-col overflow-hidden">
			<header class="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6">
				<div class="flex items-center gap-2 text-sm text-slate-500">
					<a href="/templates" class="hover:text-slate-900">Templates</a>
					<span class="material-symbols-outlined text-xs">chevron_right</span>
					<span class="text-slate-700 font-medium">Template Breakdown</span>
				</div>
			</header>

			<div class="flex-1 flex overflow-hidden">
				<section class="flex-1 overflow-y-auto p-10 bg-slate-50">
					<div class="max-w-3xl mx-auto">
						<div class="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 relative">
							<div class="p-8 bg-slate-100">
								<div class="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
									<div class="transform scale-[0.7] origin-top-left w-[860px]">
										<svelte:component this={template.component} resume={sampleResume} />
									</div>
								</div>
							</div>
							<div class="absolute top-[18%] left-[12%] h-4 w-4 rounded-full bg-blue-600 border-4 border-white shadow-lg"></div>
							<div class="absolute top-[36%] right-[18%] h-4 w-4 rounded-full bg-blue-600 border-4 border-white shadow-lg"></div>
						</div>
						<p class="text-center mt-6 text-slate-400 text-sm italic">High-resolution preview of the layout</p>
					</div>
				</section>

				<aside class="w-full lg:w-[420px] bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto">
					<div class="p-8 space-y-8">
						<div class="space-y-2">
							<div class="flex items-center gap-2 mb-1">
								<span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded tracking-wider">
									Top Rated
								</span>
								<span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded tracking-wider">
									Popular
								</span>
							</div>
							<h2 class="text-2xl font-bold">{template.name}</h2>
							<p class="text-slate-500">Specifically engineered for high performance in {template.bestFor}.</p>
							<div class="flex items-center gap-2 mt-2 text-xs">
								<span class={`px-2 py-1 rounded-full ${template.badgeColor}`}>{template.badge}</span>
								<span class="text-slate-500">Best for: {template.bestFor}</span>
							</div>
						</div>

						<div class="space-y-6">
							<h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Key Features</h3>
							<div class="flex gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50">
								<div class="bg-blue-50 p-2.5 rounded-lg text-blue-600">
									<span class="material-symbols-outlined text-2xl">check_circle</span>
								</div>
								<div>
									<h4 class="font-semibold">ATS-Friendly Structure</h4>
									<p class="text-sm text-slate-500">Standard headers and machine-readable typography ensure strong parser accuracy.</p>
								</div>
							</div>
							<div class="flex gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50">
								<div class="bg-emerald-50 p-2.5 rounded-lg text-emerald-600">
									<span class="material-symbols-outlined text-2xl">monitoring</span>
								</div>
								<div>
									<h4 class="font-semibold">Easy Skimmability</h4>
									<p class="text-sm text-slate-500">Optimized for fast recruiter scanning and clear section hierarchy.</p>
								</div>
							</div>
						</div>

						<div class="pt-2 space-y-4">
							<button
								on:click={useTemplate}
								class="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700"
							>
								<span class="material-symbols-outlined text-base">edit</span>
								Use This Template
							</button>
							<button class="w-full py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50">
								<span class="material-symbols-outlined text-base">palette</span>
								Customize Colors
							</button>
						</div>
					</div>
				</aside>
			</div>
		</main>
	</div>
</div>
