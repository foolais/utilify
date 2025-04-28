import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, length: number) {
  return text.length > length ? text.slice(0, length) + "..." : text;
}

export function getDayBefore() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday;
}

export function formatDate(date: Date) {
  return moment(date).format("LL");
}
