import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = date => {
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  let targetDate = new Date(date);

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return fullDate;
};

/**
 * Formats a date string into a more readable format.
 * @param {string} dateString - The date string to format (e.g., "2023-05-01")
 * @returns {string} The formatted date string (e.g., "May 2023")
 */
export const formatDateMonthYear = dateString => {
  if (!dateString || dateString === "Present") return "Present";

  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};
