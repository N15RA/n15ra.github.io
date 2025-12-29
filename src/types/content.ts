export interface Event {
  id: string;
  title: string;
  description_zh: string;
  description_en: string;
  badge: string;
  image: string;
  date?: string;
  order: number;
  visible: string | boolean;
}

export interface Course {
  id: string;
  title_zh: string;
  title_en: string;
  description_zh: string;
  description_en: string;
  date: string;
  time: string;
  speaker: string;
  order: number;
  visible: string | boolean;
}
