import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, length: number) {
  return text.length > length ? text.slice(0, length) + "..." : text;
}

export function getDayAfter() {
  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);

  return tommorow;
}

export function formatDate(date: Date) {
  return moment(date).format("LL");
}
