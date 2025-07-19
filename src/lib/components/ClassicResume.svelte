<script lang="ts">
  import type { ResumeData } from '$lib/types';

  export let resume: ResumeData;
</script>

<div class="p-8 bg-white text-gray-800 font-serif">
  <h1 class="text-4xl font-bold text-center mb-2">{resume.personal.name}</h1>
  <p class="text-center text-lg mb-6">{resume.personal.email} | {resume.personal.phone}</p>

  <div>
    <h2 class="text-2xl font-bold border-b-2 border-gray-800 pb-1 mb-4">Summary</h2>
    <p>{@html resume.personal.summary}</p>
  </div>

  <div class="mt-6">
    <h2 class="text-2xl font-bold border-b-2 border-gray-800 pb-1 mb-4">Experience</h2>
    {#each resume.experience as job}
      <div class="mb-4">
        <h3 class="text-xl font-bold">{job.position}</h3>
        <p class="font-semibold">{job.company}</p>
        <p class="text-sm text-gray-600">{job.startDate} - {job.endDate}</p>
        <p>{@html job.description}</p>
      </div>
    {/each}
  </div>

  <div class="mt-6">
    <h2 class="text-2xl font-bold border-b-2 border-gray-800 pb-1 mb-4">Education</h2>
    {#each resume.education as edu}
      <div class="mb-4">
        <h3 class="text-xl font-bold">{edu.degree}</h3>
        <p class="font-semibold">{edu.institution}</p>
        <p class="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
      </div>
    {/each}
  </div>

  <div class="mt-6">
    <h2 class="text-2xl font-bold border-b-2 border-gray-800 pb-1 mb-4">Skills</h2>
    <p>{resume.skills.map(skill => skill.name).join(', ')}</p>
  </div>
</div>
