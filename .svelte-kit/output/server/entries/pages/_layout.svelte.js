import { c as create_ssr_component, e as escape } from "../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen bg-gray-100"><header class="bg-blue-600 text-white shadow-lg" data-svelte-h="svelte-13uy8mx"><div class="container mx-auto px-4 py-4"><nav class="flex justify-between items-center"><a href="/" class="text-2xl font-bold">Resume Builder</a> <div class="space-x-4"><a href="/" class="hover:underline">Home</a> <a href="/templates" class="hover:underline">Templates</a></div></nav></div></header> <main class="container mx-auto px-4 py-8">${slots.default ? slots.default({}) : ``}</main> <footer class="bg-gray-800 text-white py-6"><div class="container mx-auto px-4 text-center"><p>© ${escape((/* @__PURE__ */ new Date()).getFullYear())} Resume Builder. All rights reserved.</p></div></footer></div>`;
});
export {
  Layout as default
};
