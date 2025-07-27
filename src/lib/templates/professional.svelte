<script lang="ts">
  import type { ResumeData } from '$lib/types';
  export let resume: ResumeData;
</script>

<div class="mb-6 border-b pb-6">
  <h1 class="text-3xl font-bold text-blue-800">{resume.personal.name || 'Your Name'}</h1>
  <p class="text-xl text-gray-600 mt-1">{resume.personal.title || 'Professional Title'}</p>

  <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
    {#if resume.personal.email}
      <div class="flex items-center">
        <span class="mr-1">📧</span> {resume.personal.email}
      </div>
    {/if}
    {#if resume.personal.phone}
      <div class="flex items-center">
        <span class="mr-1">📱</span> {resume.personal.phone}
      </div>
    {/if}
    {#if resume.personal.location}
      <div class="flex items-center">
        <span class="mr-1">📍</span> {resume.personal.location}
      </div>
    {/if}
    {#if resume.personal.website}
      <div class="flex items-center">
        <span class="mr-1">🌐</span> {resume.personal.website}
      </div>
    {/if}
  </div>

  {#if resume.personal.summary}
    <div class="mt-4">
      <div class="text-gray-700 tiptap">{@html resume.personal.summary}</div>
    </div>
  {/if}
</div>

{#if resume.experience.some(exp => exp.company || exp.position)}
  <div class="mb-6">
    <h2 class="text-xl font-bold text-blue-800 mb-3">Experience</h2>
    {#each resume.experience as exp}
      {#if exp.company || exp.position}
        <div class="mb-4">
          <div class="flex justify-between">
            <h3 class="font-semibold">{exp.position || 'Position'}</h3>
            <span class="text-sm text-gray-600">
              {exp.startDate || 'Start Date'} - {exp.current ? 'Present' : (exp.endDate || 'End Date')}
            </span>
          </div>
          <p class="text-gray-700">{exp.company || 'Company'}</p>
          {#if exp.description}
            <div class="mt-1 text-sm text-gray-600 tiptap">{@html exp.description}</div>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
{/if}

{#if resume.education.some(edu => edu.institution || edu.degree)}
  <div class="mb-6">
    <h2 class="text-xl font-bold text-blue-800 mb-3">Education</h2>
    {#each resume.education as edu}
      {#if edu.institution || edu.degree}
        <div class="mb-4">
          <div class="flex justify-between">
            <h3 class="font-semibold">{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</h3>
            <span class="text-sm text-gray-600">
              {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
            </span>
          </div>
          <p class="text-gray-700">{edu.institution || 'Institution'}</p>
          {#if edu.description}
            <div class="mt-1 text-sm text-gray-600 tiptap">{@html edu.description}</div>
          {/if}
        </div>
      {/if}
    {/each}
  </div>
{/if}

{#if resume.skills.some(skill => skill.name)}
  <div>
    <h2 class="text-xl font-bold text-blue-800 mb-3">Skills</h2>
    <div class="flex flex-wrap gap-2">
      {#each resume.skills as skill}
        {#if skill.name}
          <div class="bg-blue-50 border border-blue-200 rounded px-3 py-1">
            <span class="font-medium">{skill.name}</span>
            <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
              <div class="bg-blue-600 h-1.5 rounded-full" style="width: {skill.level * 10}%"></div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  </div>
{/if}
