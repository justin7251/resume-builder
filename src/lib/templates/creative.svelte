<script lang="ts">
  import type { ResumeData } from '$lib/types';
  export let resumeData: ResumeData;
</script>

<div class="flex flex-col md:flex-row gap-6">
  <!-- Sidebar -->
  <div class="md:w-1/3 bg-purple-100 p-6 rounded-lg">
    <div class="mb-6 text-center">
      <h1 class="text-2xl font-bold text-purple-800">{resumeData.personal.name || 'Your Name'}</h1>
      <p class="text-lg text-purple-600 mt-1">{resumeData.personal.title || 'Professional Title'}</p>
    </div>

    <div class="mb-6">
      <h2 class="text-lg font-semibold text-purple-700 mb-2 border-b border-purple-300 pb-1">Contact</h2>
      <div class="space-y-2 text-sm">
        {#if resumeData.personal.email}
          <div class="flex items-center">
            <span class="mr-2 text-purple-500">📧</span> {resumeData.personal.email}
          </div>
        {/if}
        {#if resumeData.personal.phone}
          <div class="flex items-center">
            <span class="mr-2 text-purple-500">📱</span> {resumeData.personal.phone}
          </div>
        {/if}
        {#if resumeData.personal.location}
          <div class="flex items-center">
            <span class="mr-2 text-purple-500">📍</span> {resumeData.personal.location}
          </div>
        {/if}
        {#if resumeData.personal.website}
          <div class="flex items-center">
            <span class="mr-2 text-purple-500">🌐</span> {resumeData.personal.website}
          </div>
        {/if}
      </div>
    </div>

    {#if resumeData.skills.some(skill => skill.name)}
      <div>
        <h2 class="text-lg font-semibold text-purple-700 mb-2 border-b border-purple-300 pb-1">Skills</h2>
        <div class="space-y-2">
          {#each resumeData.skills as skill}
            {#if skill.name}
              <div>
                <div class="flex justify-between text-sm">
                  <span>{skill.name}</span>
                  <span>{skill.level}/10</span>
                </div>
                <div class="w-full bg-purple-200 rounded-full h-2 mt-1">
                  <div class="bg-purple-600 h-2 rounded-full" style="width: {skill.level * 10}%"></div>
                </div>
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <!-- Main Content -->
  <div class="md:w-2/3">
    {#if resumeData.personal.summary}
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-purple-800 mb-2 border-b border-purple-200 pb-1">About Me</h2>
        <div class="text-gray-700 tiptap">{@html resumeData.personal.summary}</div>
      </div>
    {/if}

    {#if resumeData.experience.some(exp => exp.company || exp.position)}
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-purple-800 mb-3 border-b border-purple-200 pb-1">Experience</h2>
        {#each resumeData.experience as exp}
          {#if exp.company || exp.position}
            <div class="mb-4 relative pl-6">
              <div class="absolute left-0 top-2 w-3 h-3 rounded-full bg-purple-400"></div>
              <div class="flex flex-wrap justify-between">
                <h3 class="font-semibold text-purple-700">{exp.position || 'Position'}</h3>
                <span class="text-sm text-purple-600">
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

    {#if resumeData.education.some(edu => edu.institution || edu.degree)}
      <div>
        <h2 class="text-xl font-semibold text-purple-800 mb-3 border-b border-purple-200 pb-1">Education</h2>
        {#each resumeData.education as edu}
          {#if edu.institution || edu.degree}
            <div class="mb-4 relative pl-6">
              <div class="absolute left-0 top-2 w-3 h-3 rounded-full bg-purple-400"></div>
              <div class="flex flex-wrap justify-between">
                <h3 class="font-semibold text-purple-700">{edu.degree || 'Degree'}{edu.field ? ` in ${edu.field}` : ''}</h3>
                <span class="text-sm text-purple-600">
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
  </div>
</div>
