

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/_page.svelte.js')).default;
export const universal = {
  "ssr": false,
  "load": null
};
export const universal_id = "src/routes/settings/+page.ts";
export const imports = ["_app/immutable/nodes/6.8mIIqMa8.js","_app/immutable/chunks/DqBfkzXV.js","_app/immutable/chunks/CPmz-PHo.js","_app/immutable/chunks/DeV37mvF.js","_app/immutable/chunks/D5kJnWJH.js","_app/immutable/chunks/DvTTIovI.js","_app/immutable/chunks/BbRMVWqf.js","_app/immutable/chunks/CX5cn_23.js","_app/immutable/chunks/BHoYqX_R.js"];
export const stylesheets = ["_app/immutable/assets/6.JZMzggXB.css"];
export const fonts = [];
