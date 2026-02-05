<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import { jsPDF } from 'jspdf';
  import html2canvas from 'html2canvas';
  import ResumeForm from '$lib/components/ResumeForm.svelte';
  import ResumePreview from '$lib/components/ResumePreview.svelte';
  import SwapTemplate from '$lib/components/SwapTemplate.svelte';
  import type { ResumeData } from '$lib/types';

  // Get template from URL parameter
  let templateId = $page.url.searchParams.get('template') || 'professional';
  let showTemplateSwitcher = false;
  let showPdfPreview = false;

  // Create resume store with default data
  const resume = writable<ResumeData>({
    personal: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: ''
    },
    experience: [
      { company: '', position: '', startDate: '', endDate: '', description: '', current: false }
    ],
    education: [
      { institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' }
    ],
    skills: [
      { name: '', level: 5 }
    ]
  });

  let resumeData: ResumeData;
  resume.subscribe(value => {
    resumeData = value;
  });

  // Update resume data from form
  function handleResumeUpdate(event: CustomEvent) {
    resume.set(event.detail);
  }

  // Export to PDF
  async function handleExportToPdf() {
    const resumeElement = document.getElementById('resume-preview');
    if (!resumeElement) return;

    resumeElement.classList.add('no-border-width');
    document.body.classList.add('pdf-capture');
    
    try {
      if ('fonts' in document) {
        await (document as Document & { fonts: { ready: Promise<void> } }).fonts.ready;
      }
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);

      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = pdfWidth / imgWidth;
      const scaledImgHeight = imgHeight * ratio;

      let heightLeft = scaledImgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledImgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = -heightLeft;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledImgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(`resume-${resumeData.personal.name || 'untitled'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      resumeElement.classList.remove('no-border-width');
      document.body.classList.remove('pdf-capture');
    }
  }

  // Save to localStorage
  function handleSaveResume() {
    try {
      localStorage.setItem('savedResume', JSON.stringify(resumeData));
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume. Please try again.');
    }
  }

  // Load from localStorage
  onMount(() => {
    try {
      const savedResume = localStorage.getItem('savedResume');
      if (savedResume) {
        resume.set(JSON.parse(savedResume));
      }
    } catch (error) {
      console.error('Error loading saved resume:', error);
    }
  });

  $: {
    if (showPdfPreview) {
      document.body.classList.add('pdf-preview');
    } else {
      document.body.classList.remove('pdf-preview');
    }
  }

  onDestroy(() => {
    document.body.classList.remove('pdf-preview');
  });
</script>

<svelte:head>
  <title>Build Your Resume - Resume Builder</title>
</svelte:head>

<div class="max-w-7xl mx-auto">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Build Your Resume</h1>
    <div class="flex items-center gap-3">
      <button
        on:click={() => showPdfPreview = !showPdfPreview}
        class={`px-4 py-2 rounded-lg transition-colors ${
          showPdfPreview ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {showPdfPreview ? 'Exit PDF Preview' : 'PDF Preview'}
      </button>
      <button
        on:click={() => showTemplateSwitcher = !showTemplateSwitcher}
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {showTemplateSwitcher ? 'Hide Templates' : 'Swap Template'}
      </button>
    </div>
  </div>

  {#if showTemplateSwitcher}
    <SwapTemplate on:select={(e) => templateId = e.detail} />
  {/if}
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
    <!-- Editor Panel -->
    <ResumeForm 
      {resumeData} 
      on:update={handleResumeUpdate} 
      on:save={handleSaveResume}
      on:export={handleExportToPdf}
    />
    
    <!-- Preview Panel -->
    <ResumePreview {resumeData} {templateId} />
  </div>
</div>
