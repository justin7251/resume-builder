<script lang="ts">
  import type { ResumeData } from '$lib/types';

  export let resume: ResumeData;
</script>

<div class="bg-white text-gray-800 font-sans text-sm resume-template">
  <div class="flex">
    <!-- Left Column -->
    <div class="w-1/3 bg-gray-800 text-white p-6">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold">{resume.personal.name}</h1>
        <p class="text-lg text-gray-400">{resume.personal.title}</p>
      </div>

      <div class="mb-4">
        <h2 class="text-xl font-semibold text-gray-300">Contact</h2>
        <div class="h-px bg-gray-600 mt-1 mb-2"></div>
        <p>{resume.personal.email}</p>
        <p>{resume.personal.phone}</p>
        <p>{resume.personal.location}</p>
        <p>{resume.personal.website}</p>
      </div>

      <div>
        <h2 class="text-xl font-semibold text-gray-300">Skills</h2>
        <div class="h-px bg-gray-600 mt-1 mb-2"></div>
        <ul>
          {#each resume.skills as skill}
            <li class="mb-2">
              <span class="font-semibold">{skill.name}</span>
              <div class="w-full bg-gray-600 rounded-full h-1.5 mt-1">
                <div class="bg-blue-400 h-1.5 rounded-full" style="width: {skill.level * 10}%"></div>
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Right Column -->
    <div class="w-2/3 p-6">
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-700">Summary</h2>
        <div class="h-px bg-gray-300 mt-1 mb-2"></div>
        <p class="text-gray-600">{@html resume.personal.summary}</p>
      </div>

      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-700">Experience</h2>
        <div class="h-px bg-gray-300 mt-1 mb-2"></div>
        {#each resume.experience as job}
          <div class="mb-3">
            <h3 class="job-title">{job.position}</h3>
            <p class="company-name">{job.company}</p>
            <p class="text-xs text-gray-500">{job.startDate} - {job.endDate}</p>
            <div class="mt-1 text-gray-600">{@html job.description}</div>
          </div>
        {/each}
      </div>

      <div>
        <h2 class="text-2xl font-bold text-gray-700">Education</h2>
        <div class="h-px bg-gray-300 mt-1 mb-2"></div>
        {#each resume.education as edu}
          <div class="mb-3">
            <h3 class="text-xl font-bold">{edu.degree}</h3>
            <p class="font-semibold text-md text-gray-600">{edu.institution}</p>
            <p class="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
            <div class="mt-1 text-gray-600">{@html edu.description}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
