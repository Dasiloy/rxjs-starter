import { fromEvent, interval, throttle } from "rxjs";
import { emitButton, log } from "../browser";

const stream = fromEvent(emitButton, "click");
stream
  .pipe(
    throttle(() => interval(3000), {
      leading: true,
      trailing: true,
    }),
  )
  .subscribe((data) => log("data", data));
