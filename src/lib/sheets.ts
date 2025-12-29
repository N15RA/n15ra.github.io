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

export async function fetchCourses(): Promise<Course[]> {
  const rawCourses = await fetchSheet<Course>(SHEET_NAMES.courses);

  return rawCourses
    .filter((course) => parseBoolean(course.visible))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}
