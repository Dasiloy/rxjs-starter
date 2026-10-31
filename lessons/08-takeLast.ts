// import { bufferCount, interval, Observer } from "rxjs";
// import { log, stopButton } from "./browser";

import { Observer, of, takeLast } from "rxjs";
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

const subscription = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)
  .pipe(takeLast(5))
  .subscribe(new IntervalObserver());

subscriptions.push(subscription);
