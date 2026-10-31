import { log } from "./browser";

let text = "W3Schools Tutorials";
let pattern = /(?<!W3Schools )Tutorials/;

let result = pattern.test(text);
log("result", result); // true()
