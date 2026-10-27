import { Observable } from "rxjs";
import { log } from "./browser";

// Your working area: this file runs in the browser.
// DOM helpers are available from ./browser: emitButton, stopButton, searchInput, log.
// Archive finished exercises in lessons/.

const observable = new Observable<number>((observer) => {
  for (let i = 0; i < 5; i++) {
    observer.next(i);
  }

  observer.complete();
});

observable.subscribe({
  next: (value) => log("VALUE", value),
  error: (error) => console.error(error),
  // Optional: you can add a complete handler t
  complete: () => log("Completed"),
});
