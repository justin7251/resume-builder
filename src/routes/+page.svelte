<script lang="ts">
	import { ArrowRightIcon, DownloadIcon, FileTextIcon, StarIcon } from 'svelte-feather-icons';
</script>

<svelte:head>
	<title>Resume Builder - Create a Professional Resume in Minutes</title>
	<meta
		name="description"
		content="Build a standout resume in minutes with our easy-to-use builder. Choose from professional templates, fill in your details, and download your resume in PDF format."
	/>
</svelte:head>

<div class="bg-gray-50 text-gray-800">
	<!-- Hero Section -->
	<header class="container mx-auto px-4 py-20 text-center">
		<h1 class="text-5xl font-extrabold mb-4">Build Your Dream Resume</h1>
		<p class="text-xl mb-8 max-w-2xl mx-auto">
			Create a professional, ATS-friendly resume that gets you hired. Our builder makes it fast,
			easy, and effective.
		</p>
		<a
			href="/builder"
			class="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105 inline-block"
		>
			Start Building for Free
			<span class="inline-block w-5 h-5 ml-2"><ArrowRightIcon /></span>
		</a>
	</header>

	<!-- How it Works Section -->
	<section class="py-20 bg-white">
		<div class="container mx-auto px-4 text-center">
			<h2 class="text-3xl font-bold mb-12">How It Works</h2>
			<div class="grid md:grid-cols-3 gap-12">
				<div class="flex flex-col items-center">
					<div
						class="bg-blue-100 text-blue-600 rounded-full p-6 mb-4"
					>
						<span class="w-12 h-12"><FileTextIcon /></span>
					</div>
					<h3 class="text-xl font-semibold mb-2">1. Choose Template</h3>
					<p>Select from a variety of professional, field-tested resume templates.</p>
				</div>
				<div class="flex flex-col items-center">
					<div
						class="bg-green-100 text-green-600 rounded-full p-6 mb-4"
					>
						<span class="w-12 h-12"><StarIcon /></span>
					</div>
					<h3 class="text-xl font-semibold mb-2">2. Fill Details</h3>
					<p>Easily input your information with our guided process and real-time preview.</p>
				</div>
				<div class="flex flex-col items-center">
					<div
						class="bg-purple-100 text-purple-600 rounded-full p-6 mb-4"
					>
						<span class="w-12 h-12"><DownloadIcon /></span>
					</div>
					<h3 class="text-xl font-semibold mb-2">3. Download</h3>
					<p>Export your polished resume as a PDF, ready to impress employers.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-20">
		<div class="container mx-auto px-4">
			<h2 class="text-3xl font-bold mb-12 text-center">Why Choose Us?</h2>
			<div class="grid md:grid-cols-3 gap-8 text-center">
				<div class="bg-white p-6 rounded-lg shadow-md">
					<h3 class="text-xl font-semibold mb-3">ATS-Friendly</h3>
					<p>Our templates are optimized to pass through Applicant Tracking Systems.</p>
				</div>
				<div class="bg-white p-6 rounded-lg shadow-md">
					<h3 class="text-xl font-semibold mb-3">Professional Templates</h3>
					<p>Designed by experts to ensure your resume looks modern and professional.</p>
				</div>
				<div class="bg-white p-6 rounded-lg shadow-md">
					<h3 class="text-xl font-semibold mb-3">Real-time Preview</h3>
					<p>See your changes instantly as you build your resume.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<section class="py-20 bg-blue-600 text-white">
		<div class="container mx-auto px-4">
			<h2 class="text-3xl font-bold mb-12 text-center">Trusted by Job Seekers</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<div class="bg-blue-700 p-6 rounded-lg">
					<p class="mb-4">
						"This resume builder is a game-changer. I landed my dream job a week after using it!"
					</p>
					<p class="font-semibold">- Jane Doe, Project Manager</p>
				</div>
				<div class="bg-blue-700 p-6 rounded-lg">
					<p class="mb-4">
						"The templates are amazing and the process was so simple. Highly recommended!"
					</p>
					<p class="font-semibold">- John Smith, Software Engineer</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Sample Templates Section -->
	<section class="py-20">
		<div class="container mx-auto px-4 text-center">
			<h2 class="text-3xl font-bold mb-12">Find Your Perfect Template</h2>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
				<img
					src="/templates/classic.png"
					alt="Classic Resume Template"
					class="rounded-lg shadow-lg hover:opacity-75 transition-opacity"
				/>
				<img
					src="/templates/creative.png"
					alt="Creative Resume Template"
					class="rounded-lg shadow-lg hover:opacity-75 transition-opacity"
				/>
				<img
					src="/templates/minimal.png"
					alt="Minimal Resume Template"
					class="rounded-lg shadow-lg hover:opacity-75 transition-opacity"
				/>
				<img
					src="/templates/professional.png"
					alt="Professional Resume Template"
					class="rounded-lg shadow-lg hover:opacity-75 transition-opacity"
				/>
			</div>
		</div>
	</section>

	<!-- Final CTA -->
	<section class="py-20 bg-gray-800 text-white">
		<div class="container mx-auto px-4 text-center">
			<h2 class="text-3xl font-bold mb-6">Ready to Build Your Future?</h2>
			<a
				href="/builder"
				class="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-transform transform hover:scale-105 inline-block"
			>
				Create My Resume Now
			</a>
		</div>
	</section>
</div>

<!-- Sticky CTA for mobile -->
<div class="sticky-cta">
	<a href="/builder" class="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
		Start Building
	</a>
</div>