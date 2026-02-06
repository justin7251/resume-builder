<script lang="ts">
  import type { ResumeData } from '$lib/types';
  import { sanitizeHtml } from '$lib/sanitize';
  export let resume: ResumeData;
  const defaultSectionOrder = ['summary', 'experience', 'education', 'skills'];
  $: sectionOrder = resume.sectionOrder?.length ? resume.sectionOrder : defaultSectionOrder;
</script>

<div class="text-sm leading-relaxed text-slate-800">
  <div class="border-b-2 border-slate-200 pb-6 mb-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900">{resume.personal.name || 'Your Name'}</h1>
        <p class="text-lg text-slate-500 mt-1">{resume.personal.title || 'Professional Title'}</p>
      </div>
      <div class="text-xs text-slate-500 space-y-1 text-right">
        {#if resume.personal.email}<div>{resume.personal.email}</div>{/if}
        {#if resume.personal.phone}<div>{resume.personal.phone}</div>{/if}
        {#if resume.personal.location}<div>{resume.personal.location}</div>{/if}
        {#if resume.personal.website}<div>{resume.personal.website}</div>{/if}
      </div>
    </div>
  </div>

  <div class="space-y-6">
    {#each sectionOrder as section}
      {#if section === 'summary' && resume.personal.summary}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Summary</h2>
          <div class="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div class="text-slate-700 tiptap">{@html sanitizeHtml(resume.personal.summary)}</div>
          </div>
        </section>
      {/if}

      {#if section === 'experience' && resume.experience.some(exp => exp.company || exp.position)}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Experience</h2>
          {#each resume.experience as exp}
            {#if exp.company || exp.position}
              <div class="mb-4">
                <div class="flex justify-between">
                  <h3 class="font-semibold text-slate-900">{exp.position || 'Position'}</h3>
                  <span class="text-xs text-slate-500">
                    {exp.startDate || 'Start Date'} - {exp.current ? 'Present' : (exp.endDate || 'End Date')}
                  </span>
                </div>
                <p class="text-slate-600">{exp.company || 'Company'}</p>
                {#if exp.description}
                  <div class="mt-1 text-xs text-slate-600 tiptap">{@html sanitizeHtml(exp.description)}</div>
                {/if}
              </div>
            {/if}
          {/each}
        </section>
      {/if}

      {#if section === 'education' && resume.education.some(edu => edu.institution || edu.degree)}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Education</h2>
          {#each resume.education as edu}
            {#if edu.institution || edu.degree}
              <div class="mb-4">
                <div class="flex justify-between">
                  <h3 class="font-semibold text-slate-900">{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</h3>
                  <span class="text-xs text-slate-500">
                    {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
                  </span>
                </div>
                <p class="text-slate-600">{edu.institution || 'Institution'}</p>
                {#if edu.description}
                  <div class="mt-1 text-xs text-slate-600 tiptap">{@html sanitizeHtml(edu.description)}</div>
                {/if}
              </div>
            {/if}
          {/each}
        </section>
      {/if}

      {#if section === 'skills' && resume.skills.some(skill => skill.name)}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Skills</h2>
          <div class="flex flex-wrap gap-2">
            {#each resume.skills as skill}
              {#if skill.name}
                <span class="bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold text-slate-700">
                  {skill.name}
                </span>
              {/if}
            {/each}
          </div>
        </section>
      {/if}
    {/each}
  </div>
</div>

<style>
  .tiptap ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
</style>
