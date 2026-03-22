

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/users/_id_/_page.svelte.js')).default;
export const universal = {
  "ssr": false,
  "load": null
};
export const universal_id = "src/routes/users/[id]/+page.ts";
export const imports = ["_app/immutable/nodes/8.CO-CWrM0.js","_app/immutable/chunks/DqBfkzXV.js","_app/immutable/chunks/CPmz-PHo.js","_app/immutable/chunks/D5kJnWJH.js","_app/immutable/chunks/BbRMVWqf.js","_app/immutable/chunks/DeV37mvF.js"];
export const stylesheets = [];
export const fonts = [];
