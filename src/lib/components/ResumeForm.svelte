<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import type { ResumeData } from '$lib/types';
  import Quill from 'quill';
  import 'quill/dist/quill.snow.css';

  export let resumeData: ResumeData;

  const dispatch = createEventDispatcher();
  let activeSection = 'personal';

  function quillAction(node: HTMLElement, options: { placeholder: string, callback: (html: string) => void }) {
    const quill = new Quill(node, {
      ...options,
      theme: 'snow'
    });
    quill.on('text-change', () => {
      const html = node.querySelector('.ql-editor')?.innerHTML;
      if (html) {
        options.callback(html);
      }
    });

    return {
      destroy() {
        quill.off('text-change', options.callback);
      }
    }
  }

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

  function saveResume() {
    dispatch('save');
  }
  
  function exportToPdf() {
    dispatch('export');
  }
</script>

<div class="bg-white rounded-lg shadow p-6">
  <div class="mb-6">
    <div class="flex space-x-4 mb-4 overflow-x-auto pb-2">
      <button 
        class={`px-4 py-2 rounded ${activeSection === 'personal' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        on:click={() => activeSection = 'personal'}>
        Personal Info
      </button>
      <button 
        class={`px-4 py-2 rounded ${activeSection === 'experience' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        on:click={() => activeSection = 'experience'}>
        Experience
      </button>
      <button 
        class={`px-4 py-2 rounded ${activeSection === 'education' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        on:click={() => activeSection = 'education'}>
        Education
      </button>
      <button 
        class={`px-4 py-2 rounded ${activeSection === 'skills' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        on:click={() => activeSection = 'skills'}>
        Skills
      </button>
    </div>

    <!-- Personal Information Form -->
    {#if activeSection === 'personal'}
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="fullName" class="block mb-1 font-medium">Full Name</label>
            <input
              id="fullName"
              type="text"
              bind:value={resumeData.personal.name}
              on:input={handleChange}
              class="w-full border rounded px-3 py-2"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label for="title" class="block mb-1 font-medium">Professional Title</label>
            <input
              id="title"
              type="text"
              bind:value={resumeData.personal.title}
              on:input={handleChange}
              class="w-full border rounded px-3 py-2"
              placeholder="Software Developer"
            />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="email" class="block mb-1 font-medium">Email</label>
            <input
              id="email"
              type="email"
              bind:value={resumeData.personal.email}
              on:input={handleChange}
              class="w-full border rounded px-3 py-2"
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <label for="phone" class="block mb-1 font-medium">Phone</label>
            <input
              id="phone"
              type="tel"
              bind:value={resumeData.personal.phone}
              on:input={handleChange}
              class="w-full border rounded px-3 py-2"
              placeholder="+1 (123) 456-7890"
            />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="location" class="block mb-1 font-medium">Location</label>
            <input
              id="location"
              type="text"
              bind:value={resumeData.personal.location}
              on:input={handleChange}
              class="w-full border rounded px-3 py-2"
              placeholder="New York, NY"
            />
          </div>
          <div>
            <label for="website" class="block mb-1 font-medium">Website/Portfolio</label>
            <input
              id="website"
              type="url"
              bind:value={resumeData.personal.website}
              on:input={handleChange}
              class="w-full border rounded px-3 py-2"
              placeholder="https://johndoe.com"
            />
          </div>
        </div>
        
        <div>
          <label for="summary" class="block mb-1 font-medium">Professional Summary</label>
          <div id="summary" use:quillAction={{
            placeholder: 'Experienced software developer with 5+ years specializing in web applications...',
            callback: (html) => resumeData.personal.summary = html
          }}></div>
        </div>
      </div>
    {/if}

    <!-- Experience Form -->
    {#if activeSection === 'experience'}
      <div class="space-y-6">
        {#each resumeData.experience as exp, i}
          <div class="border rounded p-4">
            <div class="flex justify-between mb-2">
              <h3 class="text-lg font-medium">Experience {i + 1}</h3>
              {#if resumeData.experience.length > 1}
                <button
                  on:click={() => removeExperience(i)}
                  class="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              {/if}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label for="company-{i}" class="block mb-1 font-medium">Company</label>
                <input
                  id="company-{i}"
                  type="text"
                  bind:value={exp.company}
                  on:input={handleChange}
                  class="w-full border rounded px-3 py-2"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label for="position-{i}" class="block mb-1 font-medium">Position</label>
                <input
                  id="position-{i}"
                  type="text"
                  bind:value={exp.position}
                  on:input={handleChange}
                  class="w-full border rounded px-3 py-2"
                  placeholder="Job Title"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div>
                <label for="exp-startDate-{i}" class="block mb-1 font-medium">Start Date</label>
                <input
                  id="exp-startDate-{i}"
                  type="text"
                  bind:value={exp.startDate}
                  on:input={handleChange}
                  class="w-full border rounded px-3 py-2"
                  placeholder="Jan 2020"
                />
              </div>
              <div>
                <label for="exp-endDate-{i}" class="block mb-1 font-medium">End Date</label>
                <input
                  id="exp-endDate-{i}"
                  type="text"
                  bind:value={exp.endDate}
                  on:input={handleChange}
                  class="w-full border rounded px-3 py-2"
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
                    class="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span class="ml-2">Current Position</span>
                </label>
              </div>
            </div>
            
            <div>
              <label for="exp-description-{i}" class="block mb-1 font-medium">Description</label>
              <div id="exp-description-{i}" use:quillAction={{
                placeholder: 'Describe your responsibilities and achievements...',
                callback: (html) => exp.description = html
              }}></div>
            </div>
          </div>
        {/each}
        
        <button
          on:click={addExperience}
          class="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded"
        >
          + Add Experience
        </button>
      </div>
    {/if}

    <!-- Education Form -->
    {#if activeSection === 'education'}
      <div class="space-y-6">
        {#each resumeData.education as edu, i}
          <div class="border rounded p-4">
            <div class="flex justify-between mb-2">
              <h3 class="text-lg font-medium">Education {i + 1}</h3>
              {#if resumeData.education.length > 1}
                <button
                  on:click={() => removeEducation(i)}
                  class="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              {/if}
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label for="institution-{i}" class="block mb-1 font-medium">Institution</label>
                <input
                  id="institution-{i}"
                  type="text"
                  bind:value={edu.institution}
                  on:input={handleChange}
                  class="w-full border rounded px-3 py-2"
                  placeholder="University Name"
                />
              </div>
              <div>
                <label for="degree-{i}" class="block mb-1 font-medium">Degree</label>
                <input
                  id="degree-{i}"
                  type="text"
                  bind:value={edu.degree}
                  on:input={handleChange}
                  class="w-full border rounded px-3 py-2"
                  placeholder="Bachelor of Science"
                />
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div>
                <label for="edu-field-{i}" class="block mb-1 font-medium">Field of Study</label>
                <input
                  id="edu-field-{i}"
                  type="text"
                  bind:value={edu.field}
                  on:input={handleChange}
                  class="w-full border rounded px-3 py-2"
                  placeholder="Computer Science"
                />
              </div>
              <div>
                <label for="edu-startDate-{i}" class="block mb-1 font-medium">Start Date</label>
                <input
                  id="edu-startDate-{i}"
                  type="text"
                  bind:value={edu.startDate}
                  on:input={handleChange}
                  class="w-full border rounded px-3 py-2"
                  placeholder="Sep 2016"
                />
              </div>
              <div>
                <label for="edu-endDate-{i}" class="block mb-1 font-medium">End Date</label>
                <input
                  id="edu-endDate-{i}"
                  type="text"
                  bind:value={edu.endDate}
                  on:input={handleChange}
                  class="w-full border rounded px-3 py-2"
                  placeholder="Jun 2020"
                />
              </div>
            </div>
            
            <div>
              <label for="edu-description-{i}" class="block mb-1 font-medium">Description</label>
              <div id="edu-description-{i}" use:quillAction={{
                placeholder: 'Additional information about your education...',
                callback: (html) => edu.description = html
              }}></div>
            </div>
          </div>
        {/each}
        
        <button
          on:click={addEducation}
          class="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded"
        >
          + Add Education
        </button>
      </div>
    {/if}

    <!-- Skills Form -->
    {#if activeSection === 'skills'}
      <div class="space-y-6">
        {#each resumeData.skills as skill, i}
          <div class="border rounded p-4">
            <div class="flex justify-between mb-2">
              <h3 class="text-lg font-medium">Skill {i + 1}</h3>
              {#if resumeData.skills.length > 1}
                <button
                  on:click={() => removeSkill(i)}
                  class="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              {/if}
            </div>
            
            <div class="mb-3">
              <label for="skill-name-{i}" class="block mb-1 font-medium">Skill Name</label>
              <input
                id="skill-name-{i}"
                type="text"
                bind:value={skill.name}
                on:input={handleChange}
                class="w-full border rounded px-3 py-2"
                placeholder="JavaScript"
              />
            </div>
            
            <div>
              <label for="skill-level-{i}" class="block mb-1 font-medium">Proficiency (1-10)</label>
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
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Expert</span>
              </div>
            </div>
          </div>
        {/each}
        
        <button
          on:click={addSkill}
          class="w-full bg-gray-200 hover:bg-gray-300 py-2 rounded"
        >
          + Add Skill
        </button>
      </div>
    {/if}
  </div>
  
  <div class="flex justify-between mt-6">
    <button 
      on:click={saveResume}
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Save Resume
    </button>
    <button 
      on:click={exportToPdf}
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Export to PDF
    </button>
  </div>
</div>