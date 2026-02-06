<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ResumeData } from '$lib/types';
  import TiptapEditor from './TiptapEditor.svelte';
  import AICompareForm from './AICompareForm.svelte';

  export let resumeData: ResumeData;

  const dispatch = createEventDispatcher();
  let activeSection = 'personal';

  // Functions to manage resume sections
  function addExperience() {
    resumeData.experience.push({ company: '', position: '', startDate: '', endDate: '', description: '', current: false });
    resumeData = { ...resumeData };
    dispatch('update', resumeData);
  }

  function removeExperience(index: number) {
    resumeData.experience.splice(index, 1);
    resumeData = { ...resumeData };
    dispatch('update', resumeData);
  }

  function addEducation() {
    resumeData.education.push({ institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' });
    resumeData = { ...resumeData };
    dispatch('update', resumeData);
  }

  function removeEducation(index: number) {
    resumeData.education.splice(index, 1);
    resumeData = { ...resumeData };
    dispatch('update', resumeData);
  }

  function addSkill() {
    resumeData.skills.push({ name: '', level: 5 });
    resumeData = { ...resumeData };
    dispatch('update', resumeData);
  }

  function removeSkill(index: number) {
    resumeData.skills.splice(index, 1);
    resumeData = { ...resumeData };
    dispatch('update', resumeData);
  }
  
  function handleChange() {
    dispatch('update', resumeData);
  }

  function escapeHtml(value: string) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function textToHtml(value: string) {
    const escaped = escapeHtml(value.trim());
    const paragraphs = escaped.split(/\n{2,}/).map(p => p.replace(/\n/g, '<br />'));
    return `<p>${paragraphs.join('</p><p>')}</p>`;
  }

  function saveResume() {
    dispatch('save');
  }
  
  function exportToPdf() {
    dispatch('export');
  }
</script>

<div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
  <div class="mb-6">
    <div class="flex space-x-3 mb-6 overflow-x-auto pb-2">
      <button 
        class={`px-4 py-2 rounded-full text-sm font-semibold ${activeSection === 'personal' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        on:click={() => activeSection = 'personal'}>
        Personal Info
      </button>
      <button 
        class={`px-4 py-2 rounded-full text-sm font-semibold ${activeSection === 'experience' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        on:click={() => activeSection = 'experience'}>
        Experience
      </button>
      <button 
        class={`px-4 py-2 rounded-full text-sm font-semibold ${activeSection === 'education' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        on:click={() => activeSection = 'education'}>
        Education
      </button>
      <button 
        class={`px-4 py-2 rounded-full text-sm font-semibold ${activeSection === 'skills' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        on:click={() => activeSection = 'skills'}>
        Skills
      </button>
    </div>

    <!-- Personal Information Form -->
    {#if activeSection === 'personal'}
      <div class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="fullName" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
            <input
              id="fullName"
              type="text"
              bind:value={resumeData.personal.name}
              on:input={handleChange}
              class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label for="title" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Professional Title</label>
            <input
              id="title"
              type="text"
              bind:value={resumeData.personal.title}
              on:input={handleChange}
              class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50"
              placeholder="Software Developer"
            />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="email" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
            <input
              id="email"
              type="email"
              bind:value={resumeData.personal.email}
              on:input={handleChange}
              class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50"
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <label for="phone" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
            <input
              id="phone"
              type="tel"
              bind:value={resumeData.personal.phone}
              on:input={handleChange}
              class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50"
              placeholder="+1 (123) 456-7890"
            />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="location" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</label>
            <input
              id="location"
              type="text"
              bind:value={resumeData.personal.location}
              on:input={handleChange}
              class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50"
              placeholder="New York, NY"
            />
          </div>
          <div>
            <label for="website" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Website/Portfolio</label>
            <input
              id="website"
              type="url"
              bind:value={resumeData.personal.website}
              on:input={handleChange}
              class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50"
              placeholder="https://johndoe.com"
            />
          </div>
        </div>
        
        <div>
          <label for="summary" class="block mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Professional Summary</label>
          <TiptapEditor bind:value={resumeData.personal.summary} on:change={handleChange} />
          <AICompareForm
            label="AI Compare Summary"
            applyLabel="Use AI Summary"
            target="summary"
            currentHtml={resumeData.personal.summary}
            on:apply={(event) => {
              resumeData.personal.summary = textToHtml(event.detail);
              handleChange();
            }}
          />
        </div>
      </div>
    {/if}

    <!-- Experience Form -->
    {#if activeSection === 'experience'}
      <div class="space-y-6">
        {#each resumeData.experience as exp, i}
          <div class="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div class="flex justify-between mb-3">
              <h3 class="text-base font-semibold">Experience {i + 1}</h3>
              {#if resumeData.experience.length > 1}
                <button
                  on:click={() => removeExperience(i)}
                  class="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              {/if}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label for="company-{i}" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</label>
                <input
                  id="company-{i}"
                  type="text"
                  bind:value={exp.company}
                  on:input={handleChange}
                  class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label for="position-{i}" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Position</label>
                <input
                  id="position-{i}"
                  type="text"
                  bind:value={exp.position}
                  on:input={handleChange}
                  class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="Job Title"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div>
                <label for="exp-startDate-{i}" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Date</label>
                <input
                  id="exp-startDate-{i}"
                  type="text"
                  bind:value={exp.startDate}
                  on:input={handleChange}
                  class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="Jan 2020"
                />
              </div>
              <div>
                <label for="exp-endDate-{i}" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">End Date</label>
                <input
                  id="exp-endDate-{i}"
                  type="text"
                  bind:value={exp.endDate}
                  on:input={handleChange}
                  class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="Present"
                  disabled={exp.current}
                />
              </div>
              <div class="flex items-end">
                <label class="inline-flex items-center">
                  <input
                    type="checkbox"
                    bind:checked={exp.current}
                    on:change={handleChange}
                    class="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span class="ml-2 text-sm text-slate-600">Current Position</span>
                </label>
              </div>
            </div>
            
            <div>
              <label for="exp-description-{i}" class="block mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
              <TiptapEditor bind:value={exp.description} on:change={handleChange} />
              <AICompareForm
                label="AI Compare Experience"
                applyLabel="Use AI Description"
                target="experience"
                currentHtml={resumeData.experience[i].description}
                on:apply={(event) => {
                  resumeData.experience[i].description = textToHtml(event.detail);
                  handleChange();
                }}
              />
            </div>
          </div>
        {/each}
        
        <button
          on:click={addExperience}
          class="w-full border border-dashed border-slate-300 text-slate-500 py-2 rounded-lg hover:bg-slate-50"
        >
          + Add Experience
        </button>
      </div>
    {/if}

    <!-- Education Form -->
    {#if activeSection === 'education'}
      <div class="space-y-6">
        {#each resumeData.education as edu, i}
          <div class="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div class="flex justify-between mb-3">
              <h3 class="text-base font-semibold">Education {i + 1}</h3>
              {#if resumeData.education.length > 1}
                <button
                  on:click={() => removeEducation(i)}
                  class="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              {/if}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label for="institution-{i}" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Institution</label>
                <input
                  id="institution-{i}"
                  type="text"
                  bind:value={edu.institution}
                  on:input={handleChange}
                  class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="University Name"
                />
              </div>
              <div>
                <label for="degree-{i}" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Degree</label>
                <input
                  id="degree-{i}"
                  type="text"
                  bind:value={edu.degree}
                  on:input={handleChange}
                  class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="Bachelor of Science"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div>
                <label for="edu-field-{i}" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Field of Study</label>
                <input
                  id="edu-field-{i}"
                  type="text"
                  bind:value={edu.field}
                  on:input={handleChange}
                  class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <label for="edu-startDate-{i}" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Date</label>
                <input
                  id="edu-startDate-{i}"
                  type="text"
                  bind:value={edu.startDate}
                  on:input={handleChange}
                  class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="Sep 2016"
                />
              </div>
              <div>
                <label for="edu-endDate-{i}" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">End Date</label>
                <input
                  id="edu-endDate-{i}"
                  type="text"
                  bind:value={edu.endDate}
                  on:input={handleChange}
                  class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                  placeholder="Jun 2020"
                />
              </div>
            </div>
            
            <div>
              <label for="edu-description-{i}" class="block mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
              <TiptapEditor bind:value={edu.description} on:change={handleChange} />
            </div>
          </div>
        {/each}
        
        <button
          on:click={addEducation}
          class="w-full border border-dashed border-slate-300 text-slate-500 py-2 rounded-lg hover:bg-slate-50"
        >
          + Add Education
        </button>
      </div>
    {/if}

    <!-- Skills Form -->
    {#if activeSection === 'skills'}
      <div class="space-y-6">
        {#each resumeData.skills as skill, i}
          <div class="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <div class="flex justify-between mb-3">
              <h3 class="text-base font-semibold">Skill {i + 1}</h3>
              {#if resumeData.skills.length > 1}
                <button
                  on:click={() => removeSkill(i)}
                  class="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              {/if}
            </div>
            
            <div class="mb-3">
              <label for="skill-name-{i}" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Skill Name</label>
              <input
                id="skill-name-{i}"
                type="text"
                bind:value={skill.name}
                on:input={handleChange}
                class="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white"
                placeholder="JavaScript"
              />
            </div>
            
            <div>
              <label for="skill-level-{i}" class="block mb-1 text-xs font-semibold text-slate-500 uppercase tracking-wider">Proficiency (1-10)</label>
              <input
                id="skill-level-{i}"
                type="range"
                bind:value={skill.level}
                on:input={handleChange}
                min="1"
                max="10"
                class="w-full"
              />
              <div class="flex justify-between text-sm">
                <span class="text-slate-500">Beginner</span>
                <span class="text-slate-500">Intermediate</span>
                <span class="text-slate-500">Expert</span>
              </div>
            </div>
          </div>
        {/each}
        
        <button
          on:click={addSkill}
          class="w-full border border-dashed border-slate-300 text-slate-500 py-2 rounded-lg hover:bg-slate-50"
        >
          + Add Skill
        </button>
      </div>
    {/if}
  </div>
</div>
