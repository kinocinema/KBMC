
export interface Doctor {
  id: string;
  name: string;
  designation: string;
  department: string;
  isFemale: boolean;
  bio: string;
  focus: string[];
  imageUrl: string;
  qualification?: string;
  clinicSuite?: string;
  operationHours?: {
    day: string;
    time: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface PrayerTime {
  name: string;
  time: string;
}
