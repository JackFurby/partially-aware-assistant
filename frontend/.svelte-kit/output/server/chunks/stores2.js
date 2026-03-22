import { w as writable } from "./index.js";
const currentUser = writable(null);
const chats = writable([]);
export {
  chats as a,
  currentUser as c
};
