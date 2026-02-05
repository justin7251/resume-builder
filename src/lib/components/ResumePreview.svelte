<script lang="ts">
  import type { ResumeData } from '$lib/types';
  import { onMount, afterUpdate } from 'svelte';
  import type { ComponentType } from 'svelte';
  import ProfessionalTemplate from '../templates/professional.svelte';

  export let resumeData: ResumeData;
  export let templateId: string = 'professional';

  let resumeContentElement: HTMLElement;
  let component: ComponentType | null = null;
  let templateError = false;

  $: import(`../templates/${templateId}.svelte`)
    .then(res => {
      component = res.default;
      templateError = false;
    })
    .catch(() => {
      component = ProfessionalTemplate;
      templateError = true;
    });
  let isTwoPage = false;

  const checkHeight = () => {
    if (resumeContentElement) {
      // A4 height in pixels at 96 DPI is ~1123px.
      // The container #resume-preview has p-8 (2rem = 32px) top/bottom padding.
      // So the available content height is roughly 1123 - 64 = 1059px.
      isTwoPage = resumeContentElement.scrollHeight > 1050;
    }
  };

  onMount(checkHeight);
  afterUpdate(checkHeight);
</script>

<div class="bg-white rounded-lg shadow resume-preview-panel">
  <div class="p-4 border-b resume-preview-header">
    <h2 class="text-xl font-semibold">Preview</h2>
    <p class="text-sm text-gray-500">Template: {templateId}</p>
    {#if templateError}
      <p class="text-xs text-red-600 mt-1">Template not found. Showing Professional.</p>
    {/if}
  </div>
  
  <div class="overflow-auto overflow-x-hidden max-h-[800px] p-4 bg-gray-100 resume-preview-frame">
    <div 
      id="resume-preview" 
      class="border p-8 bg-white shadow-lg mx-auto"
      class:two-page={isTwoPage}
    >
      <div class="resume-container" bind:this={resumeContentElement}>
        {#if component}
          <svelte:component this={component} resume={resumeData} />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  /* A4-like dimensions */
  #resume-preview {
    width: 794px;
    min-height: 1123px;
    box-sizing: border-box;
    position: relative;
  }

  .two-page {
    height: 1123px; /* Fixed height of one page */
    column-count: 2;
    column-gap: 4rem; /* Increased gap for better separation */
  }

  .two-page::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-left: 1px dashed #ccc;
    height: 100%;
  }
</style>
