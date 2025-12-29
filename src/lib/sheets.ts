import type { Event, Course } from '../types/content';

const OPENSHEET_BASE_URL = 'https://opensheet.elk.sh';

// Spreadsheet ID will be configured here once created
// Format: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit
const SPREADSHEET_ID = import.meta.env.PUBLIC_GOOGLE_SHEET_ID || '';

const SHEET_NAMES = {
  events: 'Events',
  courses: 'Courses',
} as const;

async function fetchSheet<T>(sheetName: string): Promise<T[]> {
  if (!SPREADSHEET_ID) {
    console.warn(`[sheets] No spreadsheet ID configured. Using empty data.`);
    return [];
  }

  const url = `${OPENSHEET_BASE_URL}/${SPREADSHEET_ID}/${sheetName}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`[sheets] Failed to fetch ${sheetName}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data as T[];
  } catch (error) {
    console.error(`[sheets] Error fetching ${sheetName}:`, error);
    return [];
  }
}

function parseBoolean(value: string | boolean): boolean {
  if (typeof value === 'boolean') return value;
  return value?.toLowerCase() === 'true';
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
  courses: Course[]
): Map<string, { label: string; courses: Course[] }> {
  const grouped = new Map<string, { label: string; courses: Course[] }>();

  const semesters = [...new Set(courses.map((c) => c.semester))];
  semesters.sort((a, b) => b.localeCompare(a));

  for (const semester of semesters) {
    const semesterCourses = courses.filter((c) => c.semester === semester);
    const label = semesterCourses[0]?.semester_label || semester;
    grouped.set(semester, { label, courses: semesterCourses });
  }

  return grouped;
}
