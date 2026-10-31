/*
 * buffer (transformation): collect source values until the closing observable emits.
 * interval (creation) emits 0 after 1s, then 1, 2, 3... once per second.
 * fromEvent (creation) supplies the closing signal whenever Emit is clicked.
 * Collection starts on subscribe. Example: click after values 0, 1, 2 -> emit [0, 1, 2].
 * A fresh collection starts immediately; the same click listener stays subscribed.
 * Clicking again before another source value arrives emits []. Clicks are signals,
 * not the values in the array: this example collects interval numbers.
 */

import { buffer, fromEvent, interval, Observer } from "rxjs";
import { emitButton, log, subscriptions } from "../browser";

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
  .pipe(buffer(fromEvent(emitButton, "click")))
  .subscribe(new IntervalObserver());

/*
 * Register with the shared list so Stop/Clear unsubscribes this pipeline.
 * Unsubscribe stops its timers/listeners without calling complete or flushing the buffer.
 */
subscriptions.push(subscription);
