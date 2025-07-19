

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.AYhQGi9I.js","_app/immutable/chunks/TQVF8SYu.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/C7ZVyKnX.js"];
export const stylesheets = [];
export const fonts = [];
