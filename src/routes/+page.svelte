<script lang="ts">
  import { goto } from '$app/navigation';

  function startBuilding() {
    goto('/builder');
  }
</script>

<svelte:head>
  <title>Resume Builder - Create Professional Resumes</title>
</svelte:head>

<section class="py-12 text-center">
  <h1 class="text-4xl font-bold mb-4">Create Your Professional Resume</h1>
  <p class="text-xl mb-8">Build a standout resume in minutes with our easy-to-use builder</p>
  <button 
    on:click={startBuilding}
    class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
    Get Started
  </button>
</section>

<section class="py-12 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8 text-center">Key Features</h2>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="bg-gray-50 p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-3">Easy to Use</h3>
        <p>Simple interface that guides you through the resume building process step by step.</p>
      </div>
      <div class="bg-gray-50 p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-3">Professional Templates</h3>
        <p>Choose from a variety of professionally designed resume templates.</p>
      </div>
      <div class="bg-gray-50 p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-3">PDF Export</h3>
        <p>Download your completed resume in PDF format, ready to send to potential employers.</p>
      </div>
    </div>
  </div>
</section>

<section class="py-12">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold mb-6">Ready to Create Your Resume?</h2>
    <button 
      on:click={startBuilding}
      class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
      Start Building Now
    </button>
  </div>
</section>