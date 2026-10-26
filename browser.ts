// Reusable browser setup. Write your exercises in sandbox.ts.
// Plain DOM elements replace Angular's template bindings and ViewChild.
export const emitButton = document.querySelector<HTMLButtonElement>("#emit-button")!;
export const stopButton = document.querySelector<HTMLButtonElement>("#stop-button")!;
export const searchInput = document.querySelector<HTMLInputElement>("#search-input")!;
const clearButton = document.querySelector<HTMLButtonElement>("#clear-button")!;
const output = document.querySelector<HTMLPreElement>("#output")!;

// Optional display helper: console.log works normally too.
export function log(label: string, value?: unknown) {
  console.log(label, value ?? "");
  const line = value === undefined ? label : `${label}: ${JSON.stringify(value)}`;
  // Cap the visible output so long-running experiments don't grow forever.
  output.textContent = [...(output.textContent ?? "").split("\n").filter(Boolean), line]
    .slice(-100)
    .join("\n");
  output.scrollTop = output.scrollHeight;
}

clearButton.addEventListener("click", () => { output.textContent = ""; });
