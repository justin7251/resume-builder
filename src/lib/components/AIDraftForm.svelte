<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string = 'AI Draft';
  export let applyLabel: string = 'Use This Text';

  const dispatch = createEventDispatcher();

  let open = false;
  let loading = false;
  let error = '';
  let generatedText = '';
  let provider: 'openai' | 'gemini' = 'openai';

  let jobTitle = '';
  let years = '';
  let companyName = '';
  let task1 = '';
  let task2 = '';
  let task3 = '';
  let task4 = '';
  let actionVerb = '';
  let projectOrAccomplishment = '';
  let resultOrImpact = '';
  let skill1 = '';
  let skill2 = '';
  let skill3 = '';
  let companyOrPosition = '';

  async function generate() {
    error = '';
    generatedText = '';
    loading = true;
    try {
      const response = await fetch('/api/ai-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          jobTitle,
          years,
          companyName,
          tasks: [task1, task2, task3, task4],
          actionVerb,
          projectOrAccomplishment,
          resultOrImpact,
          skills: [skill1, skill2, skill3],
          companyOrPosition
        })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || 'Failed to generate text.');
      }

      const data = await response.json();
      generatedText = data?.text || '';
      if (!generatedText) {
        throw new Error('No text returned.');
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to generate text.';
    } finally {
      loading = false;
    }
  }

  function applyText() {
    if (!generatedText) return;
    dispatch('apply', generatedText);
  }
</script>

<div class="mt-3">
  <button
    class="text-sm text-blue-700 hover:text-blue-800 underline"
    on:click={() => (open = !open)}
    type="button"
  >
    {open ? `Hide ${label}` : label}
  </button>

  {#if open}
    <div class="mt-3 border rounded p-4 bg-gray-50 space-y-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input class="border rounded px-3 py-2" placeholder="Job Title" bind:value={jobTitle} />
        <input class="border rounded px-3 py-2" placeholder="Years of Experience" bind:value={years} />
        <input class="border rounded px-3 py-2" placeholder="Company Name" bind:value={companyName} />
        <input class="border rounded px-3 py-2" placeholder="Action Verb" bind:value={actionVerb} />
        <input class="border rounded px-3 py-2" placeholder="Project or Accomplishment" bind:value={projectOrAccomplishment} />
        <input class="border rounded px-3 py-2" placeholder="Result or Impact" bind:value={resultOrImpact} />
        <input class="border rounded px-3 py-2" placeholder="Skill 1" bind:value={skill1} />
        <input class="border rounded px-3 py-2" placeholder="Skill 2" bind:value={skill2} />
        <input class="border rounded px-3 py-2" placeholder="Skill 3" bind:value={skill3} />
        <input class="border rounded px-3 py-2" placeholder="Company or Position" bind:value={companyOrPosition} />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input class="border rounded px-3 py-2" placeholder="Task 1" bind:value={task1} />
        <input class="border rounded px-3 py-2" placeholder="Task 2" bind:value={task2} />
        <input class="border rounded px-3 py-2" placeholder="Task 3" bind:value={task3} />
        <input class="border rounded px-3 py-2" placeholder="Task 4" bind:value={task4} />
      </div>

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 text-sm">
          <label class="text-gray-700">Provider</label>
          <select class="border rounded px-2 py-1" bind:value={provider}>
            <option value="openai">OpenAI</option>
            <option value="gemini">Gemini</option>
          </select>
        </div>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          on:click={generate}
          disabled={loading}
          type="button"
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
        {#if error}
          <p class="text-sm text-red-600">{error}</p>
        {/if}
      </div>

      {#if generatedText}
        <div class="space-y-2">
          <label class="block text-sm font-medium">Generated Text</label>
          <textarea
            class="w-full border rounded px-3 py-2 min-h-[120px]"
            bind:value={generatedText}
          ></textarea>
          <button
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            on:click={applyText}
            type="button"
          >
            {applyLabel}
          </button>
        </div>
      {/if}
    </div>
  {/if}
</div>
