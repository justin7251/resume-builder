<script lang="ts">
  import type { ResumeData } from '$lib/types';
  import { sanitizeHtml } from '$lib/sanitize';
  export let resume: ResumeData;
</script>

<div class="text-sm leading-relaxed text-slate-800">
  <div class="border-t-8 border-slate-800 pt-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-4xl font-bold text-slate-900">{resume.personal.name || 'Your Name'}</h1>
        <p class="text-lg text-slate-600 mt-2">{resume.personal.title || 'Professional Title'}</p>
      </div>
      <div class="text-xs text-slate-500 space-y-1 text-right">
        {#if resume.personal.email}<div>{resume.personal.email}</div>{/if}
        {#if resume.personal.phone}<div>{resume.personal.phone}</div>{/if}
        {#if resume.personal.location}<div>{resume.personal.location}</div>{/if}
        {#if resume.personal.website}<div>{resume.personal.website}</div>{/if}
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
    <aside class="md:col-span-1 space-y-6">
      {#if resume.skills.some(skill => skill.name)}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Core Competencies</h2>
          <ul class="space-y-2">
            {#each resume.skills as skill}
              {#if skill.name}
                <li class="text-sm">- {skill.name}</li>
              {/if}
            {/each}
          </ul>
        </section>
      {/if}

      {#if resume.education.some(edu => edu.institution || edu.degree)}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Education</h2>
          {#each resume.education as edu}
            {#if edu.institution || edu.degree}
              <div class="mb-3">
                <div class="font-semibold">{edu.degree || 'Degree'}</div>
                <div class="text-slate-600">{edu.institution || 'Institution'}</div>
                <div class="text-xs text-slate-500">{edu.startDate || 'Start'} - {edu.endDate || 'End'}</div>
              </div>
            {/if}
          {/each}
        </section>
      {/if}
    </aside>

    <section class="md:col-span-2 space-y-6">
      {#if resume.personal.summary}
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Executive Summary</h2>
          <div class="text-slate-700 tiptap">{@html sanitizeHtml(resume.personal.summary)}</div>
        </div>
      {/if}

      {#if resume.experience.some(exp => exp.company || exp.position)}
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Professional Experience</h2>
          {#each resume.experience as exp}
            {#if exp.company || exp.position}
              <div class="mb-5 border-l-2 border-slate-200 pl-4">
                <div class="flex justify-between">
                  <h3 class="font-semibold text-slate-900">{exp.position || 'Position'}</h3>
                  <span class="text-xs text-slate-500">
                    {exp.startDate || 'Start Date'} - {exp.current ? 'Present' : (exp.endDate || 'End Date')}
                  </span>
                </div>
                <p class="text-slate-600">{exp.company || 'Company'}</p>
                {#if exp.description}
                  <div class="mt-2 text-xs text-slate-600 tiptap">{@html sanitizeHtml(exp.description)}</div>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </section>
  </div>
</div>

<style>
  .tiptap ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
</style>



