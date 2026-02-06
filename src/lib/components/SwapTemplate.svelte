<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // In a real app, you might fetch this from a server or list them dynamically.
  import { TEMPLATE_DATA } from '$lib/templateData';

  const templates = TEMPLATE_DATA.map(({ id, name, tile, component }) => ({
    id,
    name,
    tile,
    component
  }));

  function selectTemplate(templateId: string) {
    dispatch('select', templateId);
  }
</script>

<div class="bg-white rounded-2xl border border-slate-200 shadow-sm">
  <div class="p-4 border-b border-slate-200">
    <h2 class="text-lg font-semibold">Change Template</h2>
    <p class="text-xs text-slate-500 mt-1">Choose a different layout style.</p>
  </div>
  <div class="p-4 overflow-x-auto flex space-x-4">
    {#each templates as template}
      <button
        on:click={() => selectTemplate(template.id)}
        class="flex-shrink-0 w-44 border border-slate-200 rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div class={`p-3 ${template.tile}`}>
          <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden h-32">
            <div class="transform scale-[0.45] origin-top-left w-[720px]">
              <svelte:component this={template.component} resume={{
                personal: {
                  name: 'Alex Morgan',
                  title: 'Product Designer',
                  email: 'alex.morgan@example.com',
                  phone: '+1 (555) 000-0000',
                  location: 'San Francisco, CA',
                  website: 'alexmorgan.design',
                  summary: '<p>Product designer with 6+ years of experience.</p>'
                },
                experience: [
                  {
                    company: 'TechCorp',
                    position: 'Senior Product Designer',
                    startDate: '2021',
                    endDate: '',
                    description: '<ul><li>Owned onboarding redesign.</li></ul>',
                    current: true
                  }
                ],
                education: [
                  {
                    institution: 'UC Berkeley',
                    degree: 'B.A.',
                    field: 'Cognitive Science',
                    startDate: '2014',
                    endDate: '2018',
                    description: 'HCI focus.'
                  }
                ],
                skills: [
                  { name: 'Figma', level: 9 },
                  { name: 'Design Systems', level: 8 }
                ]
              }} />
            </div>
          </div>
        </div>
        <div class="p-3 text-left">
          <p class="text-sm font-semibold">{template.name}</p>
          <p class="text-xs text-slate-500">Preview</p>
        </div>
      </button>
    {/each}
  </div>
</div>
