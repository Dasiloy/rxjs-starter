import { bufferCount, interval, Observer } from "rxjs";
import { log, stopButton } from "../browser";

// Your working area: this file runs in the browser.
// DOM helpers are available from ./browser: emitButton, stopButton, searchInput, log.
// Archive finished exercises in lessons/.

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

stopButton.addEventListener("click", () => subscription.unsubscribe());
