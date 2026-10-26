import { from } from "rxjs";
import { log } from "./browser";

// Your working area: this file runs in the browser.
// DOM helpers are available from ./browser: emitButton, stopButton, searchInput, log.
// Archive finished exercises in lessons/.

const list = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
list.subscribe({
  next: (value) => log("Value", value),
  error: (error) => console.error(error),
  complete: () => log("complete"),
});
