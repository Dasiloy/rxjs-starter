/*
 * interval (creation) emits 0 after 2.5s, then 1, 2, 3... every 2.5 seconds.
 * skip (filtering) ignores the first 10 source emissions, then passes all later ones.
 * Here 0-9 are skipped; the first logged value is 10 at 27.5s, then 11 at 30s...
 * skip counts emissions, not seconds, and does not restart or renumber the source.
 * It does not complete after skipping: this interval keeps running until stopped.
 * Registering the subscription in the shared list lets Stop/Clear unsubscribe.
 */

import { skip, interval } from "rxjs";
import { log, subscriptions } from "../browser";

subscriptions.push(
  interval(2500)
    .pipe(skip(10))
    .subscribe((data) => log("data", data)),
);
