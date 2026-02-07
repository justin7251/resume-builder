<script lang="ts">
	import { ArrowRightIcon, DownloadIcon, FileTextIcon, StarIcon } from 'svelte-feather-icons';
</script>

<svelte:head>
	<title>Resume Builder - Create a Resume That Gets You Hired</title>
	<meta
		name="description"
		content="Build a professional, ATS-friendly resume in minutes. Choose a template, add your details, and download a polished PDF."
	/>
</svelte:head>

<div class="bg-slate-50 text-slate-900">
	<header class="container mx-auto px-4 pb-16 pt-4">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div>
				<h1 class="font-display text-4xl md:text-5xl font-extrabold mt-4 leading-tight">
					Create a Resume That <span class="text-blue-600">Gets You Hired</span>
				</h1>
				<p class="text-lg text-slate-600 mt-4 max-w-xl">
					Build a professional, recruiter-approved resume in minutes. Trusted by 50,000+ job seekers
					to land interviews faster.
				</p>
				<div class="mt-8 flex flex-wrap items-center gap-4">
					<a
						href="/builder"
						class="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
					>
						Get Started
						<span class="inline-block w-5 h-5"><ArrowRightIcon /></span>
					</a>
					<div class="text-sm text-slate-500">
						<div class="font-semibold text-slate-700">Free</div>
						<div>No credit card required</div>
					</div>
				</div>
			</div>

			<div class="relative">
				<div class="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-blue-100 blur-2xl"></div>
				<div class="absolute -bottom-6 -right-4 h-32 w-32 rounded-full bg-emerald-100 blur-2xl"></div>
				<div class="bg-white rounded-2xl shadow-xl border border-slate-100 p-6">
					<div class="flex items-center gap-2 mb-4">
						<span class="h-2.5 w-2.5 rounded-full bg-red-300"></span>
						<span class="h-2.5 w-2.5 rounded-full bg-amber-300"></span>
						<span class="h-2.5 w-2.5 rounded-full bg-emerald-300"></span>
					</div>
					<div class="rounded-xl bg-emerald-50 p-6 flex items-center justify-center">
						<div class="w-full max-w-xs rounded-lg shadow-md border border-slate-100 bg-white p-5">
							<div class="h-3 w-24 bg-slate-200 rounded mb-3"></div>
							<div class="space-y-2">
								<div class="h-2 w-full bg-slate-100 rounded"></div>
								<div class="h-2 w-5/6 bg-slate-100 rounded"></div>
								<div class="h-2 w-4/6 bg-slate-100 rounded"></div>
							</div>
							<div class="mt-6 space-y-2">
								<div class="h-2 w-3/5 bg-slate-100 rounded"></div>
								<div class="h-2 w-4/5 bg-slate-100 rounded"></div>
								<div class="h-2 w-2/3 bg-slate-100 rounded"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>

	<section class="py-16 bg-white">
		<div class="container mx-auto px-4">
			<div class="text-center max-w-2xl mx-auto">
				<div class="text-xs font-semibold text-blue-600 uppercase tracking-wider">Process</div>
				<h2 class="font-display text-3xl font-bold mt-3">Your Dream Job in 3 Simple Steps</h2>
				<p class="text-slate-600 mt-3">
					We have simplified the resume-building process so you can focus on preparing for your next interview.
				</p>
			</div>
			<div class="grid md:grid-cols-3 gap-6 mt-10">
				<div class="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
					<div class="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
						<span class="w-6 h-6"><FileTextIcon /></span>
					</div>
					<h3 class="text-lg font-semibold mb-2">1. Choose a Template</h3>
					<p class="text-sm text-slate-600">Pick from modern, ATS-safe designs curated by hiring experts.</p>
				</div>
				<div class="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
					<div class="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
						<span class="w-6 h-6"><StarIcon /></span>
					</div>
					<h3 class="text-lg font-semibold mb-2">2. Fill in Details</h3>
					<p class="text-sm text-slate-600">Our guided editor makes it easy to highlight your best accomplishments.</p>
				</div>
				<div class="bg-slate-50 border border-slate-100 rounded-2xl p-6 shadow-sm">
					<div class="h-12 w-12 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center mb-4">
						<span class="w-6 h-6"><DownloadIcon /></span>
					</div>
					<h3 class="text-lg font-semibold mb-2">3. Download and Apply</h3>
					<p class="text-sm text-slate-600">Export a polished PDF or Word file and impress recruiters.</p>
				</div>
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="container mx-auto px-4">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="font-display text-3xl font-bold">Recruiter-Approved Templates</h2>
					<p class="text-slate-600 mt-2">Tested and proven to pass Applicant Tracking Systems (ATS).</p>
				</div>
				<a href="/templates" class="text-sm font-semibold text-blue-600 hover:text-blue-700">View All Templates</a>
			</div>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
				{#each ['The Executive', 'Creative Pulse', 'The Minimalist', 'Modern Professional'] as label}
					<div class="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
						<div class="h-40 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
							Template Preview
						</div>
						<div class="p-4 text-sm font-semibold">{label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="container mx-auto px-4">
			<div class="bg-blue-600 text-white rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
				<div class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-500/50"></div>
				<div class="absolute -bottom-14 -left-6 h-40 w-40 rounded-full bg-blue-500/40"></div>
				<h2 class="font-display text-3xl font-bold">Ready to Land Your Dream Interview?</h2>
				<p class="mt-3 text-blue-100 max-w-2xl mx-auto">
					Join thousands of successful professionals who used Resume Builder to jumpstart their careers.
				</p>
				<a
					href="/builder"
					class="mt-6 inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
				>
					Create Your Resume Now
				</a>
				<div class="mt-3 text-xs text-blue-100">Free to try. No credit card required.</div>
			</div>
		</div>
	</section>

</div>
