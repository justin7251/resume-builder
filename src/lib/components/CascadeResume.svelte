<script lang="ts">
  import type { ResumeData } from '$lib/types';

  export let resume: ResumeData;
</script>

<div class="p-8 bg-gray-100 text-gray-800 font-sans">
  <div class="text-center mb-8">
    <h1 class="text-5xl font-bold text-indigo-600 tracking-wider">{resume.personal.name}</h1>
    <p class="text-xl text-gray-600 mt-2">{resume.personal.title}</p>
  </div>

  <div class="grid grid-cols-3 gap-8">
    <div class="col-span-1">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-indigo-500 mb-4">Contact</h2>
        <p>{resume.personal.email}</p>
        <p>{resume.personal.phone}</p>
        <p>{resume.personal.location}</p>
        <p>{resume.personal.website}</p>
      </div>
      <div>
        <h2 class="text-2xl font-bold text-indigo-500 mb-4">Skills</h2>
        <ul>
          {#each resume.skills as skill}
            <li class="mb-2">
              <span class="font-semibold">{skill.name}</span>
              <div class="w-full bg-gray-300 rounded-full h-2.5">
                <div class="bg-indigo-600 h-2.5 rounded-full" style="width: {skill.level * 10}%"></div>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <div class="col-span-2">
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-indigo-500 mb-4">Summary</h2>
        <p>{@html resume.personal.summary}</p>
      </div>
      <div class="mb-6">
        <h2 class="text-3xl font-bold text-indigo-500 mb-4">Experience</h2>
        {#each resume.experience as job}
          <div class="mb-4">
            <h3 class="text-2xl font-bold">{job.position}</h3>
            <p class="font-semibold text-lg">{job.company}</p>
            <p class="text-sm text-gray-600">{job.startDate} - {job.endDate}</p>
            <p class="mt-2">{@html job.description}</p>
          </div>
        {/each}
      </div>
      <div>
        <h2 class="text-3xl font-bold text-indigo-500 mb-4">Education</h2>
        {#each resume.education as edu}
          <div class="mb-4">
            <h3 class="text-2xl font-bold">{edu.degree}</h3>
            <p class="font-semibold text-lg">{edu.institution}</p>
            <p class="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
