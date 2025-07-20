<script lang="ts">
  import type { ResumeData } from '$lib/types';
  import ClassicResume from './ClassicResume.svelte';
  import CascadeResume from './CascadeResume.svelte';


  export let resumeData: ResumeData;
  export let templateId: string = 'professional';
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <h2 class="text-xl font-semibold">Preview</h2>
    <p class="text-sm text-gray-500">Template: {templateId}</p>
  </div>
  
  <div class="p-6 overflow-auto max-h-[800px]">
    <!-- Resume Preview -->
    <div id="resume-preview" class="border p-8">
      <!-- Professional Template -->
      {#if templateId === 'professional'}
        <div class="mb-6 border-b pb-6">
          <h1 class="text-3xl font-bold text-blue-800">{resumeData.personal.name || 'Your Name'}</h1>
          <p class="text-xl text-gray-600 mt-1">{resumeData.personal.title || 'Professional Title'}</p>
          
          <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
            {#if resumeData.personal.email}
              <div class="flex items-center">
                <span class="mr-1">📧</span> {resumeData.personal.email}
              </div>
            {/if}
            {#if resumeData.personal.phone}
              <div class="flex items-center">
                <span class="mr-1">📱</span> {resumeData.personal.phone}
              </div>
            {/if}
            {#if resumeData.personal.location}
              <div class="flex items-center">
                <span class="mr-1">📍</span> {resumeData.personal.location}
              </div>
            {/if}
            {#if resumeData.personal.website}
              <div class="flex items-center">
                <span class="mr-1">🌐</span> {resumeData.personal.website}
              </div>
            {/if}
          </div>
          
          {#if resumeData.personal.summary}
            <div class="mt-4">
              <p class="text-gray-700">{resumeData.personal.summary}</p>
            </div>
          {/if}
        </div>
        
        {#if resumeData.experience.some(exp => exp.company || exp.position)}
          <div class="mb-6">
            <h2 class="text-xl font-bold text-blue-800 mb-3">Experience</h2>
            {#each resumeData.experience as exp}
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
                    <p class="mt-1 text-sm text-gray-600">{exp.description}</p>
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
        {/if}
        
        {#if resumeData.education.some(edu => edu.institution || edu.degree)}
          <div class="mb-6">
            <h2 class="text-xl font-bold text-blue-800 mb-3">Education</h2>
            {#each resumeData.education as edu}
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
                    <p class="mt-1 text-sm text-gray-600">{edu.description}</p>
                  {/if}
                </div>
              {/if}
            {/each}
          </div>
        {/if}
        
        {#if resumeData.skills.some(skill => skill.name)}
          <div>
            <h2 class="text-xl font-bold text-blue-800 mb-3">Skills</h2>
            <div class="flex flex-wrap gap-2">
              {#each resumeData.skills as skill}
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
      
      <!-- Creative Template -->
      {:else if templateId === 'creative'}
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
                <p class="text-gray-700">{resumeData.personal.summary}</p>
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
                        <p class="mt-1 text-sm text-gray-600">{exp.description}</p>
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
                        <p class="mt-1 text-sm text-gray-600">{edu.description}</p>
                      {/if}
                    </div>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
        </div>
      
      <!-- Minimal Template -->
      {:else if templateId === 'minimal'}
        <div class="max-w-2xl mx-auto">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold">{resumeData.personal.name || 'Your Name'}</h1>
            <p class="text-lg text-gray-700 mt-1">{resumeData.personal.title || 'Professional Title'}</p>
            
            <div class="mt-3 flex justify-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
              {#if resumeData.personal.email}
                <span>{resumeData.personal.email}</span> 
              {/if}
              {#if resumeData.personal.phone}
                <span>• {resumeData.personal.phone}</span>
              {/if}
              {#if resumeData.personal.location}
                <span>• {resumeData.personal.location}</span>
              {/if}
              {#if resumeData.personal.website}
                <span>• {resumeData.personal.website}</span>
              {/if}
            </div>
          </div>
          
          {#if resumeData.personal.summary}
            <div class="mb-6">
              <p class="text-gray-700">{resumeData.personal.summary}</p>
            </div>
          {/if}
          
          <hr class="my-6">
          
          {#if resumeData.experience.some(exp => exp.company || exp.position)}
            <div class="mb-6">
              <h2 class="text-xl font-bold mb-4 uppercase tracking-wider">Experience</h2>
              {#each resumeData.experience as exp}
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
                      <p class="mt-2 text-sm text-gray-600">{exp.description}</p>
                    {/if}
                  </div>
                {/if}
              {/each}
            </div>
          {/if}
          
          <hr class="my-6">
          
          {#if resumeData.education.some(edu => edu.institution || edu.degree)}
            <div class="mb-6">
              <h2 class="text-xl font-bold mb-4 uppercase tracking-wider">Education</h2>
              {#each resumeData.education as edu}
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
                      <p class="mt-2 text-sm text-gray-600">{edu.description}</p>
                    {/if}
                  </div>
                {/if}
              {/each}
            </div>
          {/if}
          
          <hr class="my-6">
          
          {#if resumeData.skills.some(skill => skill.name)}
            <div>
              <h2 class="text-xl font-bold mb-4 uppercase tracking-wider">Skills</h2>
              <div class="flex flex-wrap gap-2">
                {#each resumeData.skills as skill}
                  {#if skill.name}
                    <span class="bg-gray-100 px-3 py-1 rounded">{skill.name}</span>
                  {/if}
                {/each}
              </div>
            </div>
          {/if}
        </div>
      
      <!-- Executive Template -->
      {:else if templateId === 'executive'}
        <div class="border-t-8 border-gray-800">
          <div class="py-6 border-b border-gray-300">
            <h1 class="text-4xl font-bold text-gray-800">{resumeData.personal.name || 'Your Name'}</h1>
            <p class="text-xl text-gray-700 mt-2">{resumeData.personal.title || 'Professional Title'}</p>
          </div>
          
          <div class="grid grid-cols-3 gap-6 mt-6">
            <!-- Left Column -->
            <div class="col-span-3 md:col-span-1">
              <div class="mb-6">
                <h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Contact Information</h2>
                <div class="space-y-2 text-sm">
                  {#if resumeData.personal.email}
                    <div>
                      <span class="font-medium">Email:</span> {resumeData.personal.email}
                    </div>
                  {/if}
                  {#if resumeData.personal.phone}
                    <div>
                      <span class="font-medium">Phone:</span> {resumeData.personal.phone}
                    </div>
                  {/if}
                  {#if resumeData.personal.location}
                    <div>
                      <span class="font-medium">Location:</span> {resumeData.personal.location}
                    </div>
                  {/if}
                  {#if resumeData.personal.website}
                    <div>
                      <span class="font-medium">Website:</span> {resumeData.personal.website}
                    </div>
                  {/if}
                </div>
              </div>
              
              {#if resumeData.skills.some(skill => skill.name)}
                <div>
                  <h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Core Competencies</h2>
                  <ul class="list-disc pl-5 space-y-1">
                    {#each resumeData.skills as skill}
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
              {#if resumeData.personal.summary}
                <div class="mb-6">
                  <h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Professional Summary</h2>
                  <p class="text-gray-700">{resumeData.personal.summary}</p>
                </div>
              {/if}
              
              {#if resumeData.experience.some(exp => exp.company || exp.position)}
                <div class="mb-6">
                  <h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Professional Experience</h2>
                  {#each resumeData.experience as exp}
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
                          <p class="mt-2 text-sm text-gray-700">{exp.description}</p>
                        {/if}
                      </div>
                    {/if}
                  {/each}
                </div>
              {/if}
              
              {#if resumeData.education.some(edu => edu.institution || edu.degree)}
                <div>
                  <h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3">Education</h2>
                  {#each resumeData.education as edu}
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
                          <p class="mt-1 text-sm text-gray-600">{edu.description}</p>
                        {/if}
                      </div>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </div>
      {:else if templateId === 'classic'}
        <ClassicResume resume={resumeData} />
      {:else if templateId === 'casecade'}
        <CascadeResume resume={resumeData} />
      {/if}
    </div>
  </div>
</div>