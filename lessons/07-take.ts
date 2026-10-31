// import { bufferCount, interval, Observer } from "rxjs";
// import { log, stopButton } from "./browser";

import { interval, Observer, take } from "rxjs";
import { log, subscriptions } from "../browser";

// Your working area: this file runs in the browser.
// DOM helpers are available from ./browser: emitButton, stopButton, searchInput, log.
// Archive finished exercises in lessons/.

class IntervalObserver implements Observer<any> {
  next(data: any) {
    log("data", data);
  }

  error(error: any) {
    console.log("error", error);
  }

  complete() {
    log("Completed");
  }
}

const subscription = interval(1000)
  .pipe(take(10))
  .subscribe(new IntervalObserver());

subscriptions.push(subscription);
