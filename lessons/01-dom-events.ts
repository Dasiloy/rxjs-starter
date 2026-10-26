import { debounceTime, distinctUntilChanged, fromEvent, map, takeUntil } from "rxjs";
import { emitButton, stopButton, searchInput, log } from "../browser";

// Each click emits an event. takeUntil completes a stream when Stop is clicked.
const stop$ = fromEvent(stopButton, "click");

fromEvent<MouseEvent>(emitButton, "click")
  .pipe(
    map((event) => ({ x: event.clientX, y: event.clientY })),
    takeUntil(stop$),
  )
  .subscribe({
    next: (position) => log("Click", position),
    complete: () => log("Click stream complete"),
  });

fromEvent(searchInput, "input")
  .pipe(
    map(() => searchInput.value),
    debounceTime(300),
    distinctUntilChanged(),
    takeUntil(stop$),
  )
  .subscribe({
    next: (query) => log("Search", query),
    complete: () => log("Search stream complete"),
  });

