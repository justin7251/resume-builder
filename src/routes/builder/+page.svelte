<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';
	import { jsPDF } from 'jspdf';
	import html2canvas from 'html2canvas';
	import { sanitizeHtml } from '$lib/sanitize';
	import ResumeForm from '$lib/components/ResumeForm.svelte';
	import ResumePreview from '$lib/components/ResumePreview.svelte';
	import SwapTemplate from '$lib/components/SwapTemplate.svelte';
	import type { ResumeData } from '$lib/types';
import { getTemplateById } from '$lib/templateData';

  // Get template from URL parameter (reactive)
  let templateId = 'professional';
  $: templateId = $page.url.searchParams.get('template') || 'professional';
  let showTemplateSwitcher = false;
  let showPdfPreview = false;
  let isProofreading = false;
  let proofreadError = '';
  let showProofreadDiff = false;
  let summaryDiff: { current: string; next: string; changed: boolean }[] = [];
  let experienceDiff: { current: string; next: string; changed: boolean }[] = [];
  let educationDiff: { current: string; next: string; changed: boolean }[] = [];
  let pendingProofread: {
    summary_html?: string;
    experience_html?: string[];
    education_html?: string[];
    current_summary?: string;
    current_experience?: string[];
    current_education?: string[];
  } | null = null;

  let activeTemplate = getTemplateById(templateId);

  const defaultSectionOrder = ['summary', 'experience', 'education', 'skills'] as const;

  function getDefaultResume(selectedTemplate: string): ResumeData {
    if (selectedTemplate === 'fresh') {
      return {
        personal: {
          name: 'Jordan Lee',
          title: 'Computer Science Student',
          email: 'jordan.lee@example.com',
          phone: '+1 (555) 123-4567',
          location: 'Austin, TX',
          website: 'github.com/jordanlee',
          summary:
            '<p>Computer Science student with hands-on project experience in web development and data structures. Seeking a software engineering internship to apply problem-solving skills and ship user-focused products.</p>'
        },
        experience: [
          {
            company: 'Campus Tech Lab',
            position: 'Student Developer',
            startDate: 'Sep 2023',
            endDate: '',
            description:
              '<ul><li>Built a scheduling app used by 150+ students, reducing booking time by 40%.</li><li>Collaborated with a 4-person team to ship features in two-week sprints.</li></ul>',
            current: true
          }
        ],
        education: [
          {
            institution: 'University of Texas at Austin',
            degree: 'B.S.',
            field: 'Computer Science',
            startDate: '2022',
            endDate: '2026',
            description: 'Relevant coursework: Algorithms, Databases, Human-Computer Interaction.'
          }
        ],
        skills: [
          { name: 'JavaScript', level: 7 },
          { name: 'React', level: 6 },
          { name: 'Python', level: 7 },
          { name: 'SQL', level: 6 }
        ],
        sectionOrder: [...defaultSectionOrder]
      };
    }

    return {
      personal: {
        name: 'Alex Morgan',
        title: 'Senior Product Designer',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 000-0000',
        location: 'San Francisco, CA',
        website: 'alexmorgan.design',
        summary:
          '<p>Product designer with 7+ years of experience building scalable, user-centered platforms. Led cross-functional teams to launch features that improved activation by 28% and reduced churn by 15%.</p>'
      },
      experience: [
        {
          company: 'TechCorp Systems',
          position: 'Senior Product Designer',
          startDate: 'Jan 2021',
          endDate: '',
          description:
            '<ul><li>Led design system rollout across 6 teams, reducing UI inconsistencies by 40%.</li><li>Partnered with PM and engineering to ship onboarding flow that lifted conversion by 22%.</li></ul>',
          current: true
        },
        {
          company: 'Nimbus Labs',
          position: 'Product Designer',
          startDate: 'Jun 2018',
          endDate: 'Dec 2020',
          description:
            '<ul><li>Created a new information architecture for analytics dashboards, cutting time-to-insight by 30%.</li><li>Conducted user research and usability tests with 40+ participants.</li></ul>',
          current: false
        }
      ],
      education: [
        {
          institution: 'University of California, Berkeley',
          degree: 'B.A.',
          field: 'Cognitive Science',
          startDate: '2014',
          endDate: '2018',
          description: 'Focus on human-computer interaction and design research.'
        }
      ],
      skills: [
        { name: 'Product Strategy', level: 8 },
        { name: 'Design Systems', level: 9 },
        { name: 'Figma', level: 9 },
        { name: 'User Research', level: 8 }
      ],
      sectionOrder: [...defaultSectionOrder]
    };
  }

  // Create resume store with default data
  const resume = writable<ResumeData>(getDefaultResume(templateId));

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

      // Avoid adding an extra near-duplicate page due to tiny float overflow.
      const epsilon = 1;
      while (heightLeft > epsilon) {
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

  function handleResetResume() {
    resume.set(getDefaultResume(templateId));
    try {
      localStorage.removeItem('savedResume');
    } catch (error) {
      console.error('Error clearing saved resume:', error);
    }
  }

  function stripHtml(value: string) {
    if (!value) return '';
    if (!browser) {
      return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    const div = document.createElement('div');
    div.innerHTML = value;
    return div.textContent || div.innerText || '';
  }

  function htmlToLines(value: string) {
    return stripHtml(value)
      .split(/\r?\n+/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  function buildDiff(currentText: string, nextText: string) {
    const currentLines = htmlToLines(currentText);
    const nextLines = htmlToLines(nextText);
    const max = Math.max(currentLines.length, nextLines.length);
    const diff = [];
    for (let i = 0; i < max; i += 1) {
      const current = currentLines[i] || '';
      const next = nextLines[i] || '';
      diff.push({ current, next, changed: current !== next });
    }
    return diff;
  }

  async function handleProofread() {
    if (isProofreading) return;
    if (!confirm('Run AI proofread and replace your current content?')) {
      return;
    }
    proofreadError = '';
    isProofreading = true;

    try {
      const payload = {
        provider: 'gemini',
        jobTitle: resumeData.personal.title,
        summary: stripHtml(resumeData.personal.summary || ''),
        experiences: resumeData.experience.map((exp) => ({
          role: exp.position,
          company: exp.company,
          dates: `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`.trim(),
          description: stripHtml(exp.description || '')
        })),
        education: resumeData.education.map((edu) => ({
          school: edu.institution,
          degree: `${edu.degree || ''}${edu.field ? ` in ${edu.field}` : ''}`.trim(),
          dates: `${edu.startDate || ''} - ${edu.endDate || ''}`.trim(),
          description: stripHtml(edu.description || '')
        })),
        skills: resumeData.skills.map((skill) => skill.name).filter(Boolean)
      };

      const response = await fetch('/api/ai-proofread', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        proofreadError = data?.error || 'AI proofread failed.';
        return;
      }

      pendingProofread = {
        summary_html: typeof data?.summary_html === 'string' ? data.summary_html : resumeData.personal.summary,
        experience_html: Array.isArray(data?.experience_html) ? data.experience_html : [],
        education_html: Array.isArray(data?.education_html) ? data.education_html : [],
        current_summary: resumeData.personal.summary || '',
        current_experience: resumeData.experience.map((exp) => exp.description || ''),
        current_education: resumeData.education.map((edu) => edu.description || '')
      };

      if (!pendingProofread) {
        proofreadError = 'AI proofread did not return usable content.';
      }
    } catch (error) {
      console.error('Proofread error:', error);
      proofreadError = 'AI proofread failed. Please try again.';
    } finally {
      isProofreading = false;
    }
  }

  function applyProofread() {
    if (!pendingProofread) return;
    if (typeof pendingProofread.summary_html === 'string') {
      resumeData.personal.summary = pendingProofread.summary_html;
    }
    if (Array.isArray(pendingProofread.experience_html)) {
      resumeData.experience = resumeData.experience.map((exp, index) => ({
        ...exp,
        description: pendingProofread.experience_html?.[index] || exp.description
      }));
    }
    if (Array.isArray(pendingProofread.education_html)) {
      resumeData.education = resumeData.education.map((edu, index) => ({
        ...edu,
        description: pendingProofread.education_html?.[index] || edu.description
      }));
    }
    resume.set({ ...resumeData });
    pendingProofread = null;
  }

  function discardProofread() {
    pendingProofread = null;
    showProofreadDiff = false;
  }

  $: if (pendingProofread) {
    summaryDiff = buildDiff(pendingProofread.current_summary || '', pendingProofread.summary_html || '');
    experienceDiff = buildDiff(
      (pendingProofread.current_experience || []).join('\n'),
      (pendingProofread.experience_html || []).join('\n')
    );
    educationDiff = buildDiff(
      (pendingProofread.current_education || []).join('\n'),
      (pendingProofread.education_html || []).join('\n')
    );
  } else {
    summaryDiff = [];
    experienceDiff = [];
    educationDiff = [];
  }

  // Load from localStorage
  onMount(() => {
    try {
      const savedResume = localStorage.getItem('savedResume');
      if (savedResume) {
        const parsed = JSON.parse(savedResume);
        if (!Array.isArray(parsed?.sectionOrder) || parsed.sectionOrder.length === 0) {
          parsed.sectionOrder = [...defaultSectionOrder];
        }
        resume.set(parsed);
      }
    } catch (error) {
      console.error('Error loading saved resume:', error);
    }
  });

  $: if (browser) {
    if (showPdfPreview) {
      document.body.classList.add('pdf-preview');
    } else {
      document.body.classList.remove('pdf-preview');
    }
  }

  onDestroy(() => {
    if (browser) {
      document.body.classList.remove('pdf-preview');
    }
  });

  $: activeTemplate = getTemplateById(templateId);
</script>

<svelte:head>
  <title>Build Your Resume - Resume Builder</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 text-slate-900">
  <header class="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
    <div class="flex items-center gap-4">
      <a href="/" class="size-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
        <span class="material-symbols-outlined text-xl">description</span>
      </a>
      <div>
        <h1 class="text-sm font-bold flex items-center gap-2">
          {resumeData?.personal?.name || 'Untitled Resume'}
        </h1>
        <div class="flex items-center gap-1.5">
          <span class="size-1.5 bg-emerald-500 rounded-full"></span>
          <p class="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Saved locally</p>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <button
        on:click={() => showTemplateSwitcher = !showTemplateSwitcher}
        class="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <span class="material-symbols-outlined text-lg">dashboard_customize</span>
        {showTemplateSwitcher ? 'Hide Templates' : 'Change Template'}
      </button>
      <div class="w-px h-6 bg-slate-200 mx-1"></div>
      <button
        on:click={() => showPdfPreview = !showPdfPreview}
        class={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg border ${
          showPdfPreview ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'
        }`}
      >
        <span class="material-symbols-outlined text-lg">visibility</span>
        {showPdfPreview ? 'Exit Preview' : 'PDF Preview'}
      </button>
      <button
        on:click={handleSaveResume}
        class="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm"
      >
        <span class="material-symbols-outlined text-lg">save</span>
        Save
      </button>
      <button
        on:click={handleResetResume}
        class="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
      >
        <span class="material-symbols-outlined text-lg">restart_alt</span>
        Reset
      </button>
      <button
        on:click={handleProofread}
        class="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
        disabled={isProofreading}
      >
        <span class="material-symbols-outlined text-lg">auto_fix_high</span>
        {isProofreading ? 'Proofreading...' : 'AI Proofread'}
      </button>
      <button
        on:click={handleExportToPdf}
        class="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700"
      >
        <span class="material-symbols-outlined text-lg">download</span>
        Download PDF
      </button>
    </div>
  </header>

  {#if showTemplateSwitcher}
    <div class="bg-white border-b border-slate-200 px-6 py-4">
      <SwapTemplate on:select={(e) => templateId = e.detail} />
    </div>
  {/if}

  {#if proofreadError}
    <div class="bg-red-50 text-red-700 text-sm px-6 py-3 border-b border-red-100">
      {proofreadError}
    </div>
  {/if}

  <div class="bg-white border-b border-slate-200 px-6 py-3 text-xs text-slate-500 flex flex-wrap items-center gap-3">
    <span class="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
      Layout: {activeTemplate.layout}
    </span>
    <span class="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
      {activeTemplate.badge}
    </span>
    <span>{activeTemplate.atsNote}</span>
  </div>

  {#if pendingProofread}
    <div class="bg-blue-50 text-blue-700 text-sm px-6 py-3 border-b border-blue-100 flex items-center justify-between">
      <div>
        AI proofread is ready. Review and apply the updated content.
      </div>
      <div class="flex items-center gap-2">
        <button
          on:click={() => (showProofreadDiff = true)}
          class="px-3 py-1.5 rounded-full bg-white border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100"
        >
          View Diff
        </button>
        <button
          on:click={discardProofread}
          class="px-3 py-1.5 rounded-full bg-white border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100"
        >
          Discard
        </button>
        <button
          on:click={applyProofread}
          class="px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
        >
          Apply Changes
        </button>
      </div>
    </div>
  {/if}

  {#if showProofreadDiff && pendingProofread}
    <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">
      <div class="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div class="font-semibold">AI Proofread Diff</div>
          <button
            on:click={() => (showProofreadDiff = false)}
            class="text-slate-500 hover:text-slate-900"
          >
            Close
          </button>
        </div>
        <div class="overflow-y-auto">
          <div class="grid grid-cols-2 text-xs font-semibold uppercase tracking-widest text-slate-500 px-6 pt-4">
            <div>Current</div>
            <div>AI Suggested</div>
          </div>

          <div class="px-6 py-4">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Summary</div>
            <div class="space-y-2">
              {#each summaryDiff as line}
                <div class="grid grid-cols-2 gap-4">
                  <div class={`text-sm ${line.changed ? 'bg-amber-50' : ''} rounded-md px-3 py-2`}>{line.current}</div>
                  <div class={`text-sm ${line.changed ? 'bg-emerald-50' : ''} rounded-md px-3 py-2`}>{line.next}</div>
                </div>
              {/each}
            </div>
          </div>

          <div class="px-6 py-4 border-t border-slate-200">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Experience</div>
            <div class="space-y-2">
              {#each experienceDiff as line}
                <div class="grid grid-cols-2 gap-4">
                  <div class={`text-sm ${line.changed ? 'bg-amber-50' : ''} rounded-md px-3 py-2`}>{line.current}</div>
                  <div class={`text-sm ${line.changed ? 'bg-emerald-50' : ''} rounded-md px-3 py-2`}>{line.next}</div>
                </div>
              {/each}
            </div>
          </div>

          <div class="px-6 py-4 border-t border-slate-200">
            <div class="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Education</div>
            <div class="space-y-2">
              {#each educationDiff as line}
                <div class="grid grid-cols-2 gap-4">
                  <div class={`text-sm ${line.changed ? 'bg-amber-50' : ''} rounded-md px-3 py-2`}>{line.current}</div>
                  <div class={`text-sm ${line.changed ? 'bg-emerald-50' : ''} rounded-md px-3 py-2`}>{line.next}</div>
                </div>
              {/each}
            </div>
          </div>
        </div>
        <div class="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            on:click={discardProofread}
            class="px-4 py-2 rounded-full border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
          >
            Discard
          </button>
          <button
            on:click={applyProofread}
            class="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  {/if}

  <main class="flex flex-col lg:flex-row gap-0">
    <aside class="w-full lg:w-[520px] border-r border-slate-200 bg-white p-6 space-y-8">
      <ResumeForm
        {resumeData}
        on:update={handleResumeUpdate}
        on:save={handleSaveResume}
        on:export={handleExportToPdf}
      />
    </aside>

    <section class="flex-1 bg-slate-100 flex items-start justify-center overflow-y-auto py-12">
      <ResumePreview {resumeData} {templateId} />
    </section>
  </main>
</div>
