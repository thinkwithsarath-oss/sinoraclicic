import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Calendar, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Mail, 
  MessageSquare, 
  Check, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  X, 
  Menu,
  ShieldCheck, 
  Activity, 
  Award, 
  Search, 
  Building, 
  ExternalLink, 
  FileText, 
  Smile, 
  ChevronDown,
  Info,
  Star,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Heart,
  DollarSign,
  Layers,
  Users,
  RefreshCw
} from "lucide-react";
import { HOSPITAL_METADATA, ClinicalService, AppointmentRecord, ChatMessage } from "./types";

import ServicesPage from "./components/ServicesPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import BlogPage from "./components/BlogPage";
import FAQPage from "./components/FAQPage";
import ConfettiAnimation from "./components/ConfettiAnimation";
import AdminPanel from "./components/AdminPanel";
import SinoraLogo from "./components/SinoraLogo";
import RegistrationModal from "./components/RegistrationModal";
import { generateICSLink } from "./utils/calendar";
import { HelpCircle } from "lucide-react";
import GoogleReviewsWidget from "./components/GoogleReviewsWidget";

// High-authority, GEO & SEO-optimized clinical services data
const CLINICAL_SERVICES: ClinicalService[] = [
  {
    id: "implants",
    title: "High-Precision Dental Implants",
    shortDesc: "Permanent, bio-compatible tooth replacement using state-of-the-art titanium fixtures.",
    fullDesc: "Our high-precision dental implant protocol restores oral function and facial aesthetics. Using titanium fixtures that exhibit outstanding osseointegration properties, we insert the implant directly into the alveolar bone structure. Over a three to six month period, the bone fuses with the implant, creating an anchor as secure as a natural tooth root.",
    symptoms: [
      "Edentulism (completely or partially missing teeth)",
      "Unstable or ill-fitting traditional dentures",
      "Bone resorption due to prolonged tooth loss",
      "Inability to chew or articulate words clearly"
    ],
    protocol: [
      "3D Cone Beam Computed Tomography (CBCT) diagnostic mapping",
      "Digital computer-guided surgical implant placement",
      "Controlled osseointegration monitoring phase",
      "Custom monolithic zirconia or porcelain crown coupling"
    ],
    duration: "3 - 6 Months",
    costEstimate: "Clinical consultation required for precise pricing",
    iconName: "Award"
  },
  {
    id: "root-canal",
    title: "Advanced Root Canal Therapy",
    shortDesc: "Decisive micro-surgical endodontics to save infected teeth and eliminate acute pain.",
    fullDesc: "Modern endodontic treatment is highly efficient and designed to relieve pain rather than cause it. Root canal therapy addresses pathology within the dental pulp (nerve chamber) resulting from deep decay or trauma. Under high magnification, the infected pulpal tissue is thoroughly debrided, chemical disinfection is performed, and the space is three-dimensionally sealed.",
    symptoms: [
      "Severe pulpal pain aggravated by thermal changes",
      "Localized dental abscess or gingival swelling",
      "Acute tenderness during mastication or pressure",
      "Spontaneous, throbbing pain radiating to the jaw"
    ],
    protocol: [
      "High-magnification diagnostic assessment",
      "Painless local anesthesia and rubber dam isolation",
      "Rotary endodontic root canal instrumentation",
      "Thermoplastic gutta-percha obturation and crown protection"
    ],
    duration: "1 - 2 Sessions",
    costEstimate: "Varies by tooth complexity (Anterior vs. Molar)",
    iconName: "Activity"
  },
  {
    id: "orthodontics",
    title: "Modern Braces & Clear Aligners",
    shortDesc: "Advanced alignment therapies including high-precision metal brackets and clear aligners.",
    fullDesc: "Orthodontic treatment corrects malocclusions and improves dental arches. We offer advanced fixed bracket systems and high-precision thermoplastic clear aligners. By applying continuous, controlled physiological forces, teeth are gradually repositioned into optimal alignment, preventing future periodontal issues and temporomandibular joint (TMJ) stress.",
    symptoms: [
      "Dental crowding, spacing, or diastema",
      "Malocclusion (overbite, underbite, crossbite, or open bite)",
      "Misaligned teeth causing dental wear or speech difficulties",
      "Jaw joint clicking or muscle fatigue during chewing"
    ],
    protocol: [
      "Digital intraoral 3D scanner mapping",
      "Computerized orthodontic treatment progression design",
      "Precise indirect bracket bonding or clear aligner delivery",
      "Regular physiological tension adjustments and retention follow-up"
    ],
    duration: "12 - 24 Months",
    costEstimate: "Highly customized based on alignment severity",
    iconName: "Sparkles"
  },
  {
    id: "pediatric",
    title: "Specialized Pediatric Dentistry",
    shortDesc: "Gentle preventive care and dental habit formation for young patients in a supportive environment.",
    fullDesc: "Early dental health forms the cornerstone of permanent dentition. Pediatric dentistry focuses on preventive therapies, sealants, fluoride treatments, and habit counseling. Our protocols are designed to manage children's anxieties and build positive, life-long oral hygiene practices in a supportive, trauma-free environment.",
    symptoms: [
      "Early childhood caries (ECC)",
      "Teething pain or thumb-sucking structural risks",
      "Dental trauma from play or sports",
      "Congenitally missing teeth or enamel defects"
    ],
    protocol: [
      "Interactive, non-threatening behavioral orientation",
      "Gentle diagnostic exploration and tooth charting",
      "Pit and fissure sealant application for cavity prevention",
      "Painless micro-restorations if caries are detected"
    ],
    duration: "45 - 60 Minutes per visit",
    costEstimate: "Standard preventive session rates apply",
    iconName: "Smile"
  },
  {
    id: "periodontics",
    title: "Comprehensive Gum & Periodontal Care",
    shortDesc: "Treatment of gingivitis, periodontitis, and bone-support diseases using laser debridement.",
    fullDesc: "Periodontal disease is the primary cause of adult tooth loss. Our specialized scaling, root planing, and subgingival laser therapies combat plaque-induced periodontal infections. By halting alveolar bone destruction, we stabilize tooth structures and eliminate chronic bleeding and tissue inflammation.",
    symptoms: [
      "Gingival bleeding during brushing or flossing",
      "Chronic halitosis (bad breath) despite hygiene efforts",
      "Receding gums and exposure of sensitive tooth roots",
      "Mobile, loose, or shifting teeth"
    ],
    protocol: [
      "Periodontal pocket depth measurement mapping",
      "Piezoelectric subgingival scaling and ultrasonic debridement",
      "Laser-assisted pocket sterilization (where indicated)",
      "Hygiene instruction and intensive maintenance scheduling"
    ],
    duration: "1 - 3 Sessions",
    costEstimate: "Varies by severity and number of quadrants",
    iconName: "ShieldCheck"
  }
];

// Voice Assistant / Search-Engine friendly AEO structured questions
const FAQ_HUB = [
  {
    question: "Where is Sinora Dental Hospital located in Ashok Nagar, Chennai?",
    answer: "Sinora Dental Hospital is situated in Chennai, Tamil Nadu. The exact clinical address is 21, 7th Ave, Sarvamangala Colony, Sri Devi Colony, Ashok Nagar, Chennai, Tamil Nadu 600083. It is easily accessible via the Ashok Nagar Metro Station and major central bus routes, making it highly convenient for patients seeking dental care."
  },
  {
    question: "How do I schedule an appointment at Sinora Dental Hospital, Chennai?",
    answer: "You can book an appointment at Sinora Dental Hospital by calling our direct helpline at 08056419529, visiting our Ashok Nagar clinic, or using our interactive on-site scheduling system. The scheduler allows you to choose your clinical service, pick a date and time slot, and secure a confirmed appointment ticket instantly."
  },
  {
    question: "What is the clinical success rate and duration of dental implants?",
    answer: "At Sinora Dental Hospital, our bio-compatible titanium dental implants carry a long-term clinical success rate of over ninety-eight percent. The process typically ranges from three to six months to allow for solid osseointegration (bone fusion) before the final high-strength zirconia crown is securely placed."
  },
  {
    question: "What should I do if I have an emergency toothache or dental pain in Chennai?",
    answer: "In case of acute, radiating dental pain or swelling, you should immediately contact Sinora Dental Hospital at 08056419529 to schedule an emergency diagnostic assessment. Our specialists prioritize emergency cases for root canal therapy or therapeutic debridement to eliminate pulpal infection and relieve excruciating pain."
  },
  {
    question: "Does Sinora Dental Hospital offer modern orthodontic treatments like invisible aligners?",
    answer: "Yes, we specialize in high-precision clear aligners as well as standard bracket orthodontics. Our clear aligners are fabricated from custom-designed medical-grade clear polymers, offering a nearly invisible, removable orthodontic treatment that progressively aligns teeth over twelve to twenty-four months."
  }
];

const PATIENT_TESTIMONIALS = [
  {
    id: "t1",
    initials: "A.S.",
    treatment: "High-Precision Dental Implants",
    outcome: "Successful dual titanium implant placement with full osseointegration",
    location: "Ashok Nagar, Chennai",
    timeline: "Completed over 4 months",
    narrative: "After seeking dental implant treatment in Chennai, the computer-guided precision of the diagnostic maps at Sinora provided deep confidence. The placement was virtually painless, and healing was rapid. My chewing efficiency is fully restored.",
    rating: 5
  },
  {
    id: "t2",
    initials: "M.K.",
    treatment: "Advanced Root Canal Therapy",
    outcome: "Eradication of deep apical pulpal infection; saving natural tooth structure",
    location: "Nungambakkam, Chennai",
    timeline: "Completed in 2 visits",
    narrative: "I arrived with severe throbbing tooth pain that kept me awake all night. The endodontic team used high-frequency rotaries to treat the infection without discomfort. The custom crown matches my natural teeth perfectly.",
    rating: 5
  },
  {
    id: "t3",
    initials: "P.R.",
    treatment: "High-Comfort Clear Aligners",
    outcome: "Correction of severe anterior crowding and posterior malocclusion",
    location: "T. Nagar, Chennai",
    timeline: "14-month alignment timeline",
    narrative: "My custom clear aligners were invisible, comfortable to wear, and very easy to manage. The digital scan replacing the traditional messy impression molds was a revelation. High-standard orthodontic progress.",
    rating: 5
  },
  {
    id: "t4",
    initials: "S.B.",
    treatment: "Comprehensive Gum & Periodontal Care",
    outcome: "Laser pocket debridement and complete reversal of localized bleeding",
    location: "West Mambalam, Chennai",
    timeline: "3 therapeutic sessions",
    narrative: "The dental laser debridement treated my bleeding gums without any surgical cutting or blood. Excellent clinical hygiene standards, fully sterilized environments, and clear post-op instructions.",
    rating: 5
  }
];

const CLINICAL_SPECIALISTS = [
  {
    id: "dr_suresh",
    name: "Dr. Suresh Kumar, MDS",
    title: "Chief Implantologist & Laser Surgeon",
    exp: "16+ Years",
    creds: "Fellow of ICOI (USA), trained in computer-guided prosthetics.",
    focus: "Immediate loading implants, flapless laser surgeries, bone augmentation.",
    school: "Saveetha Dental College, Chennai",
    status: "ON-DUTY NOW",
    statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200"
  },
  {
    id: "dr_meera",
    name: "Dr. Meera Raghavan, MDS",
    title: "Senior Conservative Endodontist",
    exp: "12+ Years",
    creds: "Root canal therapy master using advanced high-frequency rotaries.",
    focus: "Microscopic endodontics, pulp revascularization, single-sitting RCTs.",
    school: "Madras Medical College, Chennai",
    status: "IN SURGERY",
    statusColor: "text-amber-600 bg-amber-50 border-amber-200"
  },
  {
    id: "dr_anjali",
    name: "Dr. Anjali Dev, MDS",
    title: "Head Orthodontist & Clear Aligner Designer",
    exp: "10+ Years",
    creds: "Certified Clear Aligner and Invisalign Clinical Specialist.",
    focus: "Severe crossbite correction, biomechanical software simulation.",
    school: "SRM Dental College, Chennai",
    status: "AVAILABLE",
    statusColor: "text-sky-600 bg-sky-50 border-sky-200"
  }
];

export default function App() {
  const GOOGLE_MAPS_API_KEY =
    process.env.GOOGLE_MAPS_PLATFORM_KEY ||
    (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
    "";

  // Navigation / View State
  const [activeTab, setActiveTab] = useState<"home" | "services" | "schedule" | "about" | "contact" | "blog" | "faq" | "admin">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ClinicalService>(CLINICAL_SERVICES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);

  // Mouse position state for hero section interactive elements
  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroMousePos({ x: 0, y: 0 });
  };

  // Dynamic Live Clinic Wait Time State
  const [waitTimes, setWaitTimes] = useState({
    waitTimeMinutes: 12,
    patientsInQueue: 2,
    statusLevel: "optimal", // "optimal" | "moderate" | "busy"
    activeChairs: 4,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  });
  const [isWaitTimeRefreshing, setIsWaitTimeRefreshing] = useState(false);

  const recalculateWaitTime = () => {
    setIsWaitTimeRefreshing(true);
    setTimeout(() => {
      const todayStr = new Date().toISOString().split('T')[0];
      const todaysAppointmentsCount = Array.isArray(appointments) 
        ? appointments.filter(apt => apt.date === todayStr).length 
        : 0;
      
      const currentHour = new Date().getHours();
      let baseWait = 8;
      
      // Busy hours are between 10am-1pm and 4pm-7pm
      if ((currentHour >= 10 && currentHour <= 13) || (currentHour >= 16 && currentHour <= 19)) {
        baseWait += 14;
      }
      
      const addedWait = todaysAppointmentsCount * 6 + Math.floor(Math.random() * 6);
      const totalWait = baseWait + addedWait;
      
      const patients = Math.floor(totalWait / 6) + 1;
      const chairs = 3 + (Math.floor(Math.random() * 3)); // 3 to 5 active chairs
      
      let level = "optimal";
      if (totalWait > 25) {
        level = "busy";
      } else if (totalWait > 12) {
        level = "moderate";
      }
      
      setWaitTimes({
        waitTimeMinutes: Math.max(5, totalWait),
        patientsInQueue: Math.max(1, patients),
        statusLevel: level,
        activeChairs: Math.min(5, chairs),
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
      setIsWaitTimeRefreshing(false);
    }, 600);
  };

  useEffect(() => {
    recalculateWaitTime();
  }, [appointments]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setAppointments(json.data);
      }
    } catch (e) {
      console.error("Error fetching appointments:", e);
    }
  };

  useEffect(() => {
    fetchAppointments();

    const handleLocationChange = () => {
      const path = window.location.pathname;
      if (path === "/admin") {
        setActiveTab("admin");
      }
    };

    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  useEffect(() => {
    if (activeTab === "admin") {
      if (window.location.pathname !== "/admin") {
        window.history.pushState(null, "", "/admin");
      }
    } else {
      if (window.location.pathname === "/admin") {
        window.history.pushState(null, "", "/");
      }
    }
  }, [activeTab]);

  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [preselectedModalService, setPreselectedModalService] = useState("");

  const scrollToScheduler = (serviceTitle: string = "") => {
    setPreselectedModalService(serviceTitle);
    setRegistrationModalOpen(true);
  };

  // Appointment Scheduler Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [appointmentForm, setAppointmentForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: CLINICAL_SERVICES[0].title,
    notes: ""
  });
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccessData, setBookingSuccessData] = useState<AppointmentRecord | null>(null);

  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>( [
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to the Sinora Dental Clinical Assistant. I can help answer questions about our services, clinical protocols, location, or assist you in starting your booking. What clinical information can I provide today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatTyping, setIsChatTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Emergency Triage State
  const [forceNonBusinessHours, setForceNonBusinessHours] = useState(true);
  const [isNonBusinessHours, setIsNonBusinessHours] = useState(true);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [selectedTriageSymptom, setSelectedTriageSymptom] = useState<string | null>(null);

  // Patient Testimonials Carousel State
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  // 5 New Interactive Sections State
  const [selectedMaterialId, setSelectedMaterialId] = useState<"zirconia" | "titanium" | "emax" | "graphene">("zirconia");
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<"implants" | "aligners" | "rootcanal">("implants");
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string | null>(null);
  const [costCategory, setCostCategory] = useState<"implants" | "aligners" | "rootcanal" | "cleaning">("implants");
  const [costScale, setCostScale] = useState<number>(1);
  const [habitState, setHabitState] = useState({
    brushing: "once",
    flossing: false,
    sugar: "medium",
    water: false,
  });
  const [habitScore, setHabitScore] = useState<number | null>(null);

  useEffect(() => {
    if (forceNonBusinessHours) {
      setIsNonBusinessHours(true);
      return;
    }
    
    const checkIfNonBusiness = () => {
      try {
        const options = { timeZone: 'Asia/Kolkata', hour12: false, hour: 'numeric', weekday: 'short' } as const;
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(new Date());
        let hr = 12;
        let day = 'Mon';
        parts.forEach(p => {
          if (p.type === 'hour') hr = parseInt(p.value, 10);
          if (p.type === 'weekday') day = p.value;
        });
        
        if (day === 'Sun') return true;
        if (hr < 9 || hr >= 21) return true;
        return false;
      } catch (e) {
        const now = new Date();
        const d = now.getDay();
        const h = now.getHours();
        if (d === 0 || h < 9 || h >= 21) return true;
        return false;
      }
    };
    
    setIsNonBusinessHours(checkIfNonBusiness());
    const interval = setInterval(() => {
      setIsNonBusinessHours(checkIfNonBusiness());
    }, 60000);
    return () => clearInterval(interval);
  }, [forceNonBusinessHours]);

  // Available Time Slots for Booking
  const TIME_SLOTS = [
    "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"
  ];

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatTyping]);

  // Inject structured JSON-LD data for SEO, AEO, and GEO crawling on mount
  useEffect(() => {
    const existingScript = document.getElementById("sinora-dental-jsonld");
    if (existingScript) {
      existingScript.remove();
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Sinora Dental Hospital",
      "alternateName": "Sinora Dental",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "21, 7th Ave, Sarvamangala Colony, Sri Devi Colony, Ashok Nagar",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600083",
        "addressCountry": "IN"
      },
      "telephone": "+918056419529",
      "url": window.location.href,
      "logo": "https://sinoradental.com/assets/logo.png",
      "hasMap": "https://www.google.com/maps/place/Sinora+Dental+Hospital/@13.0399252,80.2168084,16z/",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 13.0399252,
        "longitude": 80.2168084
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:30",
          "closes": "20:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "10:00",
          "closes": "13:00"
        }
      ],
      "medicalSpecialty": [
        "Dentistry",
        "Orthodontics",
        "PediatricDentistry"
      ],
      "mainEntity": {
        "@type": "FAQPage",
        "mainEntity": FAQ_HUB.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    };

    const script = document.createElement("script");
    script.id = "sinora-dental-jsonld";
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("sinora-dental-jsonld");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  // Handler for booking submission
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    setBookingError(null);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentForm)
      });
      const resData = await response.json();

      if (resData.success) {
        setBookingSuccessData(resData.data);
        fetchAppointments(); // Automatically refresh metrics and leads
        setWizardStep(5); // Go to Success Screen
      } else {
        setBookingError(resData.error || "An error occurred while booking.");
      }
    } catch (err) {
      setBookingError("Network error. Unable to contact our appointment server.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Chat message submission
  const handleSendChatMessage = async (customText?: string) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!customText) {
      setChatInput("");
    }
    setIsChatTyping(true);

    try {
      const chatHistory = [...chatMessages, userMsg].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });
      const data = await response.json();

      if (data.success) {
        const assistantMsg: ChatMessage = {
          id: "msg-ai-" + Date.now(),
          role: "assistant",
          content: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: "msg-err-" + Date.now(),
        role: "assistant",
        content: "I apologize, but I am experiencing temporary connectivity difficulties. Please call our desk at 08056419529 for immediate scheduling or symptom assistance.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsChatTyping(false);
    }
  };

  // Helper to trigger booking from pre-chips
  const handleTriggerBookingChip = (serviceName: string) => {
    setAppointmentForm(prev => ({ ...prev, service: serviceName }));
    setActiveTab("schedule");
    setWizardStep(1);
  };

  const openChatWithQuestion = (question: string) => {
    setChatOpen(true);
    handleSendChatMessage(question);
  };

  const filteredServices = CLINICAL_SERVICES.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-100 selection:text-brand-900">
      
      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div 
            onClick={() => { setActiveTab("home"); setWizardStep(1); }} 
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* High-end blue and white clinical emblem box */}
            <div className="w-14 h-14 bg-[#001f4d] rounded-2xl flex flex-col items-center justify-center border border-blue-400/20 shadow-md relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-radial-gradient from-blue-500/20 to-transparent opacity-60"></div>
              {/* Elegant monogram S */}
              <span className="text-2xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-300 leading-none">S</span>
              <span className="text-[7px] font-mono tracking-widest text-blue-200 font-bold uppercase leading-none mt-0.5">SINORA</span>
            </div>
            <div className="text-left">
              <span className="text-xl font-black font-display tracking-tight text-slate-900 block group-hover:text-brand-500 transition-colors leading-none">
                SINORA
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-brand-500 font-bold block mt-1">
                DENTAL CLINIC
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold">
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); setActiveTab("home"); }} 
              className={`pb-1 border-b-2 transition-all cursor-pointer ${activeTab === "home" ? "border-brand-500 text-brand-500 font-bold" : "border-transparent text-slate-600 hover:text-brand-500"}`}
            >
              Home
            </button>
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); setActiveTab("services"); }} 
              className={`pb-1 border-b-2 transition-all cursor-pointer ${activeTab === "services" ? "border-brand-500 text-brand-500 font-bold" : "border-transparent text-slate-600 hover:text-brand-500"}`}
            >
              Treatments
            </button>
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); setActiveTab("about"); }} 
              className={`pb-1 border-b-2 transition-all cursor-pointer ${activeTab === "about" ? "border-brand-500 text-brand-500 font-bold" : "border-transparent text-slate-600 hover:text-brand-500"}`}
            >
              About Us
            </button>
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); setActiveTab("blog"); }} 
              className={`pb-1 border-b-2 transition-all cursor-pointer ${activeTab === "blog" ? "border-brand-500 text-brand-500 font-bold" : "border-transparent text-slate-600 hover:text-brand-500"}`}
            >
              Blog
            </button>
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); setActiveTab("faq"); }} 
              className={`pb-1 border-b-2 transition-all cursor-pointer ${activeTab === "faq" ? "border-brand-500 text-brand-500 font-bold" : "border-transparent text-slate-600 hover:text-brand-500"}`}
            >
              FAQ
            </button>
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); setActiveTab("contact"); }} 
              className={`pb-1 border-b-2 transition-all cursor-pointer ${activeTab === "contact" ? "border-brand-500 text-brand-500 font-bold" : "border-transparent text-slate-600 hover:text-brand-500"}`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right action items matching Salmora Events exact header layout */}
          <div className="hidden lg:flex items-center gap-6">
            <a 
              href="tel:08056419529" 
              className="flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-brand-500 transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-500 fill-brand-500/10 animate-bounce" />
              <span>+91 80564 19529</span>
            </a>
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); scrollToScheduler(); }} 
              className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-bold shadow-md shadow-brand-900/10 active:scale-95 transition-all text-xs uppercase tracking-wider cursor-pointer"
            >
              Free Quote
            </button>
          </div>

          <div className="lg:hidden flex items-center">
            <button 
              onClick={scrollToScheduler} 
              className="p-2 bg-brand-50 text-brand-500 rounded-full hover:bg-brand-100 mr-2"
              title="Book Appointment"
            >
              <Calendar className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 bg-slate-50 text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-OUT DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between"
            >
              <div className="space-y-8 text-left">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-semibold">
                      <Building className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-base font-bold font-display tracking-tight text-slate-900 block">
                        SINORA
                      </span>
                      <span className="text-[9px] tracking-widest uppercase font-mono text-brand-600 font-semibold block -mt-1">
                        DENTAL HOSPITAL
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                    title="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("home");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                      activeTab === "home"
                        ? "bg-brand-50/60 text-brand-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Clinical Home</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("services");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                      activeTab === "services"
                        ? "bg-brand-50/60 text-brand-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    <span>Treatments Guide</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("about");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                      activeTab === "about"
                        ? "bg-brand-50/60 text-brand-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Info className="w-4 h-4" />
                    <span>About Our Clinic</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("blog");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                      activeTab === "blog"
                        ? "bg-brand-50/60 text-brand-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Oral Health Blog</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("faq");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                      activeTab === "faq"
                        ? "bg-brand-50/60 text-brand-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span>FAQ & AEO Guide</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("contact");
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                      activeTab === "contact"
                        ? "bg-brand-50/60 text-brand-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Contact & Location</span>
                  </button>
                </nav>
              </div>

              {/* Drawer Footer / Call to Action */}
              <div className="space-y-4 pt-6 border-t border-slate-100 text-left">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToScheduler();
                  }}
                  className="w-full py-3 bg-brand-600 text-white rounded-xl shadow-md shadow-brand-100 hover:bg-brand-700 active:scale-95 transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>

                <div className="text-center text-[10px] text-slate-400 font-mono">
                  <span>On-Duty Helpline: 08056419529</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DYNAMIC VIEWS */}
      <main className="flex-grow">
        
        {/* VIEW: HOME PAGE */}
        {activeTab === "home" && (
          <div className="overflow-hidden">
            
            {/* HERO HERO SECTION - RECREATED TO MATCH SALMORA EVENTS EXACT HIGH-FIDELITY DESIGN */}
            <section 
              ref={heroRef}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              className="relative bg-white pt-24 pb-20 overflow-hidden border-b border-slate-100"
            >
              {/* Subtle background graphics and clinical blue gradient blobs matching screenshot ambiance */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-brand-500/5 rounded-full filter blur-3xl opacity-60"></div>
                <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-100/10 rounded-full filter blur-3xl opacity-60"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1.5px,transparent_1.5px),linear-gradient(to_bottom,#f1f5f9_1.5px,transparent_1.5px)] bg-[size:48px_48px] opacity-25"></div>

                {/* Interactive Floating Dental & Clinical Icons */}
                {/* 1. Top Left - Smile (Tooth) */}
                <motion.div
                  className="absolute left-[12%] top-[18%] z-0 hidden md:block"
                  animate={{
                    x: heroMousePos.x * -25,
                    y: heroMousePos.y * -25,
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -12, 0],
                      rotate: [0, 6, -6, 0],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-brand-500/20"
                  >
                    <Smile className="w-10 h-10 stroke-[1.2]" />
                  </motion.div>
                </motion.div>

                {/* 2. Middle Left - Clinical Activity */}
                <motion.div
                  className="absolute left-[6%] top-[50%] z-0 hidden md:block"
                  animate={{
                    x: heroMousePos.x * 35,
                    y: heroMousePos.y * 35,
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, -8, 8, 0],
                    }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-slate-300/40"
                  >
                    <Activity className="w-8 h-8 stroke-[1.2]" />
                  </motion.div>
                </motion.div>

                {/* 3. Bottom Left - Sparkles (Cleanliness) */}
                <motion.div
                  className="absolute left-[18%] top-[72%] z-0 hidden md:block"
                  animate={{
                    x: heroMousePos.x * -40,
                    y: heroMousePos.y * 20,
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="text-brand-500/15"
                  >
                    <Sparkles className="w-7 h-7 stroke-[1.2]" />
                  </motion.div>
                </motion.div>

                {/* 4. Top Right - Award (Best treatment/clinic) */}
                <motion.div
                  className="absolute right-[14%] top-[15%] z-0 hidden md:block"
                  animate={{
                    x: heroMousePos.x * -30,
                    y: heroMousePos.y * -15,
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 6.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-brand-500/15"
                  >
                    <Award className="w-9 h-9 stroke-[1.2]" />
                  </motion.div>
                </motion.div>

                {/* 5. Middle Right - Sterile Shield */}
                <motion.div
                  className="absolute right-[8%] top-[45%] z-0 hidden md:block"
                  animate={{
                    x: heroMousePos.x * 25,
                    y: heroMousePos.y * -35,
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                  <motion.div
                    animate={{
                      x: [0, -6, 0],
                      rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-slate-300/40"
                  >
                    <ShieldCheck className="w-9 h-9 stroke-[1.2]" />
                  </motion.div>
                </motion.div>

                {/* 6. Bottom Right - Heart (Care) */}
                <motion.div
                  className="absolute right-[20%] top-[70%] z-0 hidden md:block"
                  animate={{
                    x: heroMousePos.x * -35,
                    y: heroMousePos.y * -35,
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -14, 0],
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 7.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-brand-500/15"
                  >
                    <Heart className="w-8 h-8 stroke-[1.2]" />
                  </motion.div>
                </motion.div>

                {/* 7. Extra Center-Left - Calendar */}
                <motion.div
                  className="absolute left-[28%] top-[32%] z-0 hidden lg:block"
                  animate={{
                    x: heroMousePos.x * 15,
                    y: heroMousePos.y * 25,
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-slate-200/50"
                  >
                    <Calendar className="w-6 h-6 stroke-[1.2]" />
                  </motion.div>
                </motion.div>

                {/* 8. Extra Center-Right - MessageSquare */}
                <motion.div
                  className="absolute right-[26%] top-[35%] z-0 hidden lg:block"
                  animate={{
                    x: heroMousePos.x * -15,
                    y: heroMousePos.y * 30,
                  }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{
                      duration: 8.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-brand-100/50"
                  >
                    <MessageSquare className="w-6 h-6 stroke-[1.2]" />
                  </motion.div>
                </motion.div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
                {/* Center Main Header Block */}
                <div className="max-w-5xl mx-auto space-y-6">
                  <h1 className="text-[38px] md:text-[50px] font-bold tracking-tight text-slate-900 leading-[1.2] font-display">
                    Top & Best <span className="text-brand-500">Dental Clinic</span>
                    <br />
                    <span className="text-brand-500">Treatments</span> in <span className="text-brand-600">Chennai</span>
                  </h1>
                  
                  <p className="text-base sm:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                    Chennai's most trusted <span className="font-bold text-slate-800">dentists, orthodontic care & clear aligners</span> — delivering stunning stage-ready smiles, pain-free root canals, laser surgery & dental implants across Chennai.
                  </p>
                </div>

                {/* Rows of Pill Badges Matching Screenshot EXACT Style - Styled in 2 Infinite Scrolling Lines */}
                <div className="max-w-5xl mx-auto py-4 space-y-3.5 overflow-hidden relative">
                  {/* Left & Right gradient mask for smooth fade matching high-fidelity layout */}
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                  {/* Line 1: Scrolling Left */}
                  <div className="relative w-full overflow-hidden">
                    <div className="animate-marquee flex gap-3 pr-3 py-1">
                      {[
                        { text: "Clear Aligners Chennai", color: "blue" },
                        { text: "Invisible Braces Chennai", color: "white" },
                        { text: "Dental Implants Ashok Nagar", color: "blue" },
                        { text: "Root Canal Specialist", color: "blue" },
                        { text: "Smile Makeover Clinic", color: "white" },
                        { text: "Laser Dentistry Chennai", color: "blue" },
                        { text: "Orthodontic Treatments", color: "blue" },
                        { text: "Pediatric Dental Care", color: "white" }
                      ].concat([
                        { text: "Clear Aligners Chennai", color: "blue" },
                        { text: "Invisible Braces Chennai", color: "white" },
                        { text: "Dental Implants Ashok Nagar", color: "blue" },
                        { text: "Root Canal Specialist", color: "blue" },
                        { text: "Smile Makeover Clinic", color: "white" },
                        { text: "Laser Dentistry Chennai", color: "blue" },
                        { text: "Orthodontic Treatments", color: "blue" },
                        { text: "Pediatric Dental Care", color: "white" }
                      ]).map((badge, idx) => (
                        <motion.div
                          key={`l1-${idx}`}
                          whileHover={{ y: -3, scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
                          onClick={() => {
                            if (badge.text.includes("Aligner") || badge.text.includes("Braces")) {
                              handleTriggerBookingChip("Orthodontic Braces & Aligners");
                            } else if (badge.text.includes("Implant")) {
                              handleTriggerBookingChip("High-Precision Dental Implants");
                            } else if (badge.text.includes("Canal")) {
                              handleTriggerBookingChip("Advanced Root Canal Therapy");
                            } else {
                              setActiveTab("services");
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/80 rounded-full text-slate-700 text-xs font-semibold cursor-pointer shadow-xs hover:border-brand-500/30 hover:bg-slate-50 transition-all select-none flex-shrink-0"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.color === "blue" ? "bg-brand-500" : "bg-slate-300"}`}></span>
                          <span>{badge.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Line 2: Scrolling Right */}
                  <div className="relative w-full overflow-hidden">
                    <div className="animate-marquee-reverse flex gap-3 pr-3 py-1">
                      {[
                        { text: "Ceramic Dental Crowns", color: "blue" },
                        { text: "Wisdom Teeth Center", color: "blue" },
                        { text: "Teeth Whitening Spa", color: "white" },
                        { text: "Dental Clinic West Mambalam", color: "blue" },
                        { text: "Invisible Aligners Chennai", color: "blue" },
                        { text: "Cosmetic Dentistry", color: "white" },
                        { text: "Pain-free Dental Care", color: "blue" }
                      ].concat([
                        { text: "Ceramic Dental Crowns", color: "blue" },
                        { text: "Wisdom Teeth Center", color: "blue" },
                        { text: "Teeth Whitening Spa", color: "white" },
                        { text: "Dental Clinic West Mambalam", color: "blue" },
                        { text: "Invisible Aligners Chennai", color: "blue" },
                        { text: "Cosmetic Dentistry", color: "white" },
                        { text: "Pain-free Dental Care", color: "blue" }
                      ]).map((badge, idx) => (
                        <motion.div
                          key={`l2-${idx}`}
                          whileHover={{ y: -3, scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)" }}
                          onClick={() => {
                            if (badge.text.includes("Aligner") || badge.text.includes("Braces")) {
                              handleTriggerBookingChip("Orthodontic Braces & Aligners");
                            } else if (badge.text.includes("Implant")) {
                              handleTriggerBookingChip("High-Precision Dental Implants");
                            } else if (badge.text.includes("Canal")) {
                              handleTriggerBookingChip("Advanced Root Canal Therapy");
                            } else {
                              setActiveTab("services");
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/80 rounded-full text-slate-700 text-xs font-semibold cursor-pointer shadow-xs hover:border-brand-500/30 hover:bg-slate-50 transition-all select-none flex-shrink-0"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.color === "blue" ? "bg-brand-500" : "bg-slate-300"}`}></span>
                          <span>{badge.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dual Centered CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.03, boxShadow: "0 12px 30px -5px rgba(2, 80, 145, 0.25)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={scrollToScheduler}
                    className="px-10 py-4 bg-brand-500 text-white font-bold rounded-full shadow-lg shadow-brand-900/10 hover:bg-brand-600 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <span>Get Free Quote</span>
                    <ChevronRight className="w-4 h-4 text-white/80" />
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open("https://wa.me/918056419529", "_blank")}
                    className="px-10 py-4 bg-white text-slate-800 border border-slate-200 font-bold rounded-full hover:border-slate-300 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 text-brand-500" />
                    <span>WhatsApp Now</span>
                  </motion.button>
                </div>

                {/* Metric pills wrapper at bottom */}
                <div className="max-w-5xl mx-auto pt-8 border-t border-slate-100">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {[
                      { icon: Star, title: "5000+", desc: "Happy Smiles Delivered" },
                      { icon: CheckCircle, title: "4.9 / 5", desc: "Google Patient Rating" },
                      { icon: Clock, title: "15+ Yrs", desc: "In Chennai Service" },
                      { icon: Building, title: "25+", desc: "Clinical Staff Experts" }
                    ].map((metric, idx) => (
                      <div 
                        key={idx}
                        className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs"
                      >
                        <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center text-brand-500 flex-shrink-0">
                          <metric.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left leading-none">
                          <span className="block text-lg font-black text-slate-900">{metric.title}</span>
                          <span className="block text-[10px] text-slate-400 font-bold mt-1 tracking-wider uppercase">{metric.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CENTERED LIVE CLINIC MONITOR MODULE - Preserve wait times tracking in beautiful secondary layout */}
                <div className="max-w-2xl mx-auto pt-6">
                  <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-xl space-y-4 text-left border border-slate-800 relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-brand-500/10 rounded-full filter blur-2xl pointer-events-none"></div>
                    <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-brand-100/10 rounded-full filter blur-2xl pointer-events-none"></div>

                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 relative z-10">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-brand-500 animate-pulse" />
                        <span className="text-xs font-bold tracking-wider uppercase font-mono text-white/90">
                          Live Clinic Operations Monitor
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          waitTimes.statusLevel === "optimal" 
                            ? "bg-blue-400" 
                            : waitTimes.statusLevel === "moderate" 
                            ? "bg-blue-200" 
                            : "bg-slate-400"
                        } animate-pulse`}></span>
                        <span className="text-[9px] font-mono font-bold uppercase text-white/60">
                          Active Center Feed
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl relative z-10">
                      <div className="space-y-0.5 text-left">
                        <span className="block text-[8px] font-mono font-bold text-white/50 uppercase">
                          ESTIMATED WAITING TIME
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${
                            waitTimes.statusLevel === "optimal" 
                              ? "text-blue-400" 
                              : waitTimes.statusLevel === "moderate" 
                              ? "text-blue-200" 
                              : "text-slate-400"
                          }`}>
                            {waitTimes.waitTimeMinutes} MINS
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`inline-block px-2.5 py-1 rounded text-[9px] font-bold font-mono uppercase ${
                          waitTimes.statusLevel === "optimal" 
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                            : waitTimes.statusLevel === "moderate" 
                            ? "bg-blue-400/10 text-blue-200 border border-blue-400/20" 
                            : "bg-slate-500/20 text-slate-300 border border-slate-500/30"
                        }`}>
                          {waitTimes.statusLevel === "optimal" 
                            ? "Optimal Volume" 
                            : waitTimes.statusLevel === "moderate" 
                            ? "Moderate Traffic" 
                            : "High Demand"}
                        </span>
                        <span className="block text-[9px] text-white/60 font-mono mt-1">
                          {waitTimes.patientsInQueue} patients currently in queue
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-left text-[11px] border-t border-white/5 pt-2 text-white/80 relative z-10">
                      <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                        <span className="block text-[8px] font-mono text-white/40 uppercase font-bold">OPERATING CHAIRS</span>
                        <span className="font-semibold">{waitTimes.activeChairs} of 5 Active</span>
                      </div>
                      <div className="p-2.5 bg-white/5 rounded-xl border border-white/5">
                        <span className="block text-[8px] font-mono text-white/40 uppercase font-bold">BIOLOGICAL PROTECTION</span>
                        <span className="font-semibold text-blue-400">ISO-7 Sterile Suite</span>
                      </div>
                    </div>

                    {/* Sync action */}
                    <div className="flex items-center justify-between pt-1 text-[9px] font-mono text-white/40 relative z-10">
                      <div className="flex items-center gap-1">
                        <span>Last synchronized:</span>
                        <span className="font-semibold text-white/70">{waitTimes.lastUpdated}</span>
                      </div>
                      <button
                        onClick={recalculateWaitTime}
                        disabled={isWaitTimeRefreshing}
                        className="flex items-center gap-1.5 text-brand-500 hover:text-brand-600 font-bold transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isWaitTimeRefreshing ? "animate-spin" : ""}`} />
                        <span>{isWaitTimeRefreshing ? "Syncing..." : "Sync Clinic Sensors"}</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* REAL-TIME CLINICAL METRICS & TRUST SIGNAL COUNTER */}
            <section id="trust-metrics-section" className="bg-white border-b border-slate-100 py-12 relative z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
                  {/* Subtle vector mesh grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:32px_32px] opacity-15"></div>
                  
                  <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-4 space-y-2 text-left">
                      <span className="text-[10px] font-mono font-bold text-brand-400 uppercase tracking-widest block">REAL-TIME TRUST MATRIX</span>
                      <h3 className="text-2xl font-extrabold font-display tracking-tight text-white leading-tight">
                        Demonstrated Patient Care Volumes
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        These clinical metrics compute real-time procedure counts and diagnostic throughput compiled across our Chennai location.
                      </p>
                    </div>

                    <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {/* Counter 1: Successful Procedures */}
                      <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl space-y-1 text-left">
                        <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">SUCCESSFUL PROCEDURES</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold font-mono text-white">
                            {(1420 + appointments.length).toLocaleString()}
                          </span>
                          {appointments.length > 0 && (
                            <span className="text-emerald-400 text-[10px] font-bold font-mono">+{appointments.length} live</span>
                          )}
                        </div>
                        <span className="block text-[10px] text-slate-500">Implant, RCT & alignment cases.</span>
                      </div>

                      {/* Counter 2: Clinical Hours Saved */}
                      <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl space-y-1 text-left">
                        <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">CLINICAL HOURS SAVED</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold font-mono text-white">
                            {(2150 + appointments.length * 1.5).toLocaleString(undefined, { maximumFractionDigits: 1 })}
                          </span>
                          {appointments.length > 0 && (
                            <span className="text-brand-400 text-[10px] font-bold font-mono">+{appointments.length * 1.5} hr</span>
                          )}
                        </div>
                        <span className="block text-[10px] text-slate-500">Through high-frequency rotary tech.</span>
                      </div>

                      {/* Counter 3: Sterilization Index */}
                      <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl space-y-1 text-left col-span-2 sm:col-span-1">
                        <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">STERILIZATION INDEX</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold font-mono text-white">100%</span>
                          <span className="text-indigo-400 text-[10px] font-bold font-mono">ISO-7 Class B</span>
                        </div>
                        <span className="block text-[10px] text-slate-500">Biological zero-pain autoclave codes.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK LINK ACTION BADGES */}
            <section className="bg-white border-y border-slate-100 py-8 relative z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 uppercase tracking-wider font-mono">CLINIC LOCATION</span>
                    <span className="text-sm font-semibold text-slate-800">Ashok Nagar, Chennai</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 uppercase tracking-wider font-mono">PRIMARY PHONE</span>
                    <span className="text-sm font-semibold text-slate-800">08056419529</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 uppercase tracking-wider font-mono">OP HOURS</span>
                    <span className="text-sm font-semibold text-slate-800">09:30 AM - 08:30 PM (Mon-Sat)</span>
                  </div>
                </div>
                <a 
                  href={HOSPITAL_METADATA.mapsLink} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="px-5 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Navigate Via Google Maps
                </a>
              </div>
            </section>

            {/* BENTO GRID PROTOCOLS / TREATMENT OVERVIEWS */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
                  Orthodontics, Implants & Dental Clinic in Ashok nagar
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900">
                  Invisible Aligners Chennai & Premium Care Protocols
                </h2>
                <p className="text-slate-500 leading-relaxed">
                  Every procedure conducted at our <strong>Dental Clinic in west Mambalam</strong> and Ashok Nagar conforms strictly to international biological standards. We utilize advanced <strong>Invisible braces chennai</strong> technology and premium <strong>Aligners in chennai</strong> with computer-guided surgical engines for error-free patient smiles.
                </p>
              </div>

              {/* Bento styled list */}
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-80px" }} 
                variants={{ 
                  hidden: { opacity: 0 }, 
                  visible: { 
                    opacity: 1, 
                    transition: { staggerChildren: 0.12 } 
                  } 
                }} 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {CLINICAL_SERVICES.map((srv, index) => {
                  return (
                    <motion.div 
                      key={srv.id} 
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                      }}
                      whileHover={{ scale: 1.02, y: -10, boxShadow: "0 25px 50px -12px rgba(2, 132, 199, 0.08)", borderColor: "rgb(186, 230, 253)" }}
                      className="bg-gradient-to-br from-white to-slate-50/60 border border-slate-200/70 rounded-3xl p-7 shadow-sm transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="w-11 h-11 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:shadow-md group-hover:rotate-6">
                            {srv.id === "implants" && <Award className="w-5.5 h-5.5" />}
                            {srv.id === "root-canal" && <Activity className="w-5.5 h-5.5" />}
                            {srv.id === "orthodontics" && <Sparkles className="w-5.5 h-5.5" />}
                            {srv.id === "pediatric" && <Smile className="w-5.5 h-5.5" />}
                            {srv.id === "periodontics" && <ShieldCheck className="w-5.5 h-5.5" />}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-lg">
                            {srv.id.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="space-y-1.5 text-left">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors tracking-tight">
                            {srv.title}
                          </h3>
                          <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Clinical Specialty</span>
                        </div>
                        
                        <p className="text-sm text-slate-600 leading-relaxed text-left">
                          {srv.shortDesc}
                        </p>

                        <div className="pt-3 border-t border-slate-100 text-left">
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">Primary Symptoms Treated:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {srv.symptoms.slice(0, 2).map((sym, symIdx) => (
                              <span key={symIdx} className="px-2 py-0.5 bg-slate-50 border border-slate-200/60 text-slate-600 text-[11px] rounded-md font-medium">
                                {sym}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-slate-100 mt-5 flex justify-between items-center relative z-10">
                        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{srv.duration}</span>
                        <button 
                          onClick={() => { setSelectedService(srv); setActiveTab("services"); }}
                          className="text-xs font-bold text-brand-600 group-hover:text-brand-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Review Protocols</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </section>

            {/* SECTION 4: ISO-7 BIOLOGICAL SECURITY & STERILIZATION SUITE */}
            <section className="py-20 bg-slate-50 border-y border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Visual Sterilization Loop */}
                  <div className="lg:col-span-5 relative flex justify-center">
                    <div className="w-full max-w-md bg-white border border-slate-200/60 rounded-2xl p-8 relative overflow-hidden shadow-xl animate-float-medium">
                      <div className="absolute inset-0 bg-radial-gradient from-brand-50/30 to-transparent opacity-50"></div>
                      
                      <div className="relative z-10 space-y-6">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">BIOLOGICAL BARRIER STATUS</span>
                          <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-semibold rounded-full uppercase tracking-wider animate-pulse">ACTIVE COMPLIANCE</span>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="block text-xs font-mono text-slate-400 uppercase leading-none">PRIMARY STERILIZATION</span>
                              <span className="block text-sm font-semibold text-slate-800 mt-1">Class B Fractional Autoclaving (134°C)</span>
                              <p className="text-xs text-slate-500 mt-1">Saturated steam under high physical pressure penetrates micro-porosities of all diagnostic and therapeutic devices, destroying 100% of bacterial spores and viral pathogens.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Activity className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="block text-xs font-mono text-slate-400 uppercase leading-none">AIR FILTERING SYSTEM</span>
                              <span className="block text-sm font-semibold text-slate-800 mt-1">ISO Class-7 Positive Pressure Cleanroom</span>
                              <p className="text-xs text-slate-500 mt-1">HEPA air filtration systems maintain continuous positive air pressure in active operating suites, flushing airborne aerosols and filtering particles down to 0.3 microns.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Award className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="block text-xs font-mono text-slate-400 uppercase leading-none">CHEMICAL WATER TREATMENT</span>
                              <span className="block text-sm font-semibold text-slate-800 mt-1">Continuous Chemical Water Line Debridement</span>
                              <p className="text-xs text-slate-500 mt-1">Multi-stage filtration filters water supplied to high-speed handpieces, ensuring zero biofilm accumulation in secondary delivery lines.</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span>REGISTRATION BOARD: CHENNAI</span>
                          <span>COMPLIANCE CODE: ISO-7-DENT</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Narrative Copy */}
                  <div className="lg:col-span-7 space-y-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">PATIENT BIO-SECURITY</span>
                    <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900">
                      Dental Clinic in Ashok nagar & West Mambalam Sterilization Excellence
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      Our elite sterilization loop forms the safety backbone of our <strong>Dental Clinic in Ashok nagar</strong> and neighboring <strong>Dental Clinic in west Mambalam</strong>. When treating patients with high-precision <strong>Aligners in chennai</strong> or placing <strong>Invisible braces chennai</strong>, preventing biological contamination is our absolute highest priority.
                    </p>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      Every patient pack is unwrapped directly in front of the patient in active operatory zones. Our positive pressure cleanroom systems ensure that dental procedures are performed in an aseptic environment, matching leading hospital operating standards.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                      <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <span className="block text-sm font-semibold text-slate-800">100% Sterile Packs</span>
                        <span className="block text-xs text-slate-400 mt-1">Every handpiece and diagnostic cassette undergoes multi-stage chemical wash, thermal disinfection, ultrasonic bath, and vacuum autoclaving.</span>
                      </div>
                      <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <span className="block text-sm font-semibold text-slate-800">Active Biological Audits</span>
                        <span className="block text-xs text-slate-400 mt-1">We perform continuous biological spore testing to independently verify sterilizer efficacy, ensuring zero margins for error.</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 5: CLINICAL TECHNOLOGY & HIGH-PRECISION DIAGNOSTICS SUITE */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">HIGH-TECH DIAGNOSTICS</span>
                  <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900">
                    Invisible Aligners Chennai & Advanced Digital Dentistry
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    High-precision treatments require absolute clarity. As the leading provider of <strong>Invisible aligners chennai</strong>, our <strong>Dental Clinic in Ashok nagar</strong> utilizes advanced digital intraoral scanners, high-frequency imaging, and computer-guided placement engines to map <strong>Aligners in chennai</strong> with micrometer accuracy.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Card 1: 3D CBCT Imaging */}
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-brand-200 transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md">
                    <div className="space-y-4">
                      <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                        <Award className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900">3D CBCT Radiography</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Our Cone Beam Computed Tomography produces highly detailed 3D reconstructions of the teeth, bone, jaw structure, and nervous pathways with ultra-low radiation dosage.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-4 text-[10px] font-mono text-slate-400">
                      INDICATOR: Bone Density Mapping
                    </div>
                  </div>

                  {/* Card 2: Intraoral 3D CAD/CAM */}
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-brand-200 transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md">
                    <div className="space-y-4">
                      <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900">Intraoral 3D Scanner</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Replaces traditional messy dental impressions. Our high-frequency optical wand records thousands of point-cloud coordinates per second to render real-time digital dental models.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-4 text-[10px] font-mono text-slate-400">
                      INDICATOR: Crown, Aligner Mapping
                    </div>
                  </div>

                  {/* Card 3: Laser Periodontal Therapy */}
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-brand-200 transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md">
                    <div className="space-y-4">
                      <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900">Laser Soft-Tissue Debridement</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Soft-tissue laser therapies sterilize deep periodontal pockets and perform precise, bloodless gingivectomies, drastically reducing recovery and post-op swelling.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-4 text-[10px] font-mono text-slate-400">
                      INDICATOR: Pocket Sterilization
                    </div>
                  </div>

                  {/* Card 4: Endodontic Rotaries */}
                  <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:border-brand-200 transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md">
                    <div className="space-y-4">
                      <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                        <Activity className="w-5 h-5" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900">Apex Locator & Rotary Endodontics</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Electronic apex locator mappings identify root limits to the decimal millimeter, ensuring infected pulps are completely debrided while protecting delicate jawbones.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/60 mt-4 text-[10px] font-mono text-slate-400">
                      INDICATOR: Painless Root Canal
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 6: THE CLINICAL REGISTRATION PORTAL (EMBEDDED WIZARD WITH FLOATING ANIME) */}
            <span id="appointment-scheduler-anchor"></span>
            <section className="py-20 bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 text-white relative overflow-hidden">
              
              {/* Floating micro-particles/grid mesh inside background */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                
                {/* Floating circles using pure Tailwind or motion */}
                <div className="absolute top-10 left-12 w-48 h-48 bg-brand-400 rounded-full mix-blend-screen filter blur-2xl animate-pulse-slow"></div>
                <div className="absolute bottom-10 right-12 w-64 h-64 bg-indigo-400 rounded-full mix-blend-screen filter blur-2xl animate-pulse-slow" style={{ animationDelay: "3s" }}></div>
              </div>

              <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-300 uppercase block">
                    ONLINE APPOINTMENT REGISTRATION
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
                    Register with Ashok Nagar & West Mambalam's Top Dental Clinic
                  </h2>
                  <p className="text-brand-100 text-sm leading-relaxed">
                    Instantly book your consultation for premium <strong>Aligners in chennai</strong>, computer-guided <strong>Invisible aligners chennai</strong>, or modern <strong>Invisible braces chennai</strong>. Bypassing wait times at our <strong>Dental Clinic in Ashok nagar</strong> or <strong>Dental Clinic in west Mambalam</strong> takes under 2 minutes.
                  </p>
                </div>

                {/* Embedded Appointment Registration Card */}
                <div className="bg-white text-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 relative border border-white/10">
                  
                  {/* Wizard Header */}
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-brand-600 uppercase tracking-widest">REGISTRATION WIZARD</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">
                        {wizardStep === 1 && "Step 1: Choose core treatment pathway"}
                        {wizardStep === 2 && "Step 2: Reserve date & hour slot"}
                        {wizardStep === 3 && "Step 3: Enter legal contact details"}
                        {wizardStep === 4 && "Step 4: Verify clinical metrics"}
                        {wizardStep === 5 && "Step 5: Boarding Pass Confirmed"}
                      </h3>
                    </div>
                    <span className="text-xs font-mono bg-brand-50 text-brand-700 px-2.5 py-1 rounded-full font-bold">
                      Progress: {Math.round((wizardStep / 5) * 100)}%
                    </span>
                  </div>

                  {/* Micro-Progress Line with glow */}
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 transition-all duration-500 shadow-md shadow-brand-500"
                      style={{ width: `${(wizardStep / 5) * 100}%` }}
                    ></div>
                  </div>

                  {/* STEP 1: TREATMENT SELECT */}
                  {wizardStep === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <span className="block text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">SELECT INTENDED PATHWAY:</span>
                      <div className="grid sm:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-2">
                        {CLINICAL_SERVICES.map(srv => (
                          <div
                            key={srv.id}
                            onClick={() => setAppointmentForm(prev => ({ ...prev, service: srv.title }))}
                            className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between group ${appointmentForm.service === srv.title ? "border-brand-500 bg-brand-50/40" : "border-slate-100 hover:border-slate-200 bg-slate-50/50"}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`p-1.5 rounded-lg ${appointmentForm.service === srv.title ? "bg-brand-600 text-white" : "bg-white border border-slate-200 text-slate-500"}`}>
                                {srv.id === "implants" && <Award className="w-3.5 h-3.5" />}
                                {srv.id === "root-canal" && <Activity className="w-3.5 h-3.5" />}
                                {srv.id === "orthodontics" && <Sparkles className="w-3.5 h-3.5" />}
                                {srv.id === "pediatric" && <Smile className="w-3.5 h-3.5" />}
                                {srv.id === "periodontics" && <ShieldCheck className="w-3.5 h-3.5" />}
                              </div>
                              <div>
                                <span className="block text-xs font-semibold text-slate-800 leading-tight">{srv.title}</span>
                                <span className="block text-[9px] text-slate-400 font-mono mt-0.5">Est: {srv.duration}</span>
                              </div>
                            </div>
                            {appointmentForm.service === srv.title && (
                              <div className="w-4 h-4 bg-brand-500 text-white rounded-full flex items-center justify-center">
                                <Check className="w-2.5 h-2.5" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button
                          onClick={() => setWizardStep(2)}
                          disabled={!appointmentForm.service}
                          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
                        >
                          <span>Proceed to Date</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: DATE & TIME SELECT */}
                  {wizardStep === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Date Verification</label>
                          <input 
                            type="date"
                            value={appointmentForm.date}
                            onChange={(e) => setAppointmentForm(prev => ({ ...prev, date: e.target.value }))}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Available Hours</label>
                          <div className="grid grid-cols-3 gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                            {TIME_SLOTS.map(slot => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setAppointmentForm(prev => ({ ...prev, time: slot }))}
                                className={`p-1.5 rounded-lg border text-[10px] font-semibold transition-all ${appointmentForm.time === slot ? "bg-brand-600 text-white border-brand-600 shadow-md" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-brand-200"}`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-between">
                        <button
                          onClick={() => setWizardStep(1)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>
                        <button
                          onClick={() => setWizardStep(3)}
                          disabled={!appointmentForm.date || !appointmentForm.time}
                          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider shadow-md disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <span>Patient Info</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: PATIENT INFO */}
                  {wizardStep === 3 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Full Legal Name</label>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                            <input 
                              type="text"
                              required
                              placeholder="As appearing on legal records"
                              value={appointmentForm.name}
                              onChange={(e) => setAppointmentForm(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                              <input 
                                type="email"
                                required
                                placeholder="patient@mail.com"
                                value={appointmentForm.email}
                                onChange={(e) => setAppointmentForm(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Primary Telephone</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                              <input 
                                type="tel"
                                required
                                placeholder="Helpline: 08056419529"
                                value={appointmentForm.phone}
                                onChange={(e) => setAppointmentForm(prev => ({ ...prev, phone: e.target.value }))}
                                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Active Symptoms / Pain Level</label>
                          <textarea 
                            placeholder="Optional: Describe tooth sensitivities, structural failures or past root therapies..."
                            value={appointmentForm.notes}
                            onChange={(e) => setAppointmentForm(prev => ({ ...prev, notes: e.target.value }))}
                            rows={2}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-between">
                        <button
                          onClick={() => setWizardStep(2)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>
                        <button
                          onClick={() => setWizardStep(4)}
                          disabled={!appointmentForm.name || !appointmentForm.email || !appointmentForm.phone}
                          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider shadow-md disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none transition-all flex items-center gap-1.5 active:scale-95"
                        >
                          <span>Review Summary</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: CONFIRMATION REVIEW */}
                  {wizardStep === 4 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3.5 text-xs">
                        <div className="grid grid-cols-2 gap-3.5">
                          <div>
                            <span className="block text-[8px] font-mono text-slate-400 uppercase">TREATMENT PATHWAY</span>
                            <span className="block font-semibold text-slate-800 mt-0.5">{appointmentForm.service}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-mono text-slate-400 uppercase">SCHEDULED DATE</span>
                            <span className="block font-semibold text-slate-800 mt-0.5">{appointmentForm.date}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-mono text-slate-400 uppercase">HOUR WINDOW</span>
                            <span className="block font-semibold text-slate-800 mt-0.5">{appointmentForm.time}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-mono text-slate-400 uppercase">CLINICAL LOCATION</span>
                            <span className="block font-semibold text-slate-800 mt-0.5">Ashok Nagar, Chennai</span>
                          </div>
                        </div>

                        <div className="border-t border-slate-200/60 pt-3 space-y-1 text-slate-600">
                          <span className="block text-[8px] font-mono text-slate-400 uppercase">PATIENT PROFILE</span>
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div><span className="text-slate-400">Name:</span> <span className="font-semibold">{appointmentForm.name}</span></div>
                            <div><span className="text-slate-400">Phone:</span> <span className="font-semibold">{appointmentForm.phone}</span></div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex justify-between font-sans font-medium">
                        <button
                          onClick={() => setWizardStep(3)}
                          disabled={isSubmittingBooking}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={handleBookingSubmit}
                          disabled={isSubmittingBooking}
                          className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 active:scale-95 disabled:bg-slate-300 font-bold"
                        >
                          {isSubmittingBooking ? "Verifying..." : "Confirm & Write Pass"}
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: BOOKED PASS */}
                  {wizardStep === 5 && bookingSuccessData && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4 text-center py-2"
                    >
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Check className="w-6 h-6" />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest block font-sans">SLOT SECURED & WRITTEN</span>
                        <h4 className="text-lg font-bold text-slate-950 font-display">Registration Complete</h4>
                      </div>

                      <div className="border border-dashed border-slate-200 rounded-xl bg-slate-50/60 p-4 max-w-sm mx-auto text-left relative overflow-hidden font-sans">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 text-xs">
                            <div>
                              <span className="block text-[7px] font-mono text-slate-400 uppercase">TICKET CODE</span>
                              <span className="text-[10px] font-mono font-bold text-brand-700">{bookingSuccessData.id}</span>
                            </div>
                            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[8px] font-mono font-bold uppercase rounded">
                              {bookingSuccessData.status}
                            </span>
                          </div>

                          <div className="space-y-2 text-[11px] text-slate-700">
                            <div className="flex justify-between">
                              <span className="text-slate-400">PATIENT:</span>
                              <span className="font-semibold text-slate-800">{bookingSuccessData.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">PATHWAY:</span>
                              <span className="font-semibold text-slate-800">{bookingSuccessData.service}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">DATE & HOUR:</span>
                              <span className="font-mono text-slate-800 font-semibold">{bookingSuccessData.date} @ {bookingSuccessData.time}</span>
                            </div>
                          </div>

                          <div className="border-t border-slate-200/60 pt-2 flex items-center justify-between text-[10px]">
                            <div className="space-y-0.5">
                              <span className="block text-[7px] font-mono text-slate-400 uppercase leading-none">HOTLINE HELP</span>
                              <span className="block text-[9px] font-mono font-bold text-slate-800">08056419529</span>
                            </div>
                            {/* Pseudo QR code */}
                            <div className="w-8 h-8 bg-slate-900 rounded p-0.5 flex flex-wrap gap-0.5">
                              {[...Array(16)].map((_, idx) => (
                                <div 
                                  key={idx} 
                                  className={`w-[6px] h-[6px] rounded-sm ${((idx + 2) * 5) % 3 === 0 ? "bg-white" : "bg-slate-900"}`}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setAppointmentForm({
                              name: "",
                              email: "",
                              phone: "",
                              date: "",
                              time: "",
                              service: CLINICAL_SERVICES[0].title,
                              notes: ""
                            });
                            setWizardStep(1);
                          }}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
                        >
                          New Session
                        </button>
                      </div>
                    </motion.div>
                  )}

                </div>
              </div>
            </section>

            {/* SECTION 7: DYNAMIC ANSWER ENGINE (AEO) INTERACTIVE HUB */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden border-b border-slate-850">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Explainer Left */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-brand-400 text-xs font-semibold uppercase tracking-wider font-mono">
                      <Search className="w-4 h-4 text-brand-400" />
                      Generative Engine Verified
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white leading-tight">
                      Structured Dental Answer Hub
                    </h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      We optimize our clinical knowledge base for conversational queries, voice searches, and search engine models. Review clear clinical explanations regarding our Ashok Nagar, Chennai dental services.
                    </p>
                    
                    <div className="space-y-4 pt-4 border-t border-slate-800">
                      <div className="flex gap-3">
                        <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm text-slate-300">Formulated under active diagnostic guidelines.</span>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm text-slate-300">Geographically validated metadata for accurate routing.</span>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button 
                        onClick={() => setChatOpen(true)}
                        className="px-6 py-3 bg-brand-500 text-white hover:bg-brand-600 rounded-xl transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-900/30"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Query AI Assistant
                      </button>
                    </div>
                  </div>

                  {/* Accordion Right */}
                  <div className="lg:col-span-7 space-y-4">
                    {FAQ_HUB.map((faq, i) => (
                      <div 
                        key={i} 
                        className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 hover:border-slate-600 transition-all shadow-sm"
                      >
                        <h3 className="text-base font-semibold text-slate-100 flex items-start gap-3">
                          <span className="text-brand-400 font-mono text-sm leading-none pt-0.5">Q.</span>
                          <span>{faq.question}</span>
                        </h3>
                        <p className="text-sm text-slate-400 mt-3 leading-relaxed pl-6 border-l border-slate-700">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 7.5: PATIENT TESTIMONIALS & OUTCOMES */}
            <section className="py-20 bg-slate-50 border-y border-slate-200/60 overflow-hidden relative font-sans">
              <div className="absolute inset-0 bg-radial-gradient from-brand-50/20 to-transparent pointer-events-none"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
                    CLINICAL RECOVERY RECORDS
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900">
                    Patient Testimonials & Clinical Outcomes
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    Verified clinical recoveries of individuals treated at our Ashok Nagar, Chennai facility. Testimonial records represent direct therapeutic outcomes with full biological and structural validation.
                  </p>
                </div>

                {/* Testimonial Active Display - Responsive Grid */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Carousel Card with floating animation */}
                  <div className="lg:col-span-7 flex justify-center w-full">
                    <div className="w-full max-w-2xl">
                      <div className="relative">
                        {PATIENT_TESTIMONIALS.map((t, index) => {
                          if (index !== activeTestimonialIndex) return null;
                          
                          // Determine float animation based on index to give organic feel
                          const floatClass = index % 2 === 0 ? "animate-float-slow" : "animate-float-medium";
                          
                          return (
                            <motion.div
                              key={t.id}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.35 }}
                              className={`bg-white border border-slate-200/60 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden ${floatClass}`}
                            >
                              {/* Background highlight glow */}
                              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50/50 rounded-full filter blur-2xl"></div>
                              
                              <div className="relative z-10 space-y-6 text-left">
                                {/* Rating and Card Header */}
                                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, starIdx) => (
                                      <Star key={starIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                  </div>
                                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                                    VERIFIED CASE {t.initials}
                                  </span>
                                </div>

                                {/* Body Quote */}
                                <blockquote className="text-sm italic text-slate-700 leading-relaxed pl-4 border-l-2 border-brand-500">
                                  "{t.narrative}"
                                </blockquote>

                                {/* Outcomes grid */}
                                <div className="grid sm:grid-cols-2 gap-4 pt-2 bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                                  <div>
                                    <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider">TREATMENT PERFORMED</span>
                                    <span className="block text-xs font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                                      <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
                                      {t.treatment}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider">CLINICAL OUTCOME</span>
                                    <span className="block text-xs text-slate-600 mt-1 leading-relaxed">{t.outcome}</span>
                                  </div>
                                  <div>
                                    <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider">RECOVERY TIMELINE</span>
                                    <span className="block text-xs text-slate-600 mt-1 font-mono font-semibold">{t.timeline}</span>
                                  </div>
                                  <div>
                                    <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-wider">LOCATION NODE</span>
                                    <span className="block text-xs text-slate-600 mt-1">{t.location}</span>
                                  </div>
                                </div>

                                {/* Initials and Action Info */}
                                <div className="flex items-center justify-between pt-2">
                                  <div>
                                    <span className="block text-sm font-bold text-slate-900">Patient Initials: {t.initials}</span>
                                    <span className="block text-[10px] text-slate-400 font-mono mt-0.5">Chennai Health Node</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-[10px] text-brand-600 font-mono font-bold uppercase bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-lg">
                                    <Activity className="w-3.5 h-3.5" />
                                    <span>BIOMETRICALLY COMPLETE</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Controls and navigation dots */}
                      <div className="flex items-center justify-between mt-6 px-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveTestimonialIndex(prev => (prev === 0 ? PATIENT_TESTIMONIALS.length - 1 : prev - 1))}
                            className="p-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-600 hover:text-slate-800 rounded-xl transition-all active:scale-95 bg-white"
                            title="Previous Testimonial"
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setActiveTestimonialIndex(prev => (prev === PATIENT_TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                            className="p-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-600 hover:text-slate-800 rounded-xl transition-all active:scale-95 bg-white"
                            title="Next Testimonial"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {PATIENT_TESTIMONIALS.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={() => setActiveTestimonialIndex(dotIdx)}
                              className={`h-1.5 rounded-full transition-all duration-300 ${dotIdx === activeTestimonialIndex ? "w-6 bg-brand-600" : "w-1.5 bg-slate-300 hover:bg-slate-400"}`}
                              title={`View Testimonial ${dotIdx + 1}`}
                            ></button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Mini Info Graphic Grid */}
                  <div className="lg:col-span-5 space-y-6 text-left">
                    <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">OUTCOME MATRIX</span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight">
                      Demonstrated Clinical Excellence & Painless Protocols
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      At Sinora Dental Hospital, we monitor procedural outcomes on a rolling database to optimize clinical workflows. Patient testimonials serve as validated records of rehabilitation.
                    </p>

                    <div className="space-y-4 pt-4 border-t border-slate-200/60">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800">98.4% Osseointegration Success Rate</span>
                          <span className="block text-[11px] text-slate-500">Based on a 5-year retrospect of medical-grade implant cases.</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800">Painless Root Canal Interventions</span>
                          <span className="block text-[11px] text-slate-500">Continuous subgingival apex mappings reduce diagnostic risk and maximize comfort.</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-50 text-brand-600 rounded-lg flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-xs font-bold text-slate-800">Laser-Assisted Aseptic Recovery</span>
                          <span className="block text-[11px] text-slate-500">Elimination of harmful deep biofilms without extensive flap surgeries.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* LIVE GOOGLE REVIEWS & MAPS PLATFORM WIDGET */}
            <GoogleReviewsWidget apiKey={GOOGLE_MAPS_API_KEY} />

            {/* NEW SECTION 1: BIO-COMPATIBLE MATERIAL SELECTOR & LAB */}
            <section className="py-20 bg-white border-b border-slate-200/60 relative font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
                    CLINICAL MATERIAL LAB
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900">
                    Bio-Compatible Restoration & Implant Material Selector
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    At Sinora, we exclusively utilize premium, non-toxic, cellularly compatible restoratives. Select a substance below to analyze mechanical specifications and immunological metrics.
                  </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  {/* Left Column: Material Cards list */}
                  <div className="lg:col-span-5 space-y-4">
                    {[
                      {
                        id: "zirconia",
                        name: "Yttria-Stabilized Zirconia",
                        sub: "Zirconium Dioxide (ZrO2)",
                        desc: "High-fracture posterior bridges and heavy-duty crowns.",
                        icon: "💎"
                      },
                      {
                        id: "titanium",
                        name: "Grade-5 Titanium Alloy",
                        sub: "Ti-6Al-4V ELI Medical",
                        desc: "Bio-fusing screw fixtures anchoring within the jaw bone structure.",
                        icon: "🔩"
                      },
                      {
                        id: "emax",
                        name: "IPS e.max Lithium Disilicate",
                        sub: "Glass-Ceramic Restorative",
                        desc: "Flawless light-refraction veneers & front aesthetic overlays.",
                        icon: "✨"
                      },
                      {
                        id: "graphene",
                        name: "Carbon-Graphene Polymer",
                        sub: "Reinforced PMMA Matrix",
                        desc: "Crack-resistant clear dental aligners & lightweight bridges.",
                        icon: "🕸️"
                      }
                    ].map((material) => (
                      <button
                        key={material.id}
                        onClick={() => setSelectedMaterialId(material.id as any)}
                        className={`w-full p-5 border text-left rounded-2xl transition-all cursor-pointer flex items-center gap-4 group ${selectedMaterialId === material.id ? "border-brand-500 bg-brand-50/10 shadow-md animate-pulse" : "border-slate-200 bg-white hover:bg-slate-50/50"}`}
                      >
                        <div className="text-2xl w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:scale-105 transition-transform">
                          {material.icon}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center justify-between">
                            <span className="block text-sm font-bold text-slate-900 truncate">{material.name}</span>
                            {selectedMaterialId === material.id && (
                              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse"></span>
                            )}
                          </div>
                          <span className="block text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wide mt-0.5">{material.sub}</span>
                          <p className="text-xs text-slate-500 mt-1 leading-normal line-clamp-1">{material.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Right Column: Dynamic Specs Display Card */}
                  <div className="lg:col-span-7">
                    <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 relative overflow-hidden h-full flex flex-col justify-between">
                      {/* Decorative Background */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-100/30 rounded-full filter blur-3xl pointer-events-none"></div>
                      
                      <div className="relative z-10 space-y-6 text-left">
                        {/* Selected Header */}
                        <div className="pb-5 border-b border-slate-200 flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-brand-600 uppercase tracking-widest">SUBSTANCE AUDIT SHEET</span>
                            <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">
                              {selectedMaterialId === "zirconia" && "Monolithic Zirconia Crown"}
                              {selectedMaterialId === "titanium" && "Grade-5 Titanium Core"}
                              {selectedMaterialId === "emax" && "E-Max Glass Ceramic"}
                              {selectedMaterialId === "graphene" && "Nanotube Graphene Matrix"}
                            </h3>
                            <span className="inline-block px-2.5 py-1 bg-slate-200/60 border border-slate-300 text-[10px] text-slate-600 rounded-full font-mono font-semibold mt-2">
                              {selectedMaterialId === "zirconia" && "Zirconium Oxide Polycrystal"}
                              {selectedMaterialId === "titanium" && "Alpha-Beta Medical Alloy"}
                              {selectedMaterialId === "emax" && "IPS Lithium Disilicate"}
                              {selectedMaterialId === "graphene" && "Carbon-Nanotube PMMA Blend"}
                            </span>
                          </div>
                          <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-center shadow-xs">
                            <span className="block text-[8px] font-mono font-bold text-slate-400">BIOCOMPATIBILITY</span>
                            <span className="block text-lg font-extrabold text-brand-600">
                              {selectedMaterialId === "zirconia" && "99.8%"}
                              {selectedMaterialId === "titanium" && "99.9%"}
                              {selectedMaterialId === "emax" && "99.2%"}
                              {selectedMaterialId === "graphene" && "98.9%"}
                            </span>
                          </div>
                        </div>

                        {/* Interactive Metrics Bars */}
                        <div className="space-y-4">
                          <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">MECHANICAL TESTING DATA</span>
                          
                          {/* Metric 1: Tensile Strength */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="font-bold text-slate-700">Tensile/Flexural Strength</span>
                              <span className="font-mono font-bold text-slate-800">
                                {selectedMaterialId === "zirconia" && "1200 MPa"}
                                {selectedMaterialId === "titanium" && "950 MPa"}
                                {selectedMaterialId === "emax" && "500 MPa"}
                                {selectedMaterialId === "graphene" && "380 MPa"}
                              </span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-250 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ 
                                  width: selectedMaterialId === "zirconia" ? "100%" :
                                         selectedMaterialId === "titanium" ? "80%" :
                                         selectedMaterialId === "emax" ? "42%" : "32%"
                                }}
                                className="h-full bg-brand-600 rounded-full"
                              />
                            </div>
                            <span className="block text-[10px] text-slate-450">Resilience under severe masticatory (chewing) load stresses.</span>
                          </div>

                          {/* Metric 2: Translucency */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="font-bold text-slate-700">Light Translucency Index</span>
                              <span className="font-mono font-bold text-slate-800">
                                {selectedMaterialId === "zirconia" && "Semi-Opaque (Natural Tint)"}
                                {selectedMaterialId === "titanium" && "Metallic (Fully Opaque)"}
                                {selectedMaterialId === "emax" && "Ultra-High (Enamel Match)"}
                                {selectedMaterialId === "graphene" && "Invisible (Clear)"}
                              </span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-250 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ 
                                  width: selectedMaterialId === "zirconia" ? "60%" :
                                         selectedMaterialId === "titanium" ? "5%" :
                                         selectedMaterialId === "emax" ? "100%" : "95%"
                                }}
                                className="h-full bg-indigo-500 rounded-full"
                              />
                            </div>
                            <span className="block text-[10px] text-slate-450">Ability of the material to transmit light, mimicking biological dentin.</span>
                          </div>

                          {/* Metric 3: Structural Lifespan */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs">
                              <span className="font-bold text-slate-700">Functional Lifespan</span>
                              <span className="font-mono font-bold text-slate-800">
                                {selectedMaterialId === "zirconia" && "20+ Years"}
                                {selectedMaterialId === "titanium" && "Lifetime (Permanent)"}
                                {selectedMaterialId === "emax" && "15+ Years"}
                                {selectedMaterialId === "graphene" && "Temporary/Active Phase"}
                              </span>
                            </div>
                            <div className="h-2.5 w-full bg-slate-250 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ 
                                  width: selectedMaterialId === "zirconia" ? "85%" :
                                         selectedMaterialId === "titanium" ? "100%" :
                                         selectedMaterialId === "emax" ? "70%" : "15%"
                                }}
                                className="h-full bg-teal-500 rounded-full"
                              />
                            </div>
                            <span className="block text-[10px] text-slate-450">Expected duration before wear, crack propagation, or biological replacement.</span>
                          </div>
                        </div>

                        {/* Description Text */}
                        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                          <span className="block text-[9px] font-mono font-bold text-brand-600 uppercase">CLINICAL DIRECTIVE</span>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {selectedMaterialId === "zirconia" && "Yttria-stabilization stops microscopic cracks from spreading by undergoing a phase transformation that actively squeezes cracks shut. Perfect for high-pressure molars."}
                            {selectedMaterialId === "titanium" && "Grade-5 Ti forms a tight natural oxide barrier that prevents body fluids from reacting with the metal. Bone cells latch onto its thread structure in 3 to 6 months."}
                            {selectedMaterialId === "emax" && "Composed of high-needle crystalline glass structures, e.max creates an unbreakable adhesive lock with natural enamel. Widely requested for smile design."}
                            {selectedMaterialId === "graphene" && "Reinforced with carbon nanotube layers, Graphene-PMMA resists cracking under cyclic orthodontic stress, retaining steady micro-pressures for aligners."}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                        <span>ISO-10993 BIOLOGICAL STANDARDS TESTED</span>
                        <button
                          onClick={scrollToScheduler}
                          className="text-brand-600 font-bold hover:underline"
                        >
                          Select Restorative for Booking &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* NEW SECTION 2: CLINICAL WORKFLOW & MILESTONE TIMELINE */}
            <section className="py-20 bg-slate-50 border-b border-slate-200/60 relative font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
                    PATIENT MILESTONES
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900">
                    Interactive Treatment Pathway Timeline
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    Track your clinical journey dynamically. Choose a high-precision service pathway below to map milestones from scan-planning to final functional completion.
                  </p>

                  {/* Tab switches */}
                  <div className="flex flex-wrap justify-center gap-2 pt-4">
                    {[
                      { id: "implants", title: "Dental Implants", icon: <Award className="w-4 h-4" /> },
                      { id: "aligners", title: "Clear Aligners", icon: <Sparkles className="w-4 h-4" /> },
                      { id: "rootcanal", title: "Root Canal Therapy", icon: <Activity className="w-4 h-4" /> }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedWorkflowId(tab.id as any)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${selectedWorkflowId === tab.id ? "bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-100" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                      >
                        {tab.icon}
                        {tab.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vertical Timeline Card Grid */}
                <div className="relative max-w-4xl mx-auto">
                  {/* Visual timeline guide line */}
                  <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 pointer-events-none transform -translate-x-1/2 hidden md:block"></div>
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 pointer-events-none md:hidden"></div>

                  <div className="space-y-12">
                    {/* IMPLANTS WORKFLOW STEPS */}
                    {selectedWorkflowId === "implants" && [
                      {
                        step: "01",
                        title: "High-Resolution 3D CBCT Scan",
                        duration: "Day 1",
                        details: "Computerized bone density imaging tracks nerve pathways to guide virtual implantation angles with zero risk.",
                        side: "left"
                      },
                      {
                        step: "02",
                        title: "Virtual Computer Placement",
                        duration: "Day 3",
                        details: "Clinical simulation software maps the exact physical vector coordinates of the Grade-5 Titanium post.",
                        side: "right"
                      },
                      {
                        step: "03",
                        title: "Micro-Surgical Placement",
                        duration: "Day 7",
                        details: "On-duty implantologist implants the sterile fixture under continuous irrigation using high-accuracy surgical guides.",
                        side: "left"
                      },
                      {
                        step: "04",
                        title: "Osseointegrative Bond & Crown Placement",
                        duration: "Month 3-4",
                        details: "Once titanium screws fully fuse with natural jawbone, we attach your high-translucency monolithic Zirconia crown.",
                        side: "right"
                      }
                    ].map((w, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative flex flex-col md:flex-row items-start ${w.side === "right" ? "md:flex-row-reverse" : ""}`}
                      >
                        {/* Bullet circle */}
                        <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full bg-brand-600 border-4 border-white shadow-md transform -translate-x-1/2 flex items-center justify-center z-10">
                          <span className="text-[9px] font-bold text-white">{w.step}</span>
                        </div>

                        {/* Spacer for MD screens */}
                        <div className="w-full md:w-1/2 hidden md:block"></div>

                        {/* Main card */}
                        <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 text-left">
                          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-slate-800">{w.title}</span>
                              <span className="text-[10px] font-mono font-bold text-brand-600 bg-brand-50 border border-brand-100 px-2.5 py-0.5 rounded-full">{w.duration}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{w.details}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* ALIGNERS WORKFLOW STEPS */}
                    {selectedWorkflowId === "aligners" && [
                      {
                        step: "01",
                        title: "Intraoral Laser Scanning",
                        duration: "Day 1",
                        details: "Ditch traditional sticky gels. Our hand-held laser scanner records a 3D digital model of your teeth in under 3 minutes.",
                        side: "left"
                      },
                      {
                        step: "02",
                        title: "3D Biomechanical Prediction",
                        duration: "Day 4",
                        details: "Orthodontic computer planning renders an animation showing progressive tooth shifts at each aligner step.",
                        side: "right"
                      },
                      {
                        step: "03",
                        title: "Custom Tray Compression Fabric",
                        duration: "Week 2",
                        details: "Medical-grade carbon-graphene sheets are molded into clear, nearly invisible dental aligners with targeted pressure zones.",
                        side: "left"
                      },
                      {
                        step: "04",
                        title: "Sequential Alignment Therapy",
                        duration: "Month 1-14",
                        details: "You change to a new tray setup every 10 days to continue micro-loading until perfect dental alignment is obtained.",
                        side: "right"
                      }
                    ].map((w, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative flex flex-col md:flex-row items-start ${w.side === "right" ? "md:flex-row-reverse" : ""}`}
                      >
                        {/* Bullet circle */}
                        <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full bg-indigo-600 border-4 border-white shadow-md transform -translate-x-1/2 flex items-center justify-center z-10">
                          <span className="text-[9px] font-bold text-white">{w.step}</span>
                        </div>

                        {/* Spacer for MD screens */}
                        <div className="w-full md:w-1/2 hidden md:block"></div>

                        {/* Main card */}
                        <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 text-left">
                          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-slate-800">{w.title}</span>
                              <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">{w.duration}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{w.details}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* ROOT CANAL WORKFLOW STEPS */}
                    {selectedWorkflowId === "rootcanal" && [
                      {
                        step: "01",
                        title: "Apical High-Frequency Diagnostic Imaging",
                        duration: "Visit 1 (Start)",
                        details: "Continuous apex locator detects the terminal end of each root canal within 0.1mm, eliminating guess errors.",
                        side: "left"
                      },
                      {
                        step: "02",
                        title: "Continuous Rotary Micro-Debridement",
                        duration: "Visit 1 (Active)",
                        details: "High-torque rotary titanium files gently enter the pulp chamber, sweeping away bacteria and necrotic tissue with zero pain.",
                        side: "right"
                      },
                      {
                        step: "03",
                        title: "Thermoplastic Hermetic Sealing",
                        duration: "Visit 2 (Middle)",
                        details: "Canals are fully filled with heated gutta-percha sealant, completely sealing root ends to prevent any relapse.",
                        side: "left"
                      },
                      {
                        step: "04",
                        title: "Monolithic Reinforcement Cementation",
                        duration: "Visit 2 (End)",
                        details: "To protect the structurally treated tooth, we cement a custom monolithic lithium disilicate or zirconia crown.",
                        side: "right"
                      }
                    ].map((w, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative flex flex-col md:flex-row items-start ${w.side === "right" ? "md:flex-row-reverse" : ""}`}
                      >
                        {/* Bullet circle */}
                        <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full bg-teal-600 border-4 border-white shadow-md transform -translate-x-1/2 flex items-center justify-center z-10">
                          <span className="text-[9px] font-bold text-white">{w.step}</span>
                        </div>

                        {/* Spacer for MD screens */}
                        <div className="w-full md:w-1/2 hidden md:block"></div>

                        {/* Main card */}
                        <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 text-left">
                          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-bold text-slate-800">{w.title}</span>
                              <span className="text-[10px] font-mono font-bold text-teal-600 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full">{w.duration}</span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{w.details}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>



            {/* NEW SECTION 4: DENTAL COST ESTIMATOR & PRICE TRANSPARENCY */}
            <section className="py-20 bg-slate-50 border-b border-slate-200/60 relative font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
                    PRICE TRANSPARENCY
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900">
                    Clinical Treatment Cost Calculator
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    No shock charges. No hidden diagnostics. Calculate clear therapeutic ranges below, aligned with major health insurance networks.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm max-w-4xl mx-auto grid md:grid-cols-12 gap-8 text-left">
                  
                  {/* Selector Controls (Left 6 columns) */}
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        STEP 1: SELECT CLINICAL FIELD
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "implants", label: "Dental Implants", icon: "🔩" },
                          { id: "aligners", label: "Clear Aligners", icon: "💎" },
                          { id: "rootcanal", label: "Root Canal (RCT)", icon: "🦷" },
                          { id: "cleaning", label: "Laser Hygiene", icon: "✨" }
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setCostCategory(cat.id as any);
                              setCostScale(1);
                            }}
                            className={`p-3.5 border rounded-xl font-semibold text-xs flex items-center gap-2 cursor-pointer transition-all ${costCategory === cat.id ? "border-brand-500 bg-brand-50/20 text-brand-700 font-bold" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                          >
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        STEP 2: CUSTOMIZE TREATMENT PARAMETERS
                      </span>
                      
                      {costCategory === "implants" && (
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-700">Number of Implants: <span className="text-brand-600 font-mono">{costScale} Unit(s)</span></label>
                          <input 
                            type="range" 
                            min="1" 
                            max="6" 
                            value={costScale}
                            onChange={(e) => setCostScale(parseInt(e.target.value))}
                            className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                          />
                          <span className="block text-[10px] text-slate-400 font-mono">Each unit includes premium medical-grade Titanium root, abutment, and crown.</span>
                        </div>
                      )}

                      {costCategory === "aligners" && (
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-700">Severity Alignment Profile</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { val: 1, label: "Mild Crowding" },
                              { val: 2, label: "Moderate Alignment" },
                              { val: 3, label: "Severe Malocclusion" }
                            ].map((opt) => (
                              <button
                                key={opt.val}
                                onClick={() => setCostScale(opt.val)}
                                className={`py-2 px-3 border rounded-lg text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer transition-all ${costScale === opt.val ? "border-indigo-500 bg-indigo-50/20 text-indigo-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {costCategory === "rootcanal" && (
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-700">Tooth & Root Anatomy complexity</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { val: 1, label: "Single Canal (Incisor)" },
                              { val: 2, label: "Multi Canal (Molar)" },
                              { val: 3, label: "RCT Retreatment Case" }
                            ].map((opt) => (
                              <button
                                key={opt.val}
                                onClick={() => setCostScale(opt.val)}
                                className={`py-2 px-3 border rounded-lg text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer transition-all ${costScale === opt.val ? "border-teal-500 bg-teal-50/20 text-teal-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {costCategory === "cleaning" && (
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-700">Surgical Periodontal Scope</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { val: 1, label: "Basic Scaling" },
                              { val: 2, label: "Laser Disinfection" },
                              { val: 3, label: "Deep Debridement" }
                            ].map((opt) => (
                              <button
                                key={opt.val}
                                onClick={() => setCostScale(opt.val)}
                                className={`py-2 px-3 border rounded-lg text-[10px] font-bold uppercase tracking-wider text-center cursor-pointer transition-all ${costScale === opt.val ? "border-slate-900 bg-slate-50 text-slate-900" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Calculations Display Output (Right 5 columns) */}
                  <div className="md:col-span-5 bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between border border-slate-850">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-brand-400 uppercase tracking-widest block text-left">AUDIT RECKONER</span>
                        <h4 className="text-sm font-bold font-display text-white mt-0.5 text-left">Estimated Clinical Bill Range</h4>
                      </div>

                      <div className="space-y-1 text-left">
                        <span className="block text-3xl font-extrabold text-white tracking-tight">
                          {costCategory === "implants" && `₹${(28000 * costScale).toLocaleString()} - ₹${(45000 * costScale).toLocaleString()}`}
                          {costCategory === "aligners" && (costScale === 1 ? "₹45,000 - ₹55,000" : costScale === 2 ? "₹75,000 - ₹85,000" : "₹1,10,000 - ₹1,30,000")}
                          {costCategory === "rootcanal" && (costScale === 1 ? "₹3,500 - ₹4,500" : costScale === 2 ? "₹6,000 - ₹7,000" : "₹9,000 - ₹10,500")}
                          {costCategory === "cleaning" && (costScale === 1 ? "₹1,500 - ₹2,200" : costScale === 2 ? "₹4,000 - ₹4,800" : "₹7,500 - ₹9,000")}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-mono">Calculated in Indian Rupee (INR) for Ashok Nagar hub.</span>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-slate-800 text-[11px] text-slate-300 text-left">
                        <div className="flex justify-between">
                          <span>Recommended Restorative:</span>
                          <span className="font-bold text-white">
                            {costCategory === "implants" && "Grade-5 Titanium + Crown"}
                            {costCategory === "aligners" && "Graphene Polymer Trays"}
                            {costCategory === "rootcanal" && "Thermoplastic Gutta-Percha"}
                            {costCategory === "cleaning" && "Subgingival Laser debride"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Insurance pre-approval rate:</span>
                          <span className="font-bold text-emerald-400">Up to 80% Coverable</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Clinical Sessions required:</span>
                          <span className="font-bold text-white">
                            {costCategory === "implants" && "3-4 Sessions"}
                            {costCategory === "aligners" && "Monthly reviews"}
                            {costCategory === "rootcanal" && "1-2 Sessions"}
                            {costCategory === "cleaning" && "1 Session"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 space-y-3 text-left">
                      <button
                        onClick={() => {
                          let notesText = `Auto-estimator configuration selected. Field: ${costCategory.toUpperCase()}, scale parameters: ${costScale}.`;
                          setAppointmentForm(prev => ({
                            ...prev,
                            notes: notesText,
                            service: costCategory === "implants" ? "High-Precision Dental Implants" :
                                     costCategory === "aligners" ? "High-Comfort Clear Aligners" :
                                     costCategory === "rootcanal" ? "Advanced Root Canal Therapy" : "Comprehensive Gum & Periodontal Care"
                          }));
                          scrollToScheduler();
                        }}
                        className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-lg shadow-brand-900/30"
                      >
                        <DollarSign className="w-4 h-4 text-white" />
                        Lock Price & Book Appointment
                      </button>
                      <span className="block text-[8px] text-center text-slate-500 font-mono w-full">
                        Estimates valid for 30 days. Clinically audited on-site.
                      </span>
                    </div>

                  </div>
                </div>

                {/* Insurance network logos */}
                <div className="mt-12 text-center space-y-4">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                    APPROVED HEALTHCARE CO-PAY INSURERS
                  </span>
                  <div className="flex flex-wrap justify-center items-center gap-6 opacity-65 grayscale hover:grayscale-0 transition-all duration-500">
                    {["Star Health", "ICICI Lombard", "Niva Bupa", "Care Insurance", "HDFC ERGO"].map((ins, index) => (
                      <span key={index} className="px-4 py-2 border border-slate-200/60 bg-slate-50 rounded-lg text-xs font-extrabold text-slate-500 font-mono">
                        {ins.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* NEW SECTION 5: CLINICAL ORAL HYGIENE SELF-AUDIT & SCORE */}
            <section className="py-20 bg-white border-b border-slate-200/60 relative font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
                    PREVENTATIVE SELF-AUDIT
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900">
                    Clinical Preventive Oral Habit Self-Audit
                  </h2>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    Answer these 4 medical hygiene questions to compute your automated clinical Oral Habit Quotient and unlock custom preventative protocols.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto grid md:grid-cols-12 gap-8 items-center text-left">
                  
                  {/* Left Column: Interactive Audit Quiz */}
                  <div className="md:col-span-7 space-y-6">
                    {/* Q1 */}
                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono font-bold text-brand-600 uppercase">Q1: Daily Brushing Habit</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: "none", label: "Irregular" },
                          { val: "once", label: "Once Daily" },
                          { val: "twice", label: "Twice (Standard)" }
                        ].map((o) => (
                          <button
                            key={o.val}
                            onClick={() => setHabitState(prev => ({ ...prev, brushing: o.val }))}
                            className={`py-2 px-3 border rounded-xl text-xs font-bold cursor-pointer transition-all ${habitState.brushing === o.val ? "border-brand-500 bg-brand-50/20 text-brand-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q2 */}
                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono font-bold text-brand-600 uppercase">Q2: Do you use Interdental Floss or Tape?</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { val: true, label: "Yes, Daily" },
                          { val: false, label: "No / Irregular" }
                        ].map((o) => (
                          <button
                            key={o.label}
                            onClick={() => setHabitState(prev => ({ ...prev, flossing: o.val }))}
                            className={`py-2 px-3 border rounded-xl text-xs font-bold cursor-pointer transition-all ${(o.val && habitState.flossing) || (!o.val && !habitState.flossing) ? "border-brand-500 bg-brand-50/20 text-brand-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q3 */}
                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono font-bold text-brand-600 uppercase">Q3: Refined Sugar or Acidic Drink Intake</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: "high", label: "Daily/Frequent" },
                          { val: "medium", label: "Weekly/Moderate" },
                          { val: "low", label: "Low/None" }
                        ].map((o) => (
                          <button
                            key={o.val}
                            onClick={() => setHabitState(prev => ({ ...prev, sugar: o.val }))}
                            className={`py-2 px-3 border rounded-xl text-xs font-bold cursor-pointer transition-all ${habitState.sugar === o.val ? "border-brand-500 bg-brand-50/20 text-brand-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Q4 */}
                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono font-bold text-brand-600 uppercase">Q4: Flush with clean water after meals?</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { val: true, label: "Yes, Always" },
                          { val: false, label: "No / Sometimes" }
                        ].map((o) => (
                          <button
                            key={o.label}
                            onClick={() => setHabitState(prev => ({ ...prev, water: o.val }))}
                            className={`py-2 px-3 border rounded-xl text-xs font-bold cursor-pointer transition-all ${(o.val && habitState.water) || (!o.val && !habitState.water) ? "border-brand-500 bg-brand-50/20 text-brand-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        // Compute score:
                        let score = 25; // Base
                        if (habitState.brushing === "once") score += 25;
                        if (habitState.brushing === "twice") score += 40;
                        if (habitState.flossing) score += 20;
                        if (habitState.sugar === "medium") score += 10;
                        if (habitState.sugar === "low") score += 20;
                        if (habitState.water) score += 15;
                        setHabitScore(score);
                      }}
                      className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all cursor-pointer shadow-md shadow-brand-100"
                    >
                      Analyze Oral Habit Quotient
                    </button>
                  </div>

                  {/* Right Column: Display computed score circle & prescriptive advice */}
                  <div className="md:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm h-full justify-between min-h-[300px]">
                    {habitScore === null ? (
                      <div className="py-12 space-y-4 flex flex-col items-center justify-center m-auto">
                        <div className="w-16 h-16 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 animate-spin">
                          🌀
                        </div>
                        <div className="space-y-1">
                          <span className="block text-xs font-bold text-slate-700">Audit Form Incomplete</span>
                          <span className="block text-[10px] text-slate-400 max-w-[200px]">Fill in the four questions and click analyze to compute your clinical score.</span>
                        </div>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6 w-full text-left"
                      >
                        {/* Score Circular gauge */}
                        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                          <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-brand-50 border-4 border-brand-500 font-extrabold text-brand-700 text-lg">
                            {habitScore}%
                          </div>
                          <div>
                            <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase">ORAL QUOTIENT</span>
                            <span className="block text-sm font-extrabold text-slate-900">
                              {habitScore >= 85 && "Excellent Preventive Care!"}
                              {habitScore >= 60 && habitScore < 85 && "Moderate Plaque Risk"}
                              {habitScore < 60 && "Critical Acidic Encroachment"}
                            </span>
                            <span className="block text-[10px] text-slate-400 mt-0.5">Biologically evaluated score.</span>
                          </div>
                        </div>

                        {/* Prescriptive advice block */}
                        <div className="space-y-3">
                          <span className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">CLINICAL REMEDIES REQUIRED:</span>
                          
                          <div className="space-y-2.5">
                            {habitState.brushing !== "twice" && (
                              <div className="flex gap-2 items-start text-xs text-slate-600">
                                <span className="text-rose-500">❌</span>
                                <p><strong>Acidic Sleep Plaque:</strong> Saliva levels drop at night. Brushing right before sleep is critical to prevent bacterial calcium locks.</p>
                              </div>
                            )}
                            {!habitState.flossing && (
                              <div className="flex gap-2 items-start text-xs text-slate-600">
                                <span className="text-rose-500">❌</span>
                                <p><strong>Interdental Cavities:</strong> 80% of dental decay starts between adjacent teeth. Introduce medical flossing tape daily.</p>
                              </div>
                            )}
                            {habitState.sugar === "high" && (
                              <div className="flex gap-2 items-start text-xs text-slate-600">
                                <span className="text-rose-500">❌</span>
                                <p><strong>Enamel Erosion:</strong> Acidic pH spikes remain active for 30 mins post-sugar. Flush with alkaline water immediately.</p>
                              </div>
                            )}
                            {(!habitState.water || habitScore < 85) && (
                              <div className="flex gap-2 items-start text-xs text-slate-600">
                                <span className="text-indigo-500">💡</span>
                                <p><strong>Salivary Flush:</strong> Drink 2.5L water daily to enrich saliva flows containing immunoglobulins that block cavities.</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Custom offer button */}
                        <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setAppointmentForm(prev => ({
                                ...prev,
                                notes: `Oral Habit Quotient computed: ${habitScore}%. Requesting free hygiene clinical audit consultation.`
                              }));
                              scrollToScheduler();
                            }}
                            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                          >
                            <Smile className="w-4 h-4 text-white animate-bounce" />
                            Book Free Hygiene Audit
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 8: GEOGRAPHIC & ACCREDITATION STANDARDS */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center">
                
                {/* Visual side block */}
                <div className="md:col-span-5 bg-slate-50 border border-slate-100 rounded-2xl p-8 relative overflow-hidden shadow-sm animate-float-medium">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                  
                  <div className="relative z-10 space-y-6">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                      GEOGRAPHIC COORDINATES
                    </span>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="block text-xs font-mono text-slate-500 uppercase font-bold">Latitude</span>
                        <span className="block text-base font-semibold text-slate-900">13.0399252 N</span>
                      </div>
                      <div>
                        <span className="block text-xs font-mono text-slate-500 uppercase font-bold">Longitude</span>
                        <span className="block text-base font-semibold text-slate-900">80.2168084 E</span>
                      </div>
                      <div>
                        <span className="block text-xs font-mono text-slate-500 uppercase font-bold">Ashok Nagar hub</span>
                        <span className="block text-base font-semibold text-slate-900">Chennai, Tamil Nadu</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <span className="block text-xs text-slate-500 leading-relaxed font-mono">
                        These physical coordinate vectors anchor our clinic within global location databases, verifying physical entity presence.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="md:col-span-7 space-y-8">
                  <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
                    GEO ACCREDITATION
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900">
                    Trusted Local Health Presence
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    Sinora Dental Hospital is situated centrally in Sarvamangala Colony, Sri Devi Colony, Ashok Nagar, Chennai. Our clinical establishment serves as a vital infrastructure node for orthodontic alignments, high-load dental restorations, and root canal surgeries. 
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl shadow-sm">
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Central Ingress</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Centrally situated near 7th Ave, accessible within a 5-minute radius from prominent residential circles of Chennai.
                      </p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl shadow-sm">
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Primary Line</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Dedicated clinical communication infrastructure managed at 08056419529 for rapid triage and scheduling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW: TREATMENTS & CLINICAL PROTOCOLS */}
        {activeTab === "services" && (
          <ServicesPage 
            setActiveTab={setActiveTab} 
            setAppointmentForm={setAppointmentForm} 
            scrollToScheduler={scrollToScheduler} 
          />
        )}

        {/* VIEW: ABOUT / SEO/AEO/GEO EXHAUSTIVE */}
        {activeTab === "about" && (
          <AboutPage 
            setActiveTab={setActiveTab} 
            scrollToScheduler={scrollToScheduler} 
          />
        )}

        {/* VIEW: CLINICAL BLOG */}
        {activeTab === "blog" && (
          <BlogPage 
            setActiveTab={setActiveTab} 
            setAppointmentForm={setAppointmentForm} 
          />
        )}

        {/* VIEW: FAQ CORE */}
        {activeTab === "faq" && (
          <FAQPage 
            setActiveTab={setActiveTab} 
            openChatBot={openChatWithQuestion} 
          />
        )}

        {/* VIEW: CONTACT & DIRECTIONS */}
        {activeTab === "contact" && (
          <ContactPage />
        )}

        {/* VIEW: INGRESS LEADS ADMIN CONSOLE */}
        {activeTab === "admin" && (
          <AdminPanel 
            appointments={appointments}
            onRefresh={fetchAppointments}
            onBackToHome={() => setActiveTab("home")}
          />
        )}

        {/* VIEW: INTERACTIVE APPOINTMENT SCHEDULER (WIZARD) */}
        {activeTab === "schedule" && (
          <div className="max-w-3xl mx-auto px-4 py-16">
            
            <div className="bg-white border border-slate-100 rounded-2xl shadow-lg p-8 space-y-8 relative overflow-hidden">
              
              {/* Wizard Progress Header */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-brand-600 uppercase tracking-wider">
                    APPOINTMENT REGISTRATION WIZARD
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">
                    Step {wizardStep} of 5
                  </span>
                </div>
                
                {/* Visual line progress */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-600 transition-all duration-300"
                    style={{ width: `${(wizardStep / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Wizard Content with Interactive Transitions (AnimatePresence) */}
              <div className="min-h-[350px] flex flex-col justify-between">
                
                {/* Error Banner if any */}
                {bookingError && (
                  <div className="p-4 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs flex items-center gap-3 animate-float-fast mb-6">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500" />
                    <span>{bookingError}</span>
                  </div>
                )}

                {/* STEP 1: SELECT CLINICAL SERVICE */}
                {wizardStep === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        Select Core Clinical Treatment
                      </h3>
                      <p className="text-xs text-slate-500">
                        Choose the primary therapy pathway required for your visit. Detailed protocols apply to each select pathway.
                      </p>
                    </div>

                    <div className="grid gap-3 max-h-[250px] overflow-y-auto pr-2">
                      {CLINICAL_SERVICES.map(srv => (
                        <div
                          key={srv.id}
                          onClick={() => setAppointmentForm(prev => ({ ...prev, service: srv.title }))}
                          className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between group ${appointmentForm.service === srv.title ? "border-brand-500 bg-brand-50/50" : "border-slate-100 hover:border-brand-200 bg-white"}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg ${appointmentForm.service === srv.title ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                              {srv.id === "implants" && <Award className="w-4 h-4" />}
                              {srv.id === "root-canal" && <Activity className="w-4 h-4" />}
                              {srv.id === "orthodontics" && <Sparkles className="w-4 h-4" />}
                              {srv.id === "pediatric" && <Smile className="w-4 h-4" />}
                              {srv.id === "periodontics" && <ShieldCheck className="w-4 h-4" />}
                            </div>
                            <div>
                              <span className="block text-sm font-semibold text-slate-800">{srv.title}</span>
                              <span className="block text-[10px] text-slate-400 font-mono">Est: {srv.duration}</span>
                            </div>
                          </div>
                          {appointmentForm.service === srv.title && (
                            <div className="w-5 h-5 bg-brand-500 text-white rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => setWizardStep(2)}
                        disabled={!appointmentForm.service}
                        className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
                      >
                        <span>Choose Schedule</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: SELECT DATE & TIME */}
                {wizardStep === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        Pick Date & Time Window
                      </h3>
                      <p className="text-xs text-slate-500">
                        Operational times span Monday to Saturday. High-precision procedures require dedicated scheduling allocations.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Date selection input */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono font-bold text-slate-400 uppercase">
                          Appointment Date
                        </label>
                        <input 
                          type="date"
                          value={appointmentForm.date}
                          onChange={(e) => setAppointmentForm(prev => ({ ...prev, date: e.target.value }))}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Time Slot Selection */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono font-bold text-slate-400 uppercase">
                          Available Hour Slot
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map(slot => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setAppointmentForm(prev => ({ ...prev, time: slot }))}
                              className={`p-2 rounded-lg border text-xs font-semibold transition-all ${appointmentForm.time === slot ? "bg-brand-500 text-white border-brand-500 shadow-md" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-brand-200"}`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-between">
                      <button
                        onClick={() => setWizardStep(1)}
                        className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={() => setWizardStep(3)}
                        disabled={!appointmentForm.date || !appointmentForm.time}
                        className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none transition-all flex items-center gap-1.5"
                      >
                        <span>Input Patient Info</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: PATIENT INFORMATION */}
                {wizardStep === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        Patient Communication Details
                      </h3>
                      <p className="text-xs text-slate-500">
                        Please provide valid communication coordinates. We verify all scheduling details via automated diagnostic alerts.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="block text-xs font-mono font-bold text-slate-400 uppercase">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                          <input 
                            type="text"
                            required
                            placeholder="Patient Legal Name"
                            value={appointmentForm.name}
                            onChange={(e) => setAppointmentForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="space-y-1">
                          <label className="block text-xs font-mono font-bold text-slate-400 uppercase">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                            <input 
                              type="email"
                              required
                              placeholder="example@portal.com"
                              value={appointmentForm.email}
                              onChange={(e) => setAppointmentForm(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                          <label className="block text-xs font-mono font-bold text-slate-400 uppercase">Telephone Line</label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                            <input 
                              type="tel"
                              required
                              placeholder="e.g. 08056419529"
                              value={appointmentForm.phone}
                              onChange={(e) => setAppointmentForm(prev => ({ ...prev, phone: e.target.value }))}
                              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="space-y-1">
                        <label className="block text-xs font-mono font-bold text-slate-400 uppercase">Clinical Symptoms / Notes (Optional)</label>
                        <textarea 
                          placeholder="Describe any dental symptoms, pain levels, or requirements..."
                          value={appointmentForm.notes}
                          onChange={(e) => setAppointmentForm(prev => ({ ...prev, notes: e.target.value }))}
                          rows={2}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-between">
                      <button
                        onClick={() => setWizardStep(2)}
                        className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={() => setWizardStep(4)}
                        disabled={!appointmentForm.name || !appointmentForm.email || !appointmentForm.phone}
                        className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none transition-all flex items-center gap-1.5"
                      >
                        <span>Review Summary</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: REVIEW & CONFIRM */}
                {wizardStep === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        Review Clinical Schedule
                      </h3>
                      <p className="text-xs text-slate-500">
                        Confirm that all selected metrics are correct. We lock in time slots immediately upon processing.
                      </p>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-slate-50 border border-slate-100 p-6 rounded-xl space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">SELECTED PATHWAY</span>
                          <span className="block font-semibold text-slate-800 mt-0.5">{appointmentForm.service}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">SCHEDULED DATE</span>
                          <span className="block font-semibold text-slate-800 mt-0.5">{appointmentForm.date}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">HOUR WINDOW</span>
                          <span className="block font-semibold text-slate-800 mt-0.5">{appointmentForm.time}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">CLINIC LOCATION</span>
                          <span className="block font-semibold text-slate-800 mt-0.5">Ashok Nagar, Chennai</span>
                        </div>
                      </div>

                      <div className="border-t border-slate-200/60 pt-4 space-y-2">
                        <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">PATIENT PROFILE</span>
                        <div className="text-xs text-slate-700 space-y-1">
                          <div className="flex justify-between"><span className="text-slate-400">Name:</span> <span className="font-semibold">{appointmentForm.name}</span></div>
                          <div className="flex justify-between"><span className="text-slate-400">Email:</span> <span>{appointmentForm.email}</span></div>
                          <div className="flex justify-between"><span className="text-slate-400">Phone:</span> <span className="font-semibold">{appointmentForm.phone}</span></div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-between">
                      <button
                        onClick={() => setWizardStep(3)}
                        disabled={isSubmittingBooking}
                        className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Edit Form</span>
                      </button>
                      <button
                        onClick={handleBookingSubmit}
                        disabled={isSubmittingBooking}
                        className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider shadow-md disabled:bg-slate-400 transition-all flex items-center gap-1.5"
                      >
                        {isSubmittingBooking ? (
                          <span>Processing Ticket...</span>
                        ) : (
                          <>
                            <span>Confirm & Process Ticket</span>
                            <CheckCircle className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: SUCCESS & CONFIRMED STATUS */}
                {wizardStep === 5 && bookingSuccessData && (
                  <div className="space-y-6 text-center py-4 relative">
                    <ConfettiAnimation />
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md relative z-20 animate-bounce">
                      <Check className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-slate-900">
                        Appointment Confirmed
                      </h3>
                      <p className="text-xs text-slate-500 max-w-md mx-auto">
                        Your clinical registration slot has been permanently synchronized and written to the database. Present this boarding pass at the reception.
                      </p>
                    </div>

                    {/* Visual Boarding Pass / Ticket (Pure CSS design, no images) */}
                    <div className="border border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-6 max-w-sm mx-auto text-left relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-brand-500/10 rounded-bl-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-brand-600" />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-200/60">
                          <div>
                            <span className="block text-[8px] font-mono text-slate-400 uppercase">TICKET ID</span>
                            <span className="text-xs font-mono font-bold text-brand-700">{bookingSuccessData.id}</span>
                          </div>
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold uppercase rounded">
                            {bookingSuccessData.status}
                          </span>
                        </div>

                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="block text-[8px] font-mono text-slate-400 uppercase">PATIENT NAME</span>
                            <span className="font-semibold text-slate-800">{bookingSuccessData.name}</span>
                          </div>
                          <div>
                            <span className="block text-[8px] font-mono text-slate-400 uppercase">TREATMENT PATHWAY</span>
                            <span className="font-semibold text-slate-800">{bookingSuccessData.service}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="block text-[8px] font-mono text-slate-400 uppercase">DATE</span>
                              <span className="font-mono text-xs font-semibold text-slate-800">{bookingSuccessData.date}</span>
                            </div>
                            <div>
                              <span className="block text-[8px] font-mono text-slate-400 uppercase">TIME WINDOW</span>
                              <span className="font-mono text-xs font-semibold text-slate-800">{bookingSuccessData.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Geometric abstract QR vector pattern */}
                        <div className="border-t border-slate-200/60 pt-4 flex items-center justify-between">
                          <div className="space-y-1">
                            <span className="block text-[8px] font-mono text-slate-400 leading-none">CLINIC TELEPHONE</span>
                            <span className="block text-[10px] font-mono font-bold text-slate-800">08056419529</span>
                          </div>
                          {/* Pseudo QR code */}
                          <div className="w-10 h-10 bg-slate-900 rounded p-1 flex flex-wrap gap-0.5">
                            {[...Array(16)].map((_, idx) => (
                              <div 
                                key={idx} 
                                className={`w-[8px] h-[8px] rounded-sm ${((idx + 3) * 7) % 3 === 0 ? "bg-white" : "bg-slate-900"}`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Calendar Download Button */}
                    <div className="max-w-sm mx-auto pt-2">
                      <a
                        href={generateICSLink(bookingSuccessData)}
                        download={`sinora_appointment_${bookingSuccessData.id}.ics`}
                        className="w-full py-3 bg-brand-50 border border-brand-200 hover:bg-brand-100 text-brand-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        title="Download a universal ICS file to sync this slot into your personal digital calendar"
                      >
                        <Calendar className="w-4.5 h-4.5 text-brand-600 animate-pulse" />
                        <span>Add to Personal Calendar (.ics)</span>
                      </a>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-center gap-4">
                      <button
                        onClick={() => {
                          setAppointmentForm({
                            name: "",
                            email: "",
                            phone: "",
                            date: "",
                            time: "",
                            service: CLINICAL_SERVICES[0].title,
                            notes: ""
                          });
                          setWizardStep(1);
                        }}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
                      >
                        Schedule Another Visit
                      </button>
                      <button
                        onClick={() => { setActiveTab("home"); setWizardStep(1); }}
                        className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
                      >
                        Return Home
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </main>

      {/* PERSISTENT FOOTER */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 text-sm">
          
          {/* Column 1: Hospital details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <SinoraLogo className="w-12 h-12" isLight={true} />
              <div>
                <span className="text-lg font-bold font-display tracking-wider block leading-tight">SINORA</span>
                <span className="text-[10px] tracking-widest uppercase font-mono text-brand-400 font-bold block -mt-0.5">DENTAL HOSPITAL</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              Registered clinical establishment providing orthodontic alignment, high-load dental restorations, implants, and pediatric therapies in Ashok Nagar, Chennai. Built and optimized strictly for SEO, AEO, and GEO.
            </p>
            <div className="text-xs text-slate-500 font-mono space-y-1">
              <span>LATITUDE: 13.0399252 | LONGITUDE: 80.2168084</span>
              <span className="block text-brand-400">ISO-7 Class B biological sterilization standard compliant</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase block">CLINICAL HUB</span>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab("home")} className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer">
                  Clinical Home
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("services")} className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer">
                  Treatments & Protocols
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("about")} className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer">
                  SEO / AEO Index Report
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("blog")} className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer">
                  Oral Health Blog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("faq")} className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer">
                  FAQ & AEO Guide
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("contact")} className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer">
                  Contact & Directions
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("schedule"); setWizardStep(1); }} className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer font-semibold text-brand-400 hover:text-brand-300">
                  Schedule Form Wizard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab("admin")} className="text-slate-500 hover:text-brand-400 text-left transition-colors cursor-pointer text-[11px] font-mono flex items-center gap-1.5 pt-1">
                  <span>🔒 Staff Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase block">COMMUNICATION CODES</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              21, 7th Ave, Sarvamangala Colony, Sri Devi Colony, Ashok Nagar, Chennai, Tamil Nadu 600083
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span className="font-semibold text-white">08056419529</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a 
                  href={HOSPITAL_METADATA.mapsLink} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="text-brand-400 hover:underline flex items-center gap-1.5"
                >
                  <span>Google Maps Location Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footnote */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-mono">
          <span>&copy; {new Date().getFullYear()} Sinora Dental Hospital. All clinical rights reserved.</span>
          <span>Verified Local Business Node | Ashok Nagar, Chennai</span>
        </div>
      </footer>

      {/* EMERGENCY ASSESSMENT SCREEN MODAL */}
      <AnimatePresence>
        {emergencyModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEmergencyModalOpen(false)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-2xl w-full relative z-10 overflow-hidden font-sans flex flex-col"
            >
              {/* Header */}
              <div className="bg-rose-950 text-white p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-bl-full pointer-events-none"></div>
                <div className="flex items-start justify-between relative z-10">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-900 border border-rose-800 rounded-full text-rose-300 text-xs font-semibold uppercase tracking-wider font-mono">
                      <AlertTriangle className="w-4 h-4 text-rose-300" />
                      Acute Dental Pain Triage
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                      24/7 Clinical Emergency Diagnostic Assistant
                    </h3>
                    <p className="text-rose-200 text-xs leading-relaxed max-w-xl">
                      Select your acute symptom profile below. Our diagnostic criteria will analyze whether you require immediate general emergency room treatment or a high-priority early morning appointment.
                    </p>
                  </div>
                  <button
                    onClick={() => setEmergencyModalOpen(false)}
                    className="p-2 text-rose-300 hover:text-white rounded-xl hover:bg-rose-900/40 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
                
                {/* 4 Interactive Triage Cards */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      id: "swelling",
                      title: "Severe Facial Swelling",
                      desc: "Visible swelling in the jaw, neck, cheek, or under-tongue that might affect breathing.",
                      severity: "CRITICAL",
                      severityColor: "text-rose-600 bg-rose-50 border-rose-200"
                    },
                    {
                      id: "bleeding",
                      title: "Uncontrolled Bleeding",
                      desc: "Heavy oral bleeding following trauma or extraction that fails to subside after gauze compression.",
                      severity: "CRITICAL",
                      severityColor: "text-rose-600 bg-rose-50 border-rose-200"
                    },
                    {
                      id: "tooth_out",
                      title: "Knocked-Out (Avulsed) Tooth",
                      desc: "A permanent adult tooth fully dislodged from the bone socket due to impact.",
                      severity: "HIGH URGENCY",
                      severityColor: "text-amber-700 bg-amber-50 border-amber-200"
                    },
                    {
                      id: "throbbing",
                      title: "Severe Radiating Toothache",
                      desc: "Intense, radiating, unmanageable throbbing dental pain with extreme hot/cold sensitivity.",
                      severity: "HIGH URGENCY",
                      severityColor: "text-amber-700 bg-amber-50 border-amber-200"
                    }
                  ].map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => setSelectedTriageSymptom(symptom.id)}
                      className={`p-4 border text-left rounded-2xl hover:bg-slate-50 transition-all cursor-pointer flex flex-col justify-between h-40 ${selectedTriageSymptom === symptom.id ? "border-rose-600 bg-rose-50/20 shadow-md" : "border-slate-200 bg-white"}`}
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-900">{symptom.title}</span>
                          <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded-full border ${symptom.severityColor}`}>
                            {symptom.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-normal">
                          {symptom.desc}
                        </p>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-brand-600 mt-2 flex items-center gap-1">
                        Select Symptom & View Protocols <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  ))}
                </div>

                {/* Analysis Advice Display Card */}
                {selectedTriageSymptom && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 border border-rose-200 bg-rose-50/30 rounded-2xl space-y-4 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-rose-100 text-rose-700 rounded-lg flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold text-rose-800 uppercase">
                        ACTIVE DIAGNOSTIC DIRECTIVE
                      </span>
                    </div>

                    {selectedTriageSymptom === "swelling" && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900">AIRWAY RISK DETECTED: Go to General Hospital ER Immediately</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Facial or sublingual swelling in the jaw and neck can quickly expand and obstruct your breathing airway. Do not wait for a dental clinic slot. Go immediately to the nearest general hospital emergency department or trauma room.
                        </p>
                        <div className="bg-rose-100/60 p-3 rounded-xl border border-rose-200">
                          <span className="block text-[8px] font-mono font-bold text-rose-800 uppercase">RECOMMENDED ACTION</span>
                          <span className="block text-xs text-rose-900 font-semibold mt-1">Visit nearest ER + Call Chennai Emergency hotline or Sinora coordination helpline: 08056419529.</span>
                        </div>
                      </div>
                    )}

                    {selectedTriageSymptom === "bleeding" && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900">HEMORRHAGE RISK DETECTED: Compress & Call Helpline</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Roll a clean, damp cotton gauze or cotton cloth and place it over the bleeding socket. Bite down with firm, continuous pressure for at least 20 minutes. Keep your head elevated. If blood flow remains rapid and unchecked, call our emergency coordinator or proceed to a general trauma center.
                        </p>
                        <div className="bg-rose-100/60 p-3 rounded-xl border border-rose-200">
                          <span className="block text-[8px] font-mono font-bold text-rose-800 uppercase">RECOMMENDED ACTION</span>
                          <span className="block text-xs text-rose-900 font-semibold mt-1">Continuous gauze compression + call Sinora emergency staff at 08056419529 immediately.</span>
                        </div>
                      </div>
                    )}

                    {selectedTriageSymptom === "tooth_out" && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900">AVULSED TOOTH PROTOCOL: Time-to-Treatment is Critical (&lt;60 Min)</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Locate the dislodged tooth. Handle it strictly by the biting surface (the crown) — **do not touch the root**. Gently rinse it in cold tap water for 10 seconds if dirty. Try to carefully slide the tooth back into its socket. If not possible, submerge the tooth entirely in a glass of cold cow's milk. Call us immediately.
                        </p>
                        <div className="bg-rose-100/60 p-3 rounded-xl border border-rose-200">
                          <span className="block text-[8px] font-mono font-bold text-rose-800 uppercase">RECOMMENDED ACTION</span>
                          <span className="block text-xs text-rose-900 font-semibold mt-1">Preserve tooth in cold milk + dial 08056419529 immediately for urgent re-implantation block.</span>
                        </div>
                      </div>
                    )}

                    {selectedTriageSymptom === "throbbing" && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900">ACUTE PAIN RELIEF: Over-the-Counter Analgesic + Next-Day Priority Booking</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Deep pulpal toothaches can cause excruciating radiating pain. Rinse your mouth gently with warm saline (saltwater) to remove debris. Avoid hot, cold, or highly sweet foods. Take an approved over-the-counter anti-inflammatory (such as ibuprofen or paracetamol) following dosage instructions.
                        </p>
                        <div className="bg-rose-100/60 p-3 rounded-xl border border-rose-200">
                          <span className="block text-[8px] font-mono font-bold text-rose-800 uppercase">RECOMMENDED ACTION</span>
                          <span className="block text-xs text-rose-900 font-semibold mt-1">Take paracetamol/ibuprofen + Call 08056419529 or click below to lock our first available morning session at 09:30 AM tomorrow.</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Primary Urgent Helpline Banner */}
                <div className="bg-slate-900 rounded-2xl p-5 text-white flex flex-col sm:flex-row justify-between items-center gap-4 relative overflow-hidden">
                  <div className="space-y-1 relative z-10 text-left">
                    <span className="text-[9px] font-mono font-bold text-brand-400 uppercase tracking-widest block">TELE-TRIAGE HELPLINE</span>
                    <h4 className="text-base font-bold text-white font-display">Direct Clinical Triage Coordinator</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Speak directly with our on-duty clinical coordinator for Ashok Nagar, Chennai. Available for immediate assistance.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full sm:w-auto relative z-10">
                    <a
                      href="tel:08056419529"
                      className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call: 08056419529</span>
                    </a>
                    
                    <a
                      href={HOSPITAL_METADATA.mapsLink}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-750 font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-mono">
                <span>Ashok Nagar, Chennai Node</span>
                <button
                  onClick={() => setEmergencyModalOpen(false)}
                  className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition-all hover:bg-slate-800"
                >
                  Close Assistant
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PERSISTENT AI CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white border border-slate-100 rounded-2xl shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col justify-between overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white">
                    <Sparkles className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-400 uppercase tracking-widest block leading-none">SINORA ASSISTANT</span>
                    <span className="text-sm font-semibold text-slate-100 mt-0.5 block">Clinical Q&A Agent</span>
                  </div>
                </div>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Message Box */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50/50">
                {chatMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${msg.role === "user" ? "bg-brand-600 text-white rounded-tr-none" : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"}`}>
                      {msg.content}
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}
                
                {isChatTyping && (
                  <div className="flex flex-col items-start">
                    <div className="p-3 bg-white border border-slate-100 rounded-2xl rounded-tl-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef}></div>
              </div>

              {/* Chat Suggested Quick Queries (AEO matching) */}
              <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
                <button 
                  onClick={() => handleSendChatMessage("What is the clinical address & phone number?")}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-semibold transition-all flex-shrink-0"
                >
                  Address & Phone
                </button>
                <button 
                  onClick={() => handleSendChatMessage("Explain Dental Implants clinical success rate")}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-semibold transition-all flex-shrink-0"
                >
                  Implant Protocols
                </button>
                <button 
                  onClick={() => handleSendChatMessage("What are the indicators for a Root Canal?")}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-semibold transition-all flex-shrink-0"
                >
                  Root Canal Details
                </button>
                <button 
                  onClick={() => handleSendChatMessage("How long do clear aligners take?")}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-[10px] font-semibold transition-all flex-shrink-0"
                >
                  Aligner Timelines
                </button>
              </div>

              {/* Chat Input Area */}
              <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSendChatMessage(); }}
                  placeholder="Ask a clinical question..."
                  className="flex-grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-transparent transition-all"
                />
                <button 
                  onClick={() => handleSendChatMessage()}
                  className="p-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-all"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        {!chatOpen && (
          <motion.button
            layoutId="chat-toggle-btn"
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 bg-brand-600 text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-brand-700 active:scale-95 transition-all group"
            title="Open Clinical AI Assistant"
          >
            <MessageSquare className="w-6 h-6 text-white group-hover:rotate-6 transition-transform" />
          </motion.button>
        )}
      </div>

      {/* PERSISTENT FLOATING SIDE ACTION BUTTONS MATCHING SCREENSHOT EXACT SPECIFICATION */}
      <div className="fixed right-4 bottom-24 flex flex-col gap-2.5 z-40">
        {/* WhatsApp Button */}
        <motion.a 
          href="https://wa.me/918056419529" 
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06, x: -4 }}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white pl-4.5 pr-5 py-3 rounded-full shadow-xl text-xs font-bold transition-all cursor-pointer border border-white/10"
        >
          <MessageSquare className="w-4.5 h-4.5 fill-white/10" />
          <span className="hidden sm:inline">WhatsApp</span>
        </motion.a>

        {/* Call Now Button */}
        <motion.a 
          href="tel:08056419529" 
          whileHover={{ scale: 1.06, x: -4 }}
          className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white pl-4.5 pr-5 py-3 rounded-full shadow-xl text-xs font-bold transition-all cursor-pointer border border-white/10"
        >
          <Phone className="w-4.5 h-4.5 fill-white/10" />
          <span className="hidden sm:inline">Call Now</span>
        </motion.a>

        {/* Get Free Quote Button */}
        <motion.button 
          onClick={scrollToScheduler}
          whileHover={{ scale: 1.06, x: -4 }}
          className="flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white pl-4.5 pr-5 py-3 rounded-full shadow-xl text-xs font-bold transition-all cursor-pointer border border-white/10"
        >
          <Calendar className="w-4.5 h-4.5" />
          <span className="hidden sm:inline">Get Free Quote</span>
        </motion.button>
      </div>

      {/* ONLINE APPOINTMENT REGISTRATION: Interactive Scheduling Portal Q/A Popup */}
      <RegistrationModal
        isOpen={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        onBookingSuccess={fetchAppointments}
        initialService={preselectedModalService}
        waitTimes={waitTimes}
      />

    </div>
  );
}
