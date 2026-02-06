<script lang="ts">
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

  const categories = [
    { label: 'All Templates', icon: 'grid_view', active: true },
    { label: 'ATS-Optimized', icon: 'verified' },
    { label: 'Creative Styles', icon: 'brush' },
    { label: 'Executive', icon: 'work' }
  ];

  const industries = ['Technology', 'Finance', 'Healthcare', 'Education'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Executive'];
  const layoutFilters = ['One Column', 'Two Column', 'One Page', 'Two Pages'];
  const templateTypes = ['Modern', 'Professional', 'Creative', 'Student'];

  function selectTemplate(templateId: string) {
    goto(`/builder?template=${templateId}`);
  }
</script>

<svelte:head>
  <title>Template Selection - Resume Builder</title>
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
      <div class="p-6 flex-1">
        <div class="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-3">Category</div>
        <div class="space-y-2 text-sm text-slate-600">
          {#each categories as category}
            <button
              class={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 ${
                category.active ? 'bg-blue-50 text-blue-700 font-semibold' : 'hover:bg-slate-100'
              }`}
            >
              <span class="material-symbols-outlined text-base">{category.icon}</span>
              {category.label}
            </button>
          {/each}
        </div>

        <div class="text-xs uppercase tracking-wide text-slate-400 font-semibold mt-8 mb-3">Industries</div>
        <div class="space-y-3 text-sm text-slate-600">
          {#each industries as industry}
            <label class="flex items-center gap-2">
              <input type="checkbox" class="rounded border-slate-300" />
              {industry}
            </label>
          {/each}
        </div>
      </div>
      <div class="p-6 border-t border-slate-100">
        <button class="w-full border border-dashed border-slate-300 text-slate-500 rounded-lg px-4 py-2 text-sm hover:bg-slate-50">
          <span class="material-symbols-outlined text-base align-middle">add</span>
          <span class="ml-1">Create Blank</span>
        </button>
      </div>
    </aside>

    <main class="flex-1">
      <div class="border-b border-slate-200 bg-white">
        <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div class="text-sm text-slate-500">Home <span class="mx-2">></span> Template Selection</div>
          <div class="flex items-center gap-4">
            <div class="relative">
              <span class="material-symbols-outlined text-base text-slate-400 absolute left-3 top-1/2 -translate-y-1/2">
                search
              </span>
              <input
                type="text"
                placeholder="Search templates..."
                class="w-72 rounded-full border border-slate-200 bg-slate-100 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <button class="h-9 w-9 rounded-full border border-slate-200 bg-white text-slate-500">
              <span class="material-symbols-outlined text-base">notifications</span>
            </button>
            <div class="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold">JD</div>
          </div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-6 py-8">
        <div class="flex flex-wrap items-center gap-3 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-6">
          <span class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            <span class="material-symbols-outlined text-base">verified</span>
            ATS-friendly templates
          </span>
          <span class="text-slate-400 font-medium normal-case">Optimized to pass applicant tracking systems.</span>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-6">
          {#each templateTypes as tab, index}
            <button
              class={`px-4 py-2 rounded-full text-sm font-semibold ${
                index === 0 ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          {/each}
        </div>

        <div class="flex items-start justify-between gap-6">
          <div>
            <h1 class="text-2xl font-bold">Select a Resume Template</h1>
            <p class="text-slate-600 mt-2">
              Stand out with a professional layout tailored for your dream career.
            </p>
          </div>
          <button class="border border-slate-200 rounded-lg px-4 py-2 text-sm bg-white hover:bg-slate-50 flex items-center gap-2">
            <span class="material-symbols-outlined text-base">filter_list</span>
            Most Popular
          </button>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {#each templates as template}
            <a
              href={`/builder?template=${template.id}`}
              class="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden cursor-pointer block"
            >
              <div class={`w-full p-4 ${template.tile}`}>
                <div class="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden h-44">
                  <div class="transform scale-[0.42] origin-top-left w-[860px] pointer-events-none">
                    <svelte:component this={template.component} resume={sampleResume} />
                  </div>
                </div>
              </div>
              <div class="p-4">
                <h3 class="font-semibold">{template.name}</h3>
                <div class="flex items-center gap-2 mt-2 text-xs">
                  <span class={`px-2 py-1 rounded-full ${template.badgeColor}`}>{template.badge}</span>
                  <span class="text-slate-500">Best for: {template.bestFor}</span>
                </div>
                <button
                  type="button"
                  class="text-xs font-semibold text-blue-600 hover:text-blue-700 mt-3 inline-flex items-center gap-1"
                  on:click|stopPropagation={() => goto(`/templates/${template.id}`)}
                >
                  View Breakdown
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </a>
          {/each}
        </div>

        <div class="mt-10 grid md:grid-cols-2 gap-6">
          <div class="bg-white border border-slate-200 rounded-2xl p-4">
            <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Experience Level</div>
            <div class="flex flex-wrap gap-2">
              {#each experienceLevels as level}
                <button class="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200">
                  {level}
                </button>
              {/each}
            </div>
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-4">
            <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Layout</div>
            <div class="flex flex-wrap gap-2">
              {#each layoutFilters as layout}
                <button class="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200">
                  {layout}
                </button>
              {/each}
            </div>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <div class="flex items-center gap-6">
            <span class="text-emerald-600 font-semibold">- 85% ATS Score Guarantee</span>
            <span>24/7 Expert Support</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-slate-600">Need Help Choosing?</span>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700">
              Start with Blank
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
