/*
 * interval (creation) emits 0 after 2s, then 1, 2, 3... every 2 seconds.
 * fromEvent (creation) emits whenever the Emit button is clicked.
 * takeUntil (filtering) passes interval values until the FIRST click, then completes.
 * Example: click at 5s -> log 0 at 2s, 1 at 4s, then "complete" at 5s.
 * Clicking before 2s completes without emitting any numbers. The click itself
 * is a stopping signal and is not passed to the subscriber.
 * Completion removes the interval and click listener. Stop/Clear instead uses
 * the shared subscriptions list to unsubscribe, without calling complete.
 */

import { log, emitButton, subscriptions } from "../browser";
import { fromEvent, interval, takeUntil } from "rxjs";

const emitStreams = fromEvent(emitButton, "click");
const streams = interval(2000);

const subscription = streams.pipe(takeUntil(emitStreams)).subscribe(
  (data) => log("data", data),
  (err) => log("err", err),
  () => log("complete"),
);
subscriptions.push(subscription);
