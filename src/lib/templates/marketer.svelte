<script lang="ts">
  import type { ResumeData } from '$lib/types';
  import { sanitizeHtml } from '$lib/sanitize';
  export let resume: ResumeData;
</script>

<div class="text-sm leading-relaxed text-slate-800">
  <div class="border-b border-emerald-200 pb-6 mb-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-semibold text-slate-900">{resume.personal.name || 'Your Name'}</h1>
        <p class="text-base text-emerald-700 mt-1">{resume.personal.title || 'Professional Title'}</p>
      </div>
      <div class="text-xs text-slate-500 space-y-1 text-right">
        {#if resume.personal.email}<div>{resume.personal.email}</div>{/if}
        {#if resume.personal.phone}<div>{resume.personal.phone}</div>{/if}
        {#if resume.personal.location}<div>{resume.personal.location}</div>{/if}
        {#if resume.personal.website}<div>{resume.personal.website}</div>{/if}
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <aside class="md:col-span-1 space-y-6">
      {#if resume.personal.summary}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">Profile</h2>
          <div class="text-slate-700 tiptap">{@html sanitizeHtml(resume.personal.summary)}</div>
        </section>
      {/if}

      {#if resume.skills.some(skill => skill.name)}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">Core Skills</h2>
          <div class="space-y-2">
            {#each resume.skills as skill}
              {#if skill.name}
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-slate-700">{skill.name}</span>
                  <span class="text-emerald-700">{skill.level}/10</span>
                </div>
              {/if}
            {/each}
          </div>
        </section>
      {/if}
    </aside>

    <section class="md:col-span-2 space-y-6">
      {#if resume.experience.some(exp => exp.company || exp.position)}
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">Experience</h2>
          {#each resume.experience as exp}
            {#if exp.company || exp.position}
              <div class="mb-4 border-l-2 border-emerald-200 pl-4">
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
        </div>
      {/if}

      {#if resume.education.some(edu => edu.institution || edu.degree)}
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">Education</h2>
          {#each resume.education as edu}
            {#if edu.institution || edu.degree}
              <div class="mb-4 border-l-2 border-emerald-200 pl-4">
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
