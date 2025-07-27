<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // In a real app, you might fetch this from a server or list them dynamically.
  const templates = [
    { id: 'classic', name: 'Classic', imageUrl: '/templates/classic.png' },
    { id: 'professional', name: 'Professional', imageUrl: '/templates/professional.png' },
    { id: 'creative', name: 'Creative', imageUrl: '/templates/creative.png' },
    { id: 'minimal', name: 'Minimal', imageUrl: '/templates/minimal.png' },
    { id: 'executive', name: 'Executive', imageUrl: '/templates/executive.png' },
  ];

  function selectTemplate(templateId: string) {
    dispatch('select', templateId);
  }
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <h2 class="text-xl font-semibold">Swap Template</h2>
  </div>
  <div class="p-4 overflow-x-auto flex space-x-4">
    {#each templates as template}
      <button
        on:click={() => selectTemplate(template.id)}
        class="flex-shrink-0 w-40 border rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <img src={template.imageUrl} alt={template.name} class="w-full h-auto object-cover">
        <div class="p-2 text-center">
          <p class="font-medium">{template.name}</p>
        </div>
      </button>
    {/each}
  </div>
</div>
