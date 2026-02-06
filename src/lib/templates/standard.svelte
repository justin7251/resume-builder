<script lang="ts">
  import type { ResumeData } from '$lib/types';
  import { sanitizeHtml } from '$lib/sanitize';
  export let resume: ResumeData;
</script>

<div class="text-sm leading-relaxed text-slate-800">
  <div class="border-b-2 border-amber-200 pb-6 mb-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-semibold text-slate-900">{resume.personal.name || 'Your Name'}</h1>
        <p class="text-base text-amber-700 mt-1 uppercase tracking-widest">{resume.personal.title || 'Professional Title'}</p>
      </div>
      <div class="text-xs text-slate-500 space-y-1 text-right">
        {#if resume.personal.email}<div>{resume.personal.email}</div>{/if}
        {#if resume.personal.phone}<div>{resume.personal.phone}</div>{/if}
        {#if resume.personal.location}<div>{resume.personal.location}</div>{/if}
        {#if resume.personal.website}<div>{resume.personal.website}</div>{/if}
      </div>
    </div>
  </div>

  {#if resume.personal.summary}
    <section class="mb-8">
      <h2 class="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">Summary</h2>
      <div class="text-slate-700 tiptap">{@html sanitizeHtml(resume.personal.summary)}</div>
    </section>
  {/if}

  <div class="space-y-8">
    {#if resume.experience.some(exp => exp.company || exp.position)}
      <section>
        <h2 class="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">Experience</h2>
        {#each resume.experience as exp}
          {#if exp.company || exp.position}
            <div class="mb-4">
              <div class="flex justify-between text-xs text-slate-500">
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
      <section>
        <h2 class="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">Education</h2>
        {#each resume.education as edu}
          {#if edu.institution || edu.degree}
            <div class="mb-4">
              <div class="flex justify-between text-xs text-slate-500">
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
        <h2 class="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">Skills</h2>
        <div class="flex flex-wrap gap-2">
          {#each resume.skills as skill}
            {#if skill.name}
              <span class="bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-xs font-semibold text-amber-800">
                {skill.name}
              </span>
            {/if}
          {/each}
        </div>
      </section>
    {/if}
  </div>
</div>

<style>
  .tiptap ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
</style>
