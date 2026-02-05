<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';

  export let label: string = 'AI Compare';
  export let applyLabel: string = 'Use AI Version';
  export let target: 'summary' | 'experience' = 'summary';
  export let currentHtml: string = '';

  const dispatch = createEventDispatcher();

  let open = false;
  let loading = false;
  let error = '';
  let jobDescription = '';
  let aiText = '';
  let provider: 'openai' | 'gemini' = 'openai';

  const toText = (html: string) => {
    if (!browser) return '';
    const el = document.createElement('div');
    el.innerHTML = html || '';
    return (el.textContent || '').trim();
  };

  $: currentText = toText(currentHtml);

  type DiffToken = { type: 'same' | 'add' | 'remove'; text: string };

  function diffWords(a: string, b: string): DiffToken[] {
    const aWords = a ? a.split(/\s+/) : [];
    const bWords = b ? b.split(/\s+/) : [];
    const n = aWords.length;
    const m = bWords.length;

    const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (aWords[i - 1] === bWords[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    const result: DiffToken[] = [];
    let i = n;
    let j = m;
    while (i > 0 && j > 0) {
      if (aWords[i - 1] === bWords[j - 1]) {
        result.push({ type: 'same', text: aWords[i - 1] });
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        result.push({ type: 'remove', text: aWords[i - 1] });
        i--;
      } else {
        result.push({ type: 'add', text: bWords[j - 1] });
        j--;
      }
    }
    while (i > 0) {
      result.push({ type: 'remove', text: aWords[i - 1] });
      i--;
    }
    while (j > 0) {
      result.push({ type: 'add', text: bWords[j - 1] });
      j--;
    }

    return result.reverse();
  }

  $: diffTokens = diffWords(currentText, aiText);

  async function refine() {
    error = '';
    aiText = '';
    loading = true;
    try {
      const response = await fetch('/api/ai-refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          currentText,
          jobDescription,
          target
        })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || 'Failed to generate text.');
      }

      const data = await response.json();
      aiText = data?.text || '';
      if (!aiText) {
        throw new Error('No text returned.');
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to generate text.';
    } finally {
      loading = false;
    }
  }

  function applyText() {
    if (!aiText) return;
    dispatch('apply', aiText);
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
      <div>
        <label class="block text-sm font-medium mb-1">Job Description</label>
        <textarea
          class="w-full border rounded px-3 py-2 min-h-[100px]"
          placeholder="Paste the job description here..."
          bind:value={jobDescription}
        ></textarea>
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
          on:click={refine}
          disabled={loading || !jobDescription || !currentText}
          type="button"
        >
          {loading ? 'Refining...' : 'Refine with AI'}
        </button>
        {#if error}
          <p class="text-sm text-red-600">{error}</p>
        {/if}
      </div>

      {#if currentText}
        <div>
          <label class="block text-sm font-medium mb-1">Current</label>
          <div class="border rounded px-3 py-2 bg-white whitespace-pre-wrap text-sm leading-relaxed">
            {currentText}
          </div>
        </div>
      {/if}

      {#if aiText}
        <div>
          <label class="block text-sm font-medium mb-1">AI Version</label>
          <div class="border rounded px-3 py-2 bg-white whitespace-pre-wrap text-sm leading-relaxed">
            {aiText}
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Inline Diff</label>
          <div class="border rounded px-3 py-2 bg-white whitespace-pre-wrap text-sm leading-relaxed">
            {#each diffTokens as token}
              {#if token.type === 'add'}
                <span class="diff-add">{token.text} </span>
              {:else if token.type === 'remove'}
                <span class="diff-remove">{token.text} </span>
              {:else}
                <span>{token.text} </span>
              {/if}
            {/each}
          </div>
        </div>

        <button
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          on:click={applyText}
          type="button"
        >
          {applyLabel}
        </button>
      {/if}
    </div>
  {/if}
</div>

<style>
  .diff-add {
    background: #dcfce7;
    color: #166534;
  }

  .diff-remove {
    background: #fee2e2;
    color: #991b1b;
    text-decoration: line-through;
  }
</style>
