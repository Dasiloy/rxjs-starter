import { buffer, fromEvent, interval, Observer } from "rxjs";
import { emitButton, log, stopButton } from "../browser";

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
  .pipe(buffer(fromEvent(emitButton, "click")))
  .subscribe(new IntervalObserver());

stopButton.addEventListener("click", () => subscription.unsubscribe());
