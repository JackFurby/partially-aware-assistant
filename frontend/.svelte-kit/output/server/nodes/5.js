

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/rag/_page.svelte.js')).default;
export const universal = {
  "ssr": false,
  "load": null
};
export const universal_id = "src/routes/rag/+page.ts";
export const imports = ["_app/immutable/nodes/5.BuELfTiV.js","_app/immutable/chunks/DqBfkzXV.js","_app/immutable/chunks/CPmz-PHo.js","_app/immutable/chunks/DeV37mvF.js","_app/immutable/chunks/D5kJnWJH.js","_app/immutable/chunks/DvTTIovI.js","_app/immutable/chunks/BHoYqX_R.js"];
export const stylesheets = ["_app/immutable/assets/5.DycTaocW.css"];
export const fonts = [];
