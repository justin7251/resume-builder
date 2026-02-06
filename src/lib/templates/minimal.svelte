<script lang="ts">
  import type { ResumeData } from '$lib/types';
  import { sanitizeHtml } from '$lib/sanitize';
  export let resume: ResumeData;
</script>

<div class="max-w-2xl mx-auto text-sm leading-relaxed text-slate-800">
  <div class="text-center mb-10">
    <h1 class="text-3xl font-semibold tracking-tight">{resume.personal.name || 'Your Name'}</h1>
    <p class="text-base text-slate-500 mt-1 uppercase tracking-widest">{resume.personal.title || 'Professional Title'}</p>
    <div class="mt-4 flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
      {#if resume.personal.email}<span>{resume.personal.email}</span>{/if}
      {#if resume.personal.phone}<span>- {resume.personal.phone}</span>{/if}
      {#if resume.personal.location}<span>- {resume.personal.location}</span>{/if}
      {#if resume.personal.website}<span>- {resume.personal.website}</span>{/if}
    </div>
  </div>

  {#if resume.personal.summary}
    <section class="mb-8">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Summary</h2>
      <div class="text-slate-700 tiptap">{@html sanitizeHtml(resume.personal.summary)}</div>
    </section>
  {/if}

  {#if resume.experience.some(exp => exp.company || exp.position)}
    <section class="mb-8">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Experience</h2>
      {#each resume.experience as exp}
        {#if exp.company || exp.position}
          <div class="mb-5">
            <div class="flex justify-between text-xs text-slate-500 mb-1">
              <span>{exp.startDate || 'Start'} - {exp.current ? 'Present' : (exp.endDate || 'End')}</span>
              <span>{exp.company || 'Company'}</span>
            </div>
            <h3 class="font-semibold">{exp.position || 'Position'}</h3>
            {#if exp.description}
              <div class="mt-2 text-xs text-slate-600 tiptap">{@html sanitizeHtml(exp.description)}</div>
            {/if}
          </div>
        {/if}
      {/each}
    </section>
  {/if}

  {#if resume.education.some(edu => edu.institution || edu.degree)}
    <section class="mb-8">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Education</h2>
      {#each resume.education as edu}
        {#if edu.institution || edu.degree}
          <div class="mb-4">
            <div class="flex justify-between text-xs text-slate-500 mb-1">
              <span>{edu.startDate || 'Start'} - {edu.endDate || 'End'}</span>
              <span>{edu.institution || 'Institution'}</span>
            </div>
            <h3 class="font-semibold">{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</h3>
            {#if edu.description}
              <div class="mt-2 text-xs text-slate-600 tiptap">{@html sanitizeHtml(edu.description)}</div>
            {/if}
          </div>
        {/if}
      {/each}
    </section>
  {/if}

  {#if resume.skills.some(skill => skill.name)}
    <section>
      <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Skills</h2>
      <div class="flex flex-wrap gap-2">
        {#each resume.skills as skill}
          {#if skill.name}
            <span class="border border-slate-200 rounded-full px-3 py-1 text-xs">{skill.name}</span>
          {/if}
        {/each}
      </div>
    </section>
  {/if}
</div>

<style>
  .tiptap ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
</style>



