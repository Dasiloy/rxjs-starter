/*
 * bufferCount (transformation): close by value count, not elapsed time.
 * interval (creation) emits 0 after 1s, then 1, 2, 3... once per second.
 * bufferCount(3, 4): collect 3 values; open a collection every 4 source values.
 * Result: [0, 1, 2], skip 3, then [4, 5, 6], skip 7, and so on.
 * Without the second argument, collections are back-to-back: [0, 1, 2], [3, 4, 5]...
 * A start interval smaller than the size creates overlapping collections.
 */

import { bufferCount, interval, Observer } from "rxjs";
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
  .pipe(bufferCount(3, 4))
  .subscribe(new IntervalObserver());

/*
 * Register with the shared list so Stop/Clear unsubscribes this pipeline.
 * Unsubscribe stops its timers/listeners without calling complete or flushing the buffer.
 */
subscriptions.push(subscription);
