/*
 * interval (creation) emits 0 after 2s, then 1, 2, 3... every 2 seconds.
 * takeWhile (filtering) passes values while the predicate is true, then completes
 * at the first failure. Unlike filter, it stops listening after that failure.
 * val is the source value; i is its zero-based index (unused in this condition).
 * val < 5 passes 0-4. The second argument, true, also includes the failing value 5.
 * Output: 0 at 2s, 1 at 4s... 5 at 12s, then completion stops the interval.
 * Omitting true excludes 5; completion still happens when 5 arrives at 12s.
 * This subscriber logs values only, so completion produces no log message.
 * The shared subscriptions list lets Stop/Clear unsubscribe before completion.
 */

import { takeWhile, interval } from "rxjs";
import { log, subscriptions } from "../browser";

const streams = interval(2000);
const sub = streams
  .pipe(takeWhile((val, i) => val < 5, true))
  .subscribe((data) => log("data", data));
subscriptions.push(sub);
