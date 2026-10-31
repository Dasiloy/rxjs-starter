/*
 * bufferWhen (transformation): call a function for each collection's closing signal.
 * fromEvent (creation) supplies clicks; collection starts immediately on subscribe.
 * interval (creation) is recreated with a random delay from 1 up to 10 seconds.
 * Its FIRST emission closes the collection and emits the clicks (or [] if empty).
 * That interval is unsubscribed; a new collection opens immediately and the function
 * runs again, choosing a fresh delay. There are no gaps between collections.
 * buffer listens to one supplied closing observable; bufferWhen calls a function
 * again each round. The random delay is chosen per collection, not per click.
 */

import { bufferWhen, fromEvent, interval, Observer } from "rxjs";
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
  .pipe(bufferWhen(() => interval(1000 + Math.random() * 9000)))
  .subscribe(new IntervalObserver());

/*
 * Register with the shared list so Stop/Clear unsubscribes this pipeline.
 * Unsubscribe stops its timers/listeners without calling complete or flushing the buffer.
 */
subscriptions.push(subscription);
