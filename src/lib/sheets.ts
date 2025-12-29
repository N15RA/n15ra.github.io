import type { Event, Course } from "../types/content";

const OPENSHEET_BASE_URL = "https://opensheet.elk.sh";

// Spreadsheet ID will be configured here once created
// Format: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
const SPREADSHEET_ID = import.meta.env.PUBLIC_GOOGLE_SHEET_ID || "";

const SHEET_NAMES = {
  events: "Events",
  courses: "Courses",
} as const;

const FETCH_TIMEOUT_MS = 8000;

async function fetchSheet<T>(sheetName: string): Promise<T[]> {
  if (!SPREADSHEET_ID) {
    console.warn(`[sheets] No spreadsheet ID configured. Using empty data.`);
    return [];
  }

  const url = `${OPENSHEET_BASE_URL}/${SPREADSHEET_ID}/${sheetName}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(
        `[sheets] Failed to fetch ${sheetName}: ${response.status}`,
      );
      return [];
    }

    const data = await response.json();
    return data as T[];
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      console.error(
        `[sheets] Timeout fetching ${sheetName} after ${FETCH_TIMEOUT_MS}ms`,
      );
    } else {
      console.error(`[sheets] Error fetching ${sheetName}:`, error);
    }
    return [];
  }
}

function parseBoolean(value: string | boolean): boolean {
  if (typeof value === "boolean") return value;
  return value?.toLowerCase() === "true";
}

export async function fetchEvents(): Promise<Event[]> {
  const rawEvents = await fetchSheet<Event>(SHEET_NAMES.events);

  return rawEvents
    .filter((event) => parseBoolean(event.visible))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function fetchAllCourses(): Promise<Course[]> {
  const rawCourses = await fetchSheet<Course>(SHEET_NAMES.courses);

  return rawCourses.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getLatestSemester(courses: Course[]): string | null {
  if (courses.length === 0) return null;

  const semesters = [...new Set(courses.map((c) => c.semester))];
  semesters.sort((a, b) => b.localeCompare(a));
  return semesters[0] || null;
}

export function getCurrentSemesterCourses(courses: Course[]): Course[] {
  const latestSemester = getLatestSemester(courses);
  if (!latestSemester) return [];

  return courses.filter((c) => c.semester === latestSemester);
}

export function groupCoursesBySemester(
  courses: Course[],
): Map<string, { label: string; courses: Course[] }> {
  const grouped = new Map<string, { label: string; courses: Course[] }>();

  for (const course of courses) {
    const existing = grouped.get(course.semester);
    if (existing) {
      existing.courses.push(course);
    } else {
      grouped.set(course.semester, {
        label: course.semester_label || course.semester,
        courses: [course],
      });
    }
  }

  // Sort by semester descending (newest first)
  return new Map([...grouped.entries()].sort(([a], [b]) => b.localeCompare(a)));
}
