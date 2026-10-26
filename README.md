# RxJS Playground

A small browser workspace for learning **RxJS with TypeScript and plain HTML**. Practice observables, operators, and DOM events without setting up Angular or learning its template syntax.

Built with RxJS and Vite. This is a learning sandbox, not a complete course.

## Getting started

Install [Node.js](https://nodejs.org/) 22.12 or newer and npm. Clone or download this repository, then open a terminal in its root directory:

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal. Edit `sandbox.ts` and save to reload your exercise. Open the browser developer console to inspect objects and errors.

## Workspace

| File | Purpose |
| --- | --- |
| [`sandbox.ts`](./sandbox.ts) | Your current exercise, loaded directly by the HTML page. |
| [`browser.ts`](./browser.ts) | Reusable DOM references and a helper that logs to the page and console. |
| [`index.html`](./index.html) | Buttons, search input, and output panel. Add your own markup here. |
| [`style.css`](./style.css) | Playground styling. |
| [`lessons/`](./lessons/) | Archive of completed exercises. Files here do not execute automatically. |
| [`public/favicon.svg`](./public/favicon.svg) | Browser tab icon. |

The starter sandbox emits the numbers 1–10 and then completes. The buttons and input are available for your own streams; the Clear output button is already connected by `browser.ts`.

## Writing an exercise

Replace the code in `sandbox.ts` with the example you want to explore. For a click stream:

```ts
import { fromEvent, map, takeUntil } from "rxjs";
import { emitButton, stopButton, log } from "./browser";

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
```

Click **Emit a click** to produce values, then **Stop streams** to complete the subscription. Reload to start again. Clearing the output does not stop a stream.

Import `searchInput` from `browser.ts` for input exercises, or select elements yourself with `document.querySelector`. Regular `console.log` also works. The on-page `log` helper displays the latest 100 lines and supports simple values and JSON-serializable objects.

## Archiving lessons

1. Copy a finished exercise into a named file such as `lessons/02-timers.ts`.
2. Change browser helper imports from `"./browser"` to `"../browser"`.
3. Start your next exercise in `sandbox.ts`.

To replay a lesson, temporarily replace the contents of `sandbox.ts` with its import:

```ts
import "./lessons/01-dom-events";
```

The included DOM events lesson demonstrates clicks, debounced search, and completion with `takeUntil`. Only imported lessons run. If an exercise needs extra HTML elements, retain or restore that markup when replaying it.

## Following an Angular-based tutorial

| Angular example | Plain browser equivalent |
| --- | --- |
| Component HTML template | `index.html` |
| Code inside `ngOnInit()` | Top-level code in `sandbox.ts`; the module runs after the HTML is parsed |
| `@ViewChild` / `nativeElement` | `document.querySelector(...)` |
| `(click)="handler()"` | `fromEvent(button, 'click').subscribe(...)` |
| `{{ value }}` / template rendering | Set an element's `textContent` in `subscribe` |
| `FormControl.valueChanges` | `fromEvent(input, 'input').pipe(map(() => input.value))` |
| `HttpClient.get(...)` | `ajax.getJSON(...)` from `rxjs/ajax`, or `fromFetch(...)` from `rxjs/fetch` |
| `ngOnDestroy` / `async` pipe cleanup | Keep the subscription and call `unsubscribe()`, or use `takeUntil(stop$)` |
| Shared Angular service | A plain TypeScript module exporting a function, observable, or subject |

These are learning equivalents, not identical APIs. For example, HTTP response shapes and errors differ; `fromFetch` also requires parsing the response. Angular's forms and change detection are framework features and are unnecessary for learning RxJS.

## What you can practice here

- Creation: `Observable`, `of`, `from`, `interval`, `timer`, `defer`, `fromEvent`.
- Observer callbacks: `next`, `error`, `complete`; teardown and cancellation.
- Transformation and filtering: `map`, `filter`, `tap`, `scan`, `debounceTime`, `distinctUntilChanged`.
- Combining streams: `merge`, `concat`, `combineLatest`, `zip`, `forkJoin`, `withLatestFrom`.
- Inner streams: `switchMap`, `mergeMap`, `concatMap`, `exhaustMap`.
- Errors: `catchError`, `retry`, `finalize`.
- Sharing: `Subject`, `BehaviorSubject`, `ReplaySubject`, `share`, `shareReplay`; hot vs cold streams.
- Timing tests: `TestScheduler` from `rxjs/testing` (a test runner can be added when you reach testing).

Each page reload starts fresh; it does not demonstrate component lifecycle teardown. Practice cleanup explicitly when stopping streams or removing UI elements.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the browser development server. |
| `npm run check` | Check TypeScript without generating files. |
| `npm run build` | Check TypeScript and build the site into `dist/`. |
| `npm run preview` | Serve the production build locally after building. |

No test runner is configured yet. Installed dependencies and build output are excluded from Git. Commit `package-lock.json` to keep dependency installations reproducible.
