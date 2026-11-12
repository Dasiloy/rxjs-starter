/* Ready for the next exercise. Register subscriptions with the shared list in browser.ts. */

import { fromEvent, interval, sample } from "rxjs";
import { subscriptions, emitButton, log } from "../browser";

const stream = interval(1000);
stream
  .pipe(sample(fromEvent(emitButton, "click")))
  .subscribe((data) => log("data", data));
