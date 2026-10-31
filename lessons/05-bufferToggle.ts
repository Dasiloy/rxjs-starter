/*
 * bufferToggle (transformation): one observable opens collections; another closes each.
 * fromEvent (creation) supplies the click events being collected.
 * interval (creation) starts on subscribe: one ongoing clock opens at 2s, 4s, 6s...
 * Each opening calls the function and subscribes to a new timer (creation).
 * timer(1000) emits once after 1s, closing that collection and emitting its array.
 * Windows: 2-3s, 4-5s, 6-7s... Clicks outside these windows are not collected.
 * filter (filtering) passes only nonempty arrays to the observer. Its console.log
 * runs BEFORE the length check, so the console can still show empty arrays.
 * Open/close clocks run even without clicks. Overlapping windows can share events.
 */

import {
  bufferToggle,
  filter,
  fromEvent,
  interval,
  Observer,
  timer,
} from "rxjs";
import { emitButton, log, subscriptions } from "../browser";

class IntervalObserver implements Observer<any[]> {
  next(data: any[]) {
    log("data", data);
  }

  error(error: any) {
    console.log("error", error);
  }

  complete() {
    log("Completed");
  }
}

const clickStreams = fromEvent(emitButton, "click");

const subscription = clickStreams
  .pipe(
    bufferToggle(interval(2000), () => timer(1000)),
    filter((_event) => {
      console.log("Event", _event);
      return _event.length > 0;
    }),
  )
  .subscribe(new IntervalObserver());

/*
 * Register with the shared list so Stop/Clear unsubscribes this pipeline.
 * Unsubscribe stops its timers/listeners without calling complete or flushing the buffer.
 */
subscriptions.push(subscription);
