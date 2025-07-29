<script lang="ts">
  import type { ResumeData } from '$lib/types';
  import { onMount, afterUpdate } from 'svelte';
  import type { ComponentType } from 'svelte';

  export let resumeData: ResumeData;
  export let templateId: string = 'professional';

  let resumeElement: HTMLElement;
  let component: ComponentType | null = null;

  $: import(`../templates/${templateId}.svelte`)
    .then(res => component = res.default)
    .catch(() => component = null);
  let isTwoPage = false;

  const checkHeight = () => {
    if (resumeElement) {
      // A4 height in pixels at 96 DPI is 1123px. We'll use a slightly smaller value to be safe.
      isTwoPage = resumeElement.scrollHeight > 1100;
    }
  };

  onMount(checkHeight);
  afterUpdate(checkHeight);
</script>

<div class="bg-white rounded-lg shadow" class:two-page={isTwoPage}>
  <div class="p-4 border-b">
    <h2 class="text-xl font-semibold">Preview</h2>
    <p class="text-sm text-gray-500">Template: {templateId}</p>
  </div>
  
  <div class="overflow-auto max-h-[800px]" bind:this={resumeElement}>
    <div id="resume-preview" class="border p-8">
      <div class="resume-container">
        {#if component}
          <svelte:component this={component} resume={resumeData} />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .two-page #resume-preview {
    column-count: 2;
    column-gap: 2rem;
  }

  .two-page #resume-preview::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-left: 1px dashed #ccc;
  }
</style>