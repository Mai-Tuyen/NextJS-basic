import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const debounce = <Params extends unknown[]>(
  callback: (...args: Params) => void,
  timeout: number = 500
) => {
  let timeoutId: number;
  return (...args: Params) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};
