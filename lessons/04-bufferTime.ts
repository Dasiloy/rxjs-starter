/*
 * bufferTime (transformation): collect values during scheduled time windows.
 * interval (creation) emits 0 after 1s, then 1, 2, 3... once per second.
 * bufferTime(2000, 5000): open at 0s, 5s, 10s...; each collection lasts 2s.
 * Emit at 2s, 7s, 12s...; each window is followed by a 3-second collection gap.
 * Values emitted during gaps are not collected. Empty windows still emit [].
 * Without the second argument, a new collection opens as soon as the previous closes.
 * Avoid relying on which window catches a source event exactly on a timer boundary.
 */

import { bufferTime, interval, Observer } from "rxjs";
import { log, subscriptions } from "../browser";

class IntervalObserver implements Observer<number[]> {
  next(data: number[]) {
    log("data", data);
  }

  error(error: any) {
    console.log("error", error);
  }

  complete() {
    log("Completed");
  }
}

const observable = interval(1000);

const subscription = observable
  .pipe(bufferTime(2000, 5000))
  .subscribe(new IntervalObserver());

/*
 * Register with the shared list so Stop/Clear unsubscribes this pipeline.
 * Unsubscribe stops its timers/listeners without calling complete or flushing the buffer.
 */
subscriptions.push(subscription);
