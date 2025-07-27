<script lang="ts">
  import type { ResumeData } from '$lib/types';
  export let resume: ResumeData;
</script>

<div class="border-t-8 border-gray-800">
  <div class="py-6 border-b border-gray-300">
    <h1 class="text-4xl font-bold text-gray-800">{resume.personal.name || 'Your Name'}</h1>
    <p class="text-xl text-gray-700 mt-2">{resume.personal.title || 'Professional Title'}</p>
  </div>

  <div class="grid grid-cols-3 gap-6 mt-6">
    <!-- Left Column -->
    <div class="col-span-3 md:col-span-1">
      <div class="mb-6">
        <h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Contact Information</h2>
        <div class="space-y-2 text-sm">
          {#if resume.personal.email}
            <div>
              <span class="font-medium">Email:</span> {resume.personal.email}
            </div>
          {/if}
          {#if resume.personal.phone}
            <div>
              <span class="font-medium">Phone:</span> {resume.personal.phone}
            </div>
          {/if}
          {#if resume.personal.location}
            <div>
              <span class="font-medium">Location:</span> {resume.personal.location}
            </div>
          {/if}
          {#if resume.personal.website}
            <div>
              <span class="font-medium">Website:</span> {resume.personal.website}
            </div>
          {/if}
        </div>
      </div>

      {#if resume.skills.some(skill => skill.name)}
        <div>
          <h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Core Competencies</h2>
          <ul class="list-disc pl-5 space-y-1">
            {#each resume.skills as skill}
              {#if skill.name}
                <li>{skill.name}</li>
              {/if}
            {/each}
          </ul>
        </div>
      {/if}
    </div>

    <!-- Right Column -->
    <div class="col-span-3 md:col-span-2">
      {#if resume.personal.summary}
        <div class="mb-6">
          <h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Professional Summary</h2>
          <div class="text-gray-700 tiptap">{@html resume.personal.summary}</div>
        </div>
      {/if}

      {#if resume.experience.some(exp => exp.company || exp.position)}
        <div class="mb-6">
          <h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Professional Experience</h2>
          {#each resume.experience as exp}
            {#if exp.company || exp.position}
              <div class="mb-5">
                <div class="flex justify-between">
                  <h3 class="font-semibold">{exp.company || 'Company'}</h3>
                  <span class="text-sm text-gray-600">
                    {exp.startDate || 'Start Date'} - {exp.current ? 'Present' : (exp.endDate || 'End Date')}
                  </span>
                </div>
                <p class="text-gray-700 italic">{exp.position || 'Position'}</p>
                {#if exp.description}
                  <div class="mt-2 text-sm text-gray-700 tiptap">{@html exp.description}</div>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      {/if}

      {#if resume.education.some(edu => edu.institution || edu.degree)}
        <div>
          <h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Education</h2>
          {#each resume.education as edu}
            {#if edu.institution || edu.degree}
              <div class="mb-4">
                <div class="flex justify-between">
                  <h3 class="font-semibold">{edu.institution || 'Institution'}</h3>
                  <span class="text-sm text-gray-600">
                    {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
                  </span>
                </div>
                <p class="text-gray-700">{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</p>
                {#if edu.description}
                  <div class="mt-1 text-sm text-gray-600 tiptap">{@html edu.description}</div>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
