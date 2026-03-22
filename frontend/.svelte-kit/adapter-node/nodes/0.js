

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const universal = {
  "ssr": false,
  "load": null
};
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.B0czsHUR.js","_app/immutable/chunks/gvWUTYZp.js","_app/immutable/chunks/B1RfysOE.js","_app/immutable/chunks/DqBfkzXV.js","_app/immutable/chunks/CPmz-PHo.js","_app/immutable/chunks/DeV37mvF.js","_app/immutable/chunks/D5kJnWJH.js","_app/immutable/chunks/cFr7UPiW.js","_app/immutable/chunks/BbRMVWqf.js","_app/immutable/chunks/CX5cn_23.js"];
export const stylesheets = [];
export const fonts = [];
