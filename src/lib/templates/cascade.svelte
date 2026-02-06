<script lang="ts">
  import type { ResumeData } from '$lib/types';
  import { sanitizeHtml } from '$lib/sanitize';

  export let resume: ResumeData;
</script>

<div class="bg-white text-gray-800 text-sm resume-template leading-relaxed">
  <div class="flex">
    <aside class="w-1/3 bg-slate-900 text-white p-6">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold">{resume.personal.name || 'Your Name'}</h1>
        <p class="text-sm text-slate-300 mt-1 uppercase tracking-widest">{resume.personal.title || 'Professional Title'}</p>
      </div>

      <div class="mb-5">
        <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-300">Contact</h2>
        <div class="h-px bg-slate-700 mt-2 mb-3"></div>
        <div class="space-y-2 text-xs">
          {#if resume.personal.email}<p>{resume.personal.email}</p>{/if}
          {#if resume.personal.phone}<p>{resume.personal.phone}</p>{/if}
          {#if resume.personal.location}<p>{resume.personal.location}</p>{/if}
          {#if resume.personal.website}<p>{resume.personal.website}</p>{/if}
        </div>
      </div>

      {#if resume.skills.some(skill => skill.name)}
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-300">Skills</h2>
          <div class="h-px bg-slate-700 mt-2 mb-3"></div>
          <ul class="space-y-2">
            {#each resume.skills as skill}
              {#if skill.name}
                <li>
                  <span class="font-semibold">{skill.name}</span>
                  <div class="w-full bg-slate-700 rounded-full h-1.5 mt-1">
                    <div class="bg-emerald-400 h-1.5 rounded-full" style="width: {skill.level * 10}%"></div>
                  </div>
                </li>
              {/if}
            {/each}
          </ul>
        </div>
      {/if}
    </aside>

    <main class="w-2/3 p-6 space-y-6">
      {#if resume.personal.summary}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500">Summary</h2>
          <div class="h-px bg-slate-200 mt-2 mb-3"></div>
          <div class="text-slate-700 tiptap">{@html sanitizeHtml(resume.personal.summary)}</div>
        </section>
      {/if}

      {#if resume.experience.some(exp => exp.company || exp.position)}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500">Experience</h2>
          <div class="h-px bg-slate-200 mt-2 mb-3"></div>
          {#each resume.experience as job}
            {#if job.company || job.position}
              <div class="mb-4">
                <div class="flex justify-between text-xs text-slate-500">
                  <span>{job.startDate || 'Start'} - {job.current ? 'Present' : (job.endDate || 'End')}</span>
                  <span>{job.company || 'Company'}</span>
                </div>
                <h3 class="text-base font-semibold">{job.position || 'Position'}</h3>
                {#if job.description}
                  <div class="mt-2 text-xs text-slate-600 tiptap">{@html sanitizeHtml(job.description)}</div>
                {/if}
              </div>
            {/if}
          {/each}
        </section>
      {/if}

      {#if resume.education.some(edu => edu.institution || edu.degree)}
        <section>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-slate-500">Education</h2>
          <div class="h-px bg-slate-200 mt-2 mb-3"></div>
          {#each resume.education as edu}
            {#if edu.institution || edu.degree}
              <div class="mb-4">
                <div class="flex justify-between text-xs text-slate-500">
                  <span>{edu.startDate || 'Start'} - {edu.endDate || 'End'}</span>
                  <span>{edu.institution || 'Institution'}</span>
                </div>
                <h3 class="text-base font-semibold">{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</h3>
                {#if edu.description}
                  <div class="mt-2 text-xs text-slate-600 tiptap">{@html sanitizeHtml(edu.description)}</div>
                {/if}
              </div>
            {/if}
          {/each}
        </section>
      {/if}
    </main>
  </div>
</div>

<style>
  .tiptap ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
</style>
