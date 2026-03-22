

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/chat/_page.svelte.js')).default;
export const universal = {
  "ssr": false,
  "load": null
};
export const universal_id = "src/routes/chat/+page.ts";
export const imports = ["_app/immutable/nodes/3.BRVhvTG_.js","_app/immutable/chunks/DqBfkzXV.js","_app/immutable/chunks/CPmz-PHo.js","_app/immutable/chunks/DeV37mvF.js","_app/immutable/chunks/D5kJnWJH.js","_app/immutable/chunks/DvTTIovI.js","_app/immutable/chunks/cFr7UPiW.js","_app/immutable/chunks/B1RfysOE.js","_app/immutable/chunks/gvWUTYZp.js","_app/immutable/chunks/BbRMVWqf.js","_app/immutable/chunks/BHoYqX_R.js"];
export const stylesheets = ["_app/immutable/assets/3.C40WDnor.css"];
export const fonts = [];
