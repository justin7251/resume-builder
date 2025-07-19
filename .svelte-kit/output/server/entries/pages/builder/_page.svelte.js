import { c as create_ssr_component, b as createEventDispatcher, d as add_attribute, e as escape, f as each, a as subscribe, v as validate_component } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { w as writable } from "../../../chunks/index.js";
import "jspdf";
import "html2canvas";
const ResumeForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { resumeData } = $$props;
  createEventDispatcher();
  if ($$props.resumeData === void 0 && $$bindings.resumeData && resumeData !== void 0) $$bindings.resumeData(resumeData);
  return `<div class="bg-white rounded-lg shadow p-6"><div class="mb-6"><div class="flex space-x-4 mb-4 overflow-x-auto pb-2"><button${add_attribute(
    "class",
    `px-4 py-2 rounded ${"bg-blue-600 text-white"}`,
    0
  )}>Personal Info</button> <button${add_attribute(
    "class",
    `px-4 py-2 rounded ${"bg-gray-200"}`,
    0
  )}>Experience</button> <button${add_attribute(
    "class",
    `px-4 py-2 rounded ${"bg-gray-200"}`,
    0
  )}>Education</button> <button${add_attribute(
    "class",
    `px-4 py-2 rounded ${"bg-gray-200"}`,
    0
  )}>Skills</button></div>  ${`<div class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block mb-1 font-medium" data-svelte-h="svelte-1xkezz4">Full Name</label> <input type="text" class="w-full border rounded px-3 py-2" placeholder="John Doe"${add_attribute("value", resumeData.personal.name, 0)}></div> <div><label class="block mb-1 font-medium" data-svelte-h="svelte-7jffdh">Professional Title</label> <input type="text" class="w-full border rounded px-3 py-2" placeholder="Software Developer"${add_attribute("value", resumeData.personal.title, 0)}></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block mb-1 font-medium" data-svelte-h="svelte-2hb0ks">Email</label> <input type="email" class="w-full border rounded px-3 py-2" placeholder="john.doe@example.com"${add_attribute("value", resumeData.personal.email, 0)}></div> <div><label class="block mb-1 font-medium" data-svelte-h="svelte-14fl0e0">Phone</label> <input type="tel" class="w-full border rounded px-3 py-2" placeholder="+1 (123) 456-7890"${add_attribute("value", resumeData.personal.phone, 0)}></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block mb-1 font-medium" data-svelte-h="svelte-1lb6y97">Location</label> <input type="text" class="w-full border rounded px-3 py-2" placeholder="New York, NY"${add_attribute("value", resumeData.personal.location, 0)}></div> <div><label class="block mb-1 font-medium" data-svelte-h="svelte-xuijs2">Website/Portfolio</label> <input type="url" class="w-full border rounded px-3 py-2" placeholder="https://johndoe.com"${add_attribute("value", resumeData.personal.website, 0)}></div></div> <div><label class="block mb-1 font-medium" data-svelte-h="svelte-ba1q13">Professional Summary</label> <textarea rows="4" class="w-full border rounded px-3 py-2" placeholder="Experienced software developer with 5+ years specializing in web applications...">${escape(resumeData.personal.summary || "")}</textarea></div></div>`}  ${``}  ${``}  ${``}</div> <div class="flex justify-between mt-6"><button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" data-svelte-h="svelte-cp9i2l">Save Resume</button> <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" data-svelte-h="svelte-1ju05ld">Export to PDF</button></div></div>`;
});
const ResumePreview = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { resumeData } = $$props;
  let { templateId = "professional" } = $$props;
  if ($$props.resumeData === void 0 && $$bindings.resumeData && resumeData !== void 0) $$bindings.resumeData(resumeData);
  if ($$props.templateId === void 0 && $$bindings.templateId && templateId !== void 0) $$bindings.templateId(templateId);
  return `<div class="bg-white rounded-lg shadow"><div class="p-4 border-b"><h2 class="text-xl font-semibold" data-svelte-h="svelte-imhwuq">Preview</h2> <p class="text-sm text-gray-500">Template: ${escape(templateId)}</p></div> <div class="p-6 overflow-auto max-h-[800px]"> <div id="resume-preview" class="bg-white shadow-inner border p-8"> ${templateId === "professional" ? `<div class="mb-6 border-b pb-6"><h1 class="text-3xl font-bold text-blue-800">${escape(resumeData.personal.name || "Your Name")}</h1> <p class="text-xl text-gray-600 mt-1">${escape(resumeData.personal.title || "Professional Title")}</p> <div class="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">${resumeData.personal.email ? `<div class="flex items-center"><span class="mr-1" data-svelte-h="svelte-1mhu0by">📧</span> ${escape(resumeData.personal.email)}</div>` : ``} ${resumeData.personal.phone ? `<div class="flex items-center"><span class="mr-1" data-svelte-h="svelte-17fs7l8">📱</span> ${escape(resumeData.personal.phone)}</div>` : ``} ${resumeData.personal.location ? `<div class="flex items-center"><span class="mr-1" data-svelte-h="svelte-esg300">📍</span> ${escape(resumeData.personal.location)}</div>` : ``} ${resumeData.personal.website ? `<div class="flex items-center"><span class="mr-1" data-svelte-h="svelte-qk73em">🌐</span> ${escape(resumeData.personal.website)}</div>` : ``}</div> ${resumeData.personal.summary ? `<div class="mt-4"><p class="text-gray-700">${escape(resumeData.personal.summary)}</p></div>` : ``}</div> ${resumeData.experience.some((exp) => exp.company || exp.position) ? `<div class="mb-6"><h2 class="text-xl font-bold text-blue-800 mb-3" data-svelte-h="svelte-6usxam">Experience</h2> ${each(resumeData.experience, (exp) => {
    return `${exp.company || exp.position ? `<div class="mb-4"><div class="flex justify-between"><h3 class="font-semibold">${escape(exp.position || "Position")}</h3> <span class="text-sm text-gray-600">${escape(exp.startDate || "Start Date")} - ${escape(exp.current ? "Present" : exp.endDate || "End Date")} </span></div> <p class="text-gray-700">${escape(exp.company || "Company")}</p> ${exp.description ? `<p class="mt-1 text-sm text-gray-600">${escape(exp.description)}</p>` : ``} </div>` : ``}`;
  })}</div>` : ``} ${resumeData.education.some((edu) => edu.institution || edu.degree) ? `<div class="mb-6"><h2 class="text-xl font-bold text-blue-800 mb-3" data-svelte-h="svelte-p1k0w4">Education</h2> ${each(resumeData.education, (edu) => {
    return `${edu.institution || edu.degree ? `<div class="mb-4"><div class="flex justify-between"><h3 class="font-semibold">${escape(edu.degree || "Degree")}${escape(edu.field ? ` in ${edu.field}` : "")}</h3> <span class="text-sm text-gray-600">${escape(edu.startDate || "Start Date")} - ${escape(edu.endDate || "End Date")} </span></div> <p class="text-gray-700">${escape(edu.institution || "Institution")}</p> ${edu.description ? `<p class="mt-1 text-sm text-gray-600">${escape(edu.description)}</p>` : ``} </div>` : ``}`;
  })}</div>` : ``} ${resumeData.skills.some((skill) => skill.name) ? `<div><h2 class="text-xl font-bold text-blue-800 mb-3" data-svelte-h="svelte-1x6ua9s">Skills</h2> <div class="flex flex-wrap gap-2">${each(resumeData.skills, (skill) => {
    return `${skill.name ? `<div class="bg-blue-50 border border-blue-200 rounded px-3 py-1"><span class="font-medium">${escape(skill.name)}</span> <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1"><div class="bg-blue-600 h-1.5 rounded-full" style="${"width: " + escape(skill.level * 10, true) + "%"}"></div></div> </div>` : ``}`;
  })}</div></div>` : ``} ` : `${templateId === "creative" ? `<div class="flex flex-col md:flex-row gap-6"> <div class="md:w-1/3 bg-purple-100 p-6 rounded-lg"><div class="mb-6 text-center"><h1 class="text-2xl font-bold text-purple-800">${escape(resumeData.personal.name || "Your Name")}</h1> <p class="text-lg text-purple-600 mt-1">${escape(resumeData.personal.title || "Professional Title")}</p></div> <div class="mb-6"><h2 class="text-lg font-semibold text-purple-700 mb-2 border-b border-purple-300 pb-1" data-svelte-h="svelte-1atgevd">Contact</h2> <div class="space-y-2 text-sm">${resumeData.personal.email ? `<div class="flex items-center"><span class="mr-2 text-purple-500" data-svelte-h="svelte-1x15cb7">📧</span> ${escape(resumeData.personal.email)}</div>` : ``} ${resumeData.personal.phone ? `<div class="flex items-center"><span class="mr-2 text-purple-500" data-svelte-h="svelte-16o13jd">📱</span> ${escape(resumeData.personal.phone)}</div>` : ``} ${resumeData.personal.location ? `<div class="flex items-center"><span class="mr-2 text-purple-500" data-svelte-h="svelte-1ag5elx">📍</span> ${escape(resumeData.personal.location)}</div>` : ``} ${resumeData.personal.website ? `<div class="flex items-center"><span class="mr-2 text-purple-500" data-svelte-h="svelte-1oaah2b">🌐</span> ${escape(resumeData.personal.website)}</div>` : ``}</div></div> ${resumeData.skills.some((skill) => skill.name) ? `<div><h2 class="text-lg font-semibold text-purple-700 mb-2 border-b border-purple-300 pb-1" data-svelte-h="svelte-1gqozfn">Skills</h2> <div class="space-y-2">${each(resumeData.skills, (skill) => {
    return `${skill.name ? `<div><div class="flex justify-between text-sm"><span>${escape(skill.name)}</span> <span>${escape(skill.level)}/10</span></div> <div class="w-full bg-purple-200 rounded-full h-2 mt-1"><div class="bg-purple-600 h-2 rounded-full" style="${"width: " + escape(skill.level * 10, true) + "%"}"></div></div> </div>` : ``}`;
  })}</div></div>` : ``}</div>  <div class="md:w-2/3">${resumeData.personal.summary ? `<div class="mb-6"><h2 class="text-xl font-semibold text-purple-800 mb-2 border-b border-purple-200 pb-1" data-svelte-h="svelte-1ddujsx">About Me</h2> <p class="text-gray-700">${escape(resumeData.personal.summary)}</p></div>` : ``} ${resumeData.experience.some((exp) => exp.company || exp.position) ? `<div class="mb-6"><h2 class="text-xl font-semibold text-purple-800 mb-3 border-b border-purple-200 pb-1" data-svelte-h="svelte-6ck6tj">Experience</h2> ${each(resumeData.experience, (exp) => {
    return `${exp.company || exp.position ? `<div class="mb-4 relative pl-6"><div class="absolute left-0 top-2 w-3 h-3 rounded-full bg-purple-400"></div> <div class="flex flex-wrap justify-between"><h3 class="font-semibold text-purple-700">${escape(exp.position || "Position")}</h3> <span class="text-sm text-purple-600">${escape(exp.startDate || "Start Date")} - ${escape(exp.current ? "Present" : exp.endDate || "End Date")} </span></div> <p class="text-gray-700">${escape(exp.company || "Company")}</p> ${exp.description ? `<p class="mt-1 text-sm text-gray-600">${escape(exp.description)}</p>` : ``} </div>` : ``}`;
  })}</div>` : ``} ${resumeData.education.some((edu) => edu.institution || edu.degree) ? `<div><h2 class="text-xl font-semibold text-purple-800 mb-3 border-b border-purple-200 pb-1" data-svelte-h="svelte-6iuo9t">Education</h2> ${each(resumeData.education, (edu) => {
    return `${edu.institution || edu.degree ? `<div class="mb-4 relative pl-6"><div class="absolute left-0 top-2 w-3 h-3 rounded-full bg-purple-400"></div> <div class="flex flex-wrap justify-between"><h3 class="font-semibold text-purple-700">${escape(edu.degree || "Degree")}${escape(edu.field ? ` in ${edu.field}` : "")}</h3> <span class="text-sm text-purple-600">${escape(edu.startDate || "Start Date")} - ${escape(edu.endDate || "End Date")} </span></div> <p class="text-gray-700">${escape(edu.institution || "Institution")}</p> ${edu.description ? `<p class="mt-1 text-sm text-gray-600">${escape(edu.description)}</p>` : ``} </div>` : ``}`;
  })}</div>` : ``}</div></div> ` : `${templateId === "minimal" ? `<div class="max-w-2xl mx-auto"><div class="text-center mb-8"><h1 class="text-3xl font-bold">${escape(resumeData.personal.name || "Your Name")}</h1> <p class="text-lg text-gray-700 mt-1">${escape(resumeData.personal.title || "Professional Title")}</p> <div class="mt-3 flex justify-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">${resumeData.personal.email ? `<span>${escape(resumeData.personal.email)}</span>` : ``} ${resumeData.personal.phone ? `<span>• ${escape(resumeData.personal.phone)}</span>` : ``} ${resumeData.personal.location ? `<span>• ${escape(resumeData.personal.location)}</span>` : ``} ${resumeData.personal.website ? `<span>• ${escape(resumeData.personal.website)}</span>` : ``}</div></div> ${resumeData.personal.summary ? `<div class="mb-6"><p class="text-gray-700">${escape(resumeData.personal.summary)}</p></div>` : ``} <hr class="my-6"> ${resumeData.experience.some((exp) => exp.company || exp.position) ? `<div class="mb-6"><h2 class="text-xl font-bold mb-4 uppercase tracking-wider" data-svelte-h="svelte-20sg3t">Experience</h2> ${each(resumeData.experience, (exp) => {
    return `${exp.company || exp.position ? `<div class="mb-4"><div class="flex justify-between mb-1"><h3 class="font-semibold">${escape(exp.position || "Position")}</h3> <span class="text-sm text-gray-600">${escape(exp.startDate || "Start Date")} - ${escape(exp.current ? "Present" : exp.endDate || "End Date")} </span></div> <p class="text-gray-700">${escape(exp.company || "Company")}</p> ${exp.description ? `<p class="mt-2 text-sm text-gray-600">${escape(exp.description)}</p>` : ``} </div>` : ``}`;
  })}</div>` : ``} <hr class="my-6"> ${resumeData.education.some((edu) => edu.institution || edu.degree) ? `<div class="mb-6"><h2 class="text-xl font-bold mb-4 uppercase tracking-wider" data-svelte-h="svelte-exhc3f">Education</h2> ${each(resumeData.education, (edu) => {
    return `${edu.institution || edu.degree ? `<div class="mb-4"><div class="flex justify-between mb-1"><h3 class="font-semibold">${escape(edu.degree || "Degree")}${escape(edu.field ? ` in ${edu.field}` : "")}</h3> <span class="text-sm text-gray-600">${escape(edu.startDate || "Start Date")} - ${escape(edu.endDate || "End Date")} </span></div> <p class="text-gray-700">${escape(edu.institution || "Institution")}</p> ${edu.description ? `<p class="mt-2 text-sm text-gray-600">${escape(edu.description)}</p>` : ``} </div>` : ``}`;
  })}</div>` : ``} <hr class="my-6"> ${resumeData.skills.some((skill) => skill.name) ? `<div><h2 class="text-xl font-bold mb-4 uppercase tracking-wider" data-svelte-h="svelte-11vntgn">Skills</h2> <div class="flex flex-wrap gap-2">${each(resumeData.skills, (skill) => {
    return `${skill.name ? `<span class="bg-gray-100 px-3 py-1 rounded">${escape(skill.name)}</span>` : ``}`;
  })}</div></div>` : ``}</div> ` : `${templateId === "executive" ? `<div class="border-t-8 border-gray-800"><div class="py-6 border-b border-gray-300"><h1 class="text-4xl font-bold text-gray-800">${escape(resumeData.personal.name || "Your Name")}</h1> <p class="text-xl text-gray-700 mt-2">${escape(resumeData.personal.title || "Professional Title")}</p></div> <div class="grid grid-cols-3 gap-6 mt-6"> <div class="col-span-3 md:col-span-1"><div class="mb-6"><h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3" data-svelte-h="svelte-1m1ff7c">Contact Information</h2> <div class="space-y-2 text-sm">${resumeData.personal.email ? `<div><span class="font-medium" data-svelte-h="svelte-9xe0ks">Email:</span> ${escape(resumeData.personal.email)}</div>` : ``} ${resumeData.personal.phone ? `<div><span class="font-medium" data-svelte-h="svelte-13oobfc">Phone:</span> ${escape(resumeData.personal.phone)}</div>` : ``} ${resumeData.personal.location ? `<div><span class="font-medium" data-svelte-h="svelte-1syi7vn">Location:</span> ${escape(resumeData.personal.location)}</div>` : ``} ${resumeData.personal.website ? `<div><span class="font-medium" data-svelte-h="svelte-1wvfxrn">Website:</span> ${escape(resumeData.personal.website)}</div>` : ``}</div></div> ${resumeData.skills.some((skill) => skill.name) ? `<div><h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3" data-svelte-h="svelte-1t8wua6">Core Competencies</h2> <ul class="list-disc pl-5 space-y-1">${each(resumeData.skills, (skill) => {
    return `${skill.name ? `<li>${escape(skill.name)}</li>` : ``}`;
  })}</ul></div>` : ``}</div>  <div class="col-span-3 md:col-span-2">${resumeData.personal.summary ? `<div class="mb-6"><h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3" data-svelte-h="svelte-1irtin7">Professional Summary</h2> <p class="text-gray-700">${escape(resumeData.personal.summary)}</p></div>` : ``} ${resumeData.experience.some((exp) => exp.company || exp.position) ? `<div class="mb-6"><h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3" data-svelte-h="svelte-1gupqd7">Professional Experience</h2> ${each(resumeData.experience, (exp) => {
    return `${exp.company || exp.position ? `<div class="mb-5"><div class="flex justify-between"><h3 class="font-semibold">${escape(exp.company || "Company")}</h3> <span class="text-sm text-gray-600">${escape(exp.startDate || "Start Date")} - ${escape(exp.current ? "Present" : exp.endDate || "End Date")} </span></div> <p class="text-gray-700 italic">${escape(exp.position || "Position")}</p> ${exp.description ? `<p class="mt-2 text-sm text-gray-700">${escape(exp.description)}</p>` : ``} </div>` : ``}`;
  })}</div>` : ``} ${resumeData.education.some((edu) => edu.institution || edu.degree) ? `<div><h2 class="text-lg font-semibold border-b border-gray-300 pb-2 mb-3" data-svelte-h="svelte-1cts2vs">Education</h2> ${each(resumeData.education, (edu) => {
    return `${edu.institution || edu.degree ? `<div class="mb-4"><div class="flex justify-between"><h3 class="font-semibold">${escape(edu.institution || "Institution")}</h3> <span class="text-sm text-gray-600">${escape(edu.startDate || "Start Date")} - ${escape(edu.endDate || "End Date")} </span></div> <p class="text-gray-700">${escape(edu.degree || "Degree")}${escape(edu.field ? ` in ${edu.field}` : "")}</p> ${edu.description ? `<p class="mt-1 text-sm text-gray-600">${escape(edu.description)}</p>` : ``} </div>` : ``}`;
  })}</div>` : ``}</div></div></div>` : ``}`}`}`}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let templateId = $page.url.searchParams.get("template") || "professional";
  const resume = writable({
    personal: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: ""
    },
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false
      }
    ],
    education: [
      {
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ],
    skills: [{ name: "", level: 5 }]
  });
  let resumeData;
  resume.subscribe((value) => {
    resumeData = value;
  });
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-1uu2etw_START -->${$$result.title = `<title>Build Your Resume - Resume Builder</title>`, ""}<!-- HEAD_svelte-1uu2etw_END -->`, ""} <div class="max-w-7xl mx-auto"><h1 class="text-3xl font-bold mb-6" data-svelte-h="svelte-1i3v1vn">Build Your Resume</h1> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> ${validate_component(ResumeForm, "ResumeForm").$$render($$result, { resumeData }, {}, {})}  ${validate_component(ResumePreview, "ResumePreview").$$render($$result, { resumeData, templateId }, {}, {})}</div></div>`;
});
export {
  Page as default
};
