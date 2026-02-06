<script lang="ts">
  import type { ResumeData } from '$lib/types';
  import { sanitizeHtml } from '$lib/sanitize';
  export let resume: ResumeData;
</script>

<div class="text-sm leading-relaxed text-slate-800">
  <div class="flex flex-col md:flex-row gap-8">
    <aside class="md:w-1/3 bg-gradient-to-b from-purple-600 to-indigo-600 text-white rounded-2xl p-6">
      <div class="mb-6">
        <h1 class="text-2xl font-semibold">{resume.personal.name || 'Your Name'}</h1>
        <p class="text-sm text-indigo-100 mt-1 uppercase tracking-widest">{resume.personal.title || 'Professional Title'}</p>
      </div>
      <div class="space-y-2 text-xs">
        {#if resume.personal.email}<div>{resume.personal.email}</div>{/if}
        {#if resume.personal.phone}<div>{resume.personal.phone}</div>{/if}
        {#if resume.personal.location}<div>{resume.personal.location}</div>{/if}
        {#if resume.personal.website}<div>{resume.personal.website}</div>{/if}
      </div>
      {#if resume.skills.some(skill => skill.name)}
        <div class="mt-6">
          <h2 class="text-xs font-semibold uppercase tracking-widest text-indigo-100 mb-3">Skills</h2>
          <div class="space-y-2">
            {#each resume.skills as skill}
              {#if skill.name}
                <div>
                  <div class="flex justify-between text-xs">
                    <span>{skill.name}</span>
                    <span>{skill.level}/10</span>
                  </div>
                  <div class="w-full bg-white/20 rounded-full h-1.5 mt-1">
                    <div class="bg-white h-1.5 rounded-full" style="width: {skill.level * 10}%"></div>
                  </div>
                </div>
              {/if}
            {/each}
          </div>
        </div>
      {/if}
    </aside>

    <section class="md:w-2/3 space-y-6">
      {#if resume.personal.summary}
        <div class="bg-white border border-slate-200 rounded-xl p-4">
          <h2 class="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-2">About</h2>
          <div class="text-slate-700 tiptap">{@html sanitizeHtml(resume.personal.summary)}</div>
        </div>
      {/if}

      {#if resume.experience.some(exp => exp.company || exp.position)}
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-3">Experience</h2>
          {#each resume.experience as exp}
            {#if exp.company || exp.position}
              <div class="mb-4 pl-4 border-l-2 border-purple-200">
                <div class="flex justify-between text-xs text-slate-500">
                  <span>{exp.startDate || 'Start'} - {exp.current ? 'Present' : (exp.endDate || 'End')}</span>
                  <span>{exp.company || 'Company'}</span>
                </div>
                <h3 class="font-semibold text-slate-900">{exp.position || 'Position'}</h3>
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
          <h2 class="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-3">Education</h2>
          {#each resume.education as edu}
            {#if edu.institution || edu.degree}
              <div class="mb-4 pl-4 border-l-2 border-purple-200">
                <div class="flex justify-between text-xs text-slate-500">
                  <span>{edu.startDate || 'Start'} - {edu.endDate || 'End'}</span>
                  <span>{edu.institution || 'Institution'}</span>
                </div>
                <h3 class="font-semibold text-slate-900">{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</h3>
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
