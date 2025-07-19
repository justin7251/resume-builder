import { c as create_ssr_component, f as each, e as escape } from "../../../chunks/ssr.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/state.svelte.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const templates = [
    {
      id: "professional",
      name: "Professional",
      description: "A clean, modern template suitable for most industries",
      image: "/templates/professional.png"
    },
    {
      id: "creative",
      name: "Creative",
      description: "A colorful template for creative fields and design roles",
      image: "/templates/creative.png"
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "A streamlined template with a focus on content",
      image: "/templates/minimal.png"
    },
    {
      id: "executive",
      name: "Executive",
      description: "An elegant template for senior positions and leadership roles",
      image: "/templates/executive.png"
    }
  ];
  return `${$$result.head += `<!-- HEAD_svelte-serxs4_START -->${$$result.title = `<title>Resume Templates - Resume Builder</title>`, ""}<!-- HEAD_svelte-serxs4_END -->`, ""} <div class="max-w-5xl mx-auto"><h1 class="text-3xl font-bold mb-6" data-svelte-h="svelte-1ulyfn">Resume Templates</h1> <p class="mb-8 text-gray-700" data-svelte-h="svelte-1ma6jla">Choose a template to get started with your resume.</p> <div class="grid md:grid-cols-2 gap-6">${each(templates, (template) => {
    return `<div class="border rounded-lg overflow-hidden shadow-md bg-white"><div class="h-48 bg-gray-200 flex items-center justify-center" data-svelte-h="svelte-1v5pfqq"> <div class="text-gray-400 text-lg">[Template Preview]</div></div> <div class="p-4"><h3 class="text-xl font-semibold mb-2">${escape(template.name)}</h3> <p class="text-gray-600 mb-4">${escape(template.description)}</p> <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" data-svelte-h="svelte-c0uunz">Use This Template
          </button></div> </div>`;
  })}</div></div>`;
});
export {
  Page as default
};
