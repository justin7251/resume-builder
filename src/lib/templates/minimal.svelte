<script lang="ts">
  import type { ResumeData } from '$lib/types';
  export let resume: ResumeData;
</script>

<div class="max-w-2xl mx-auto">
  <div class="text-center mb-8">
    <h1 class="text-3xl font-bold">{resume.personal.name || 'Your Name'}</h1>
    <p class="text-lg text-gray-700 mt-1">{resume.personal.title || 'Professional Title'}</p>

    <div class="mt-3 flex justify-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
      {#if resume.personal.email}
        <span>{resume.personal.email}</span>
      {/if}
      {#if resume.personal.phone}
        <span>• {resume.personal.phone}</span>
      {/if}
      {#if resume.personal.location}
        <span>• {resume.personal.location}</span>
      {/if}
      {#if resume.personal.website}
        <span>• {resume.personal.website}</span>
      {/if}
    </div>
  </div>

  {#if resume.personal.summary}
    <div class="mb-6">
      <div class="text-gray-700 tiptap">{@html resume.personal.summary}</div>
    </div>
  {/if}

  <hr class="my-6">

  {#if resume.experience.some(exp => exp.company || exp.position)}
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-4 uppercase tracking-wider">Experience</h2>
      {#each resume.experience as exp}
        {#if exp.company || exp.position}
          <div class="mb-4">
            <div class="flex justify-between mb-1">
              <h3 class="font-semibold">{exp.position || 'Position'}</h3>
              <span class="text-sm text-gray-600">
                {exp.startDate || 'Start Date'} - {exp.current ? 'Present' : (exp.endDate || 'End Date')}
              </span>
            </div>
            <p class="text-gray-700">{exp.company || 'Company'}</p>
            {#if exp.description}
              <div class="mt-2 text-sm text-gray-600 tiptap">{@html exp.description}</div>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  {/if}

  <hr class="my-6">

  {#if resume.education.some(edu => edu.institution || edu.degree)}
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-4 uppercase tracking-wider">Education</h2>
      {#each resume.education as edu}
        {#if edu.institution || edu.degree}
          <div class="mb-4">
            <div class="flex justify-between mb-1">
              <h3 class="font-semibold">{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</h3>
              <span class="text-sm text-gray-600">
                {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
              </span>
            </div>
            <p class="text-gray-700">{edu.institution || 'Institution'}</p>
            {#if edu.description}
              <div class="mt-2 text-sm text-gray-600 tiptap">{@html edu.description}</div>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  {/if}

  <hr class="my-6">

  {#if resume.skills.some(skill => skill.name)}
    <div>
      <h2 class="text-xl font-bold mb-4 uppercase tracking-wider">Skills</h2>
      <div class="flex flex-wrap gap-2">
        {#each resume.skills as skill}
          {#if skill.name}
            <span class="bg-gray-100 px-3 py-1 rounded">{skill.name}</span>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
    .tiptap ul {
        list-style-type: disc;
        padding-left: 1.5rem;
    }
</style>
