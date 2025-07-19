<script lang="ts">
  import { goto } from '$app/navigation';

  const templates = [
    { 
      id: 'professional',
      name: 'Professional', 
      description: 'A clean, modern template suitable for most industries',
      image: '/templates/professional.png'
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      description: 'A colorful template for creative fields and design roles',
      image: '/templates/creative.png' 
    },
    { 
      id: 'minimal', 
      name: 'Minimal', 
      description: 'A streamlined template with a focus on content',
      image: '/templates/minimal.png' 
    },
    { 
      id: 'executive', 
      name: 'Executive', 
      description: 'An elegant template for senior positions and leadership roles',
      image: '/templates/executive.png' 
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'A classic, ATS-friendly resume template',
      image: '/templates/classic.png'
    }
  ];

  function selectTemplate(templateId: string) {
    goto(`/builder?template=${templateId}`);
  }
</script>

<svelte:head>
  <title>Resume Templates - Resume Builder</title>
</svelte:head>

<div class="max-w-5xl mx-auto">
  <h1 class="text-3xl font-bold mb-6">Resume Templates</h1>
  <p class="mb-8 text-gray-700">Choose a template to get started with your resume.</p>

  <div class="grid md:grid-cols-2 gap-6">
    {#each templates as template}
      <div class="border rounded-lg overflow-hidden shadow-md bg-white">
        <div class="h-48 bg-gray-200 flex items-center justify-center">
          <!-- Placeholder for template image -->
          <div class="text-gray-400 text-lg">[Template Preview]</div>
        </div>
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">{template.name}</h3>
          <p class="text-gray-600 mb-4">{template.description}</p>
          <button 
            on:click={() => selectTemplate(template.id)}
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Use This Template
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>