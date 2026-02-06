<script lang="ts">
  import type { ResumeData } from '$lib/types';
  import { onMount, afterUpdate } from 'svelte';
  import type { ComponentType } from 'svelte';
  import ProfessionalTemplate from '../templates/professional.svelte';
  import { getTemplateById } from '$lib/templateData';

  export let resumeData: ResumeData;
  export let templateId: string = 'professional';

  let resumeContentElement: HTMLElement;
  let component: ComponentType | null = null;
  let templateError = false;

  $: {
    const selected = getTemplateById(templateId);
    component = selected?.component || ProfessionalTemplate;
    templateError = !selected || selected.id !== templateId;
  }
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

<div class="resume-preview-shell">
  {#if templateError}
    <div class="text-xs text-red-600 mb-2 text-center">Template not found. Showing Professional.</div>
  {/if}
  <div class="resume-preview-frame">
    <div 
      id="resume-preview" 
      class="resume-preview-page"
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
  .resume-preview-shell {
    width: 100%;
  }

  .resume-preview-frame {
    background: #f1f5f9;
    border-radius: 16px;
    padding: 32px 24px 56px;
    overflow: auto;
    max-height: calc(100vh - 180px);
    display: flex;
    justify-content: center;
  }

  .resume-preview-page {
    border: 1px solid #e2e8f0;
    padding: 32px;
    background: #ffffff;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
    border-radius: 6px;
    margin: 0 auto;
  }

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
