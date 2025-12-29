export interface Event {
  id: string;
  title: string;
  description_zh: string;
  description_en: string;
  badge: string;
  image: string;
  date?: string;
  order?: number;
  visible: string | boolean;
}

export interface Course {
  id: string;
  semester: string;
  semester_label: string;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  date: string;
  time: string;
  speaker: string;
  order?: number;
}

export interface Officer {
  name: string;
  position_zh: string;
  position_en: string;
}

export interface YearRecord {
  year: string;
  academicYear: string;
  groupPhoto?: string;
  officers: Officer[];
}
