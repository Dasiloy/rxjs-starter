import { fromEvent, audit, interval } from "rxjs";
import { emitButton, log } from "../browser";

const clicks = fromEvent(emitButton, "click");
const result = clicks.pipe(audit((ev) => interval(1000)));
result.subscribe((x) => log("data", XMLDocument));
