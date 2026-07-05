export interface ClinicalService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  symptoms: string[];
  protocol: string[];
  duration: string;
  costEstimate: string;
  iconName: string;
}

export interface AppointmentInput {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes: string;
}

export interface AppointmentRecord extends AppointmentInput {
  id: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const HOSPITAL_METADATA = {
  name: "Sinora Dental Hospital",
  address: "21, 7th Ave, Sarvamangala Colony, Sri Devi Colony, Ashok Nagar, Chennai, Tamil Nadu 600083",
  phone: "08056419529",
  mapsLink: "https://www.google.com/maps/place/Sinora+Dental+Hospital/@13.0399252,80.2168084,16z/data=!4m12!1m5!3m4!1s0x3a526776c7260445:0x4d03a4abe877f0c3!2sSinora+Dental+Hospital!11m1!2e1!3m5!1s0x3a526776c7260445:0x4d03a4abe877f0c3!8m2!3d13.0399252!4d80.2168084!16s%2Fg%2F11ty6l98b0!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D",
  operatingHours: [
    { days: "Monday - Saturday", hours: "09:30 AM - 08:30 PM" },
    { days: "Sunday", hours: "10:00 AM - 01:00 PM" }
  ],
  contacts: {
    email: "info@sinoradental.com",
    primaryPhone: "08056419529"
  }
};
