<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import { jsPDF } from 'jspdf';
  import html2canvas from 'html2canvas';
  import ResumeForm from '$lib/components/ResumeForm.svelte';
  import ResumePreview from '$lib/components/ResumePreview.svelte';
  import type { ResumeData } from '$lib/types';

  // Get template from URL parameter
  let templateId = $page.url.searchParams.get('template') || 'professional';

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
    
    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        logging: false
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
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      pdf.addImage(imgData, 'PNG', imgX, 0, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`resume-${resumeData.personal.name || 'untitled'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
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
</script>

<svelte:head>
  <title>Build Your Resume - Resume Builder</title>
</svelte:head>

<div class="max-w-7xl mx-auto">
  <h1 class="text-3xl font-bold mb-6">Build Your Resume</h1>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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