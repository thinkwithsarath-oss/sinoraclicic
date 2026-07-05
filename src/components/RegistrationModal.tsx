import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  AlertCircle, 
  Award, 
  Activity, 
  Sparkles, 
  Smile, 
  ShieldCheck, 
  Info,
  Download,
  CalendarDays,
  FileText,
  Mic,
  MicOff,
  Volume2
} from "lucide-react";
import { generateICSLink } from "../utils/calendar";
import SinoraLogo from "./SinoraLogo";

// Clinical services aligned with HOSPITAL_METADATA and CLINICAL_SERVICES
const PATHWAYS = [
  { id: "implants", title: "High-Precision Dental Implants", duration: "60-90 Mins", desc: "Computer-guided titanium/zirconia screw placements", icon: Award, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
  { id: "root-canal", title: "Advanced Root Canal Therapy", duration: "45-60 Mins", desc: "Bio-ceramic rotary root sealer protocols (98% success)", icon: Activity, color: "text-brand-600 bg-brand-50 border-brand-100" },
  { id: "orthodontics", title: "Modern Braces & Clear Aligners", duration: "45 Mins", desc: "GEO-certified high-frequency digital tooth tracking", icon: Sparkles, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
  { id: "pediatric", title: "Specialized Pediatric Dentistry", duration: "30-45 Mins", desc: "Zero-pain biological care pathways for children", icon: Smile, color: "text-amber-600 bg-amber-50 border-amber-100" },
  { id: "periodontics", title: "Comprehensive Gum & Periodontal Care", duration: "45 Mins", desc: "Deep ultrasonic scaling & ozone laser sanitization", icon: ShieldCheck, color: "text-sky-600 bg-sky-50 border-sky-100" }
];

const TIME_SLOTS = [
  { val: "09:30 AM", label: "09:30 AM", status: "Optimal" },
  { val: "10:30 AM", label: "10:30 AM", status: "Standard" },
  { val: "11:30 AM", label: "11:30 AM", status: "Busy" },
  { val: "02:00 PM", label: "02:00 PM", status: "Fastest" },
  { val: "03:30 PM", label: "03:30 PM", status: "Standard" },
  { val: "05:00 PM", label: "05:00 PM", status: "Optimal" },
  { val: "06:30 PM", label: "06:30 PM", status: "Busy" },
  { val: "07:30 PM", label: "07:30 PM", status: "Fastest" }
];

const PRESET_SYMPTOMS = [
  "Severe Toothache / Pain",
  "Routine Cleaning / Scaling",
  "Implant Consultation",
  "Aligners & Braces Query",
  "Swellings or Gum Bleeding",
  "Second Opinion Clinical Audit"
];

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: () => void;
  initialService?: string;
  waitTimes?: {
    waitTimeMinutes: number;
    patientsInQueue: number;
    statusLevel: string;
    activeChairs: number;
  };
}

export default function RegistrationModal({ 
  isOpen, 
  onClose, 
  onBookingSuccess, 
  initialService = "",
  waitTimes 
}: RegistrationModalProps) {
  const [qaStep, setQaStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    service: initialService || PATHWAYS[1].title,
    notes: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);
  const [acknowledgedTerms, setAcknowledgedTerms] = useState(false);

  // Voice-to-Text / Speech Recognition States
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [recognition, setRecognition] = useState<any>(null);
  const [speechInterim, setSpeechInterim] = useState("");

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }
    try {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-IN"; // English (India) works great for local Chennai / Ashok Nagar accents, also fallback to general English

      rec.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error", event);
        if (event.error === "not-allowed") {
          setErrorMessage("Microphone permission was denied. Please allow microphone access in your browser settings to speak your symptoms.");
        } else if (event.error === "no-speech") {
          console.log("No speech detected.");
        } else {
          setErrorMessage(`Speech recognition issue: ${event.error}. Please try again or type manually.`);
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
        setSpeechInterim("");
      };

      rec.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setFormData(prev => ({
            ...prev,
            notes: prev.notes ? `${prev.notes} ${finalTranscript.trim()}` : finalTranscript.trim()
          }));
        }
        setSpeechInterim(interimTranscript);
      };

      setRecognition(rec);
    } catch (err) {
      console.error("Error creating SpeechRecognition", err);
      setSpeechSupported(false);
    }
  }, []);

  // Make sure we stop recognition if step changes or modal closes
  useEffect(() => {
    if (recognition && isListening) {
      try {
        recognition.stop();
      } catch (e) {}
    }
  }, [qaStep, isOpen]);

  const toggleListening = () => {
    if (!recognition) {
      setErrorMessage("Speech recognition is not supported in this browser. Please use Chrome, Edge or Safari.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      setErrorMessage(null);
      setSpeechInterim("");
      try {
        recognition.start();
      } catch (e) {
        console.error("Failed to start speech recognition", e);
        try {
          recognition.stop();
        } catch (stopErr) {}
      }
    }
  };

  // Sync initial service if modal is opened with a specific treatment preselected
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  // Clean form when modal closes or opens
  useEffect(() => {
    if (isOpen) {
      setQaStep(1);
      setSuccessData(null);
      setErrorMessage(null);
      setAcknowledgedTerms(false);
      if (!initialService) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          service: PATHWAYS[1].title,
          notes: ""
        });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (qaStep === 1 && !formData.service) return;
    if (qaStep === 2 && (!formData.date || !formData.time)) return;
    if (qaStep === 3 && !formData.name.trim()) return;
    if (qaStep === 4 && (!formData.email.trim() || !formData.phone.trim())) return;
    
    setQaStep(prev => prev + 1);
    setErrorMessage(null);
  };

  const handlePrevStep = () => {
    setQaStep(prev => Math.max(1, prev - 1));
    setErrorMessage(null);
  };

  const handleSelectPreset = (preset: string) => {
    setFormData(prev => ({
      ...prev,
      notes: prev.notes ? `${prev.notes}. ${preset}` : preset
    }));
  };

  const handleRegistrationSubmit = async () => {
    if (!acknowledgedTerms) {
      setErrorMessage("Please acknowledge the clinical registration guidelines to lock your ticket.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (data.success) {
        setSuccessData(data.data);
        onBookingSuccess(); // Parent notification to fetch lists
        setQaStep(6); // Success Step
      } else {
        setErrorMessage(data.error || "An error occurred during registration. Please try again.");
      }
    } catch (e) {
      setErrorMessage("Network error. Unable to establish connection to Sinora servers.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to compute overall progress percent
  const progressPercent = Math.min(100, Math.floor((qaStep / 5) * 100));

  return (
    <div id="online-appointment-modal" className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col relative max-h-[90vh] sm:max-h-none"
      >
        {/* TOP BRAND HEADER */}
        <div className="bg-slate-950 px-6 py-4 flex items-center justify-between relative border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <SinoraLogo className="w-8 h-8" />
            <div>
              <span className="text-white font-extrabold text-sm font-display tracking-wider block">
                SINORA DENTAL HOSPITAL
              </span>
              <span className="text-[9px] text-brand-400 font-mono tracking-widest font-bold block uppercase -mt-0.5">
                Interactive Scheduling Portal
              </span>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close scheduler"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* METRIC SENSOR BAR */}
        {waitTimes && qaStep < 6 && (
          <div className="bg-slate-50 border-b border-slate-100 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-600 animate-pulse" />
              <span>Live Queue Wait:</span>
              <span className={`font-bold ${waitTimes.statusLevel === "optimal" ? "text-emerald-600" : waitTimes.statusLevel === "moderate" ? "text-amber-600" : "text-rose-600"}`}>
                {waitTimes.waitTimeMinutes} MINS
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>Patients Waiting: <strong className="text-slate-800">{waitTimes.patientsInQueue}</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span>Specialist Chairs: <strong className="text-slate-800">{waitTimes.activeChairs} of 5 Active</strong></span>
            </div>
          </div>
        )}

        {/* LINEAR PROGRESS */}
        {qaStep <= 5 && (
          <div className="w-full h-1.5 bg-slate-100 relative">
            <div 
              className="absolute left-0 top-0 h-full bg-brand-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* MODAL MAIN CONTENT */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 max-h-[60vh] sm:max-h-[500px]">
          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-800 text-xs mb-6 animate-pulse">
              <AlertCircle className="w-4.5 h-4.5 text-rose-500 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={qaStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
            >
              {/* Q1: SELECT PATHWAY */}
              {qaStep === 1 && (
                <div className="space-y-5 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-brand-600 uppercase tracking-widest block">QUESTION 1 OF 5</span>
                    <h3 className="text-lg sm:text-xl font-extrabold font-display text-slate-900 leading-snug">
                      Which clinical pathway or treatment requires our specialists' care today?
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      All procedures are fully bio-certified and adhere to ISO-7 class-B sterilization indexes.
                    </p>
                  </div>

                  <div className="grid gap-3 pt-2">
                    {PATHWAYS.map(p => {
                      const IconComponent = p.icon;
                      const isSelected = formData.service === p.title;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setFormData(prev => ({ ...prev, service: p.title }))}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between group ${
                            isSelected 
                              ? "border-brand-500 bg-brand-50/40 shadow-sm" 
                              : "border-slate-150 bg-white hover:border-brand-200"
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`p-2 rounded-xl border ${p.color}`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5">
                              <span className="block text-sm font-bold text-slate-800 leading-tight group-hover:text-brand-700 transition-colors">
                                {p.title}
                              </span>
                              <span className="block text-xs text-slate-400 font-mono">
                                {p.desc} • Est: {p.duration}
                              </span>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected 
                              ? "bg-brand-600 border-brand-600 text-white" 
                              : "border-slate-300 bg-white group-hover:border-brand-400"
                          }`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Q2: DATE & TIME SELECTOR */}
              {qaStep === 2 && (
                <div className="space-y-5 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-brand-600 uppercase tracking-widest block">QUESTION 2 OF 5</span>
                    <h3 className="text-lg sm:text-xl font-extrabold font-display text-slate-900 leading-snug">
                      When would you like to schedule your clinical session?
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      We prioritize high-precision procedures with computer-aided planning to respect your timeline.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 pt-2">
                    {/* Date Picker Card */}
                    <div className="space-y-2 bg-slate-50/50 p-4 border border-slate-100 rounded-2xl">
                      <div className="flex items-center gap-2 text-slate-700 font-bold text-xs font-mono uppercase tracking-wider mb-1">
                        <CalendarDays className="w-4 h-4 text-brand-600" />
                        <span>Select Date</span>
                      </div>
                      <input 
                        type="date"
                        value={formData.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent font-medium shadow-sm"
                      />
                      <span className="block text-[10px] text-slate-400 italic">
                        * Sunday half-day (10am - 1pm) triage applies.
                      </span>
                    </div>

                    {/* Time Picker Card */}
                    <div className="space-y-2 bg-slate-50/50 p-4 border border-slate-100 rounded-2xl">
                      <div className="flex items-center gap-2 text-slate-700 font-bold text-xs font-mono uppercase tracking-wider mb-2">
                        <Clock className="w-4 h-4 text-brand-600" />
                        <span>Select Time Slot</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 max-h-[170px] overflow-y-auto pr-1">
                        {TIME_SLOTS.map(t => {
                          const isSelected = formData.time === t.val;
                          return (
                            <button
                              key={t.val}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, time: t.val }))}
                              className={`p-2 rounded-xl border text-left transition-all ${
                                isSelected 
                                  ? "bg-slate-900 border-slate-900 text-white shadow-md" 
                                  : "bg-white border-slate-200 text-slate-700 hover:border-brand-300 hover:bg-slate-50"
                              }`}
                            >
                              <span className="block text-xs font-bold leading-none">{t.label}</span>
                              <span className={`block text-[8px] font-mono uppercase mt-1 ${isSelected ? "text-brand-300" : "text-slate-400"}`}>
                                {t.status}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Q3: PATIENT FULL NAME */}
              {qaStep === 3 && (
                <div className="space-y-5 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-brand-600 uppercase tracking-widest block">QUESTION 3 OF 5</span>
                    <h3 className="text-lg sm:text-xl font-extrabold font-display text-slate-900 leading-snug">
                      What is the patient's full legal name?
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      We require legal names to match state-recognized identity credentials for prescriptions and clinical records.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                      <input 
                        type="text"
                        placeholder="e.g. Sarath Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white focus:border-transparent transition-all shadow-inner text-slate-900"
                        autoFocus
                      />
                    </div>

                    <div className="bg-brand-50/50 border border-brand-100 rounded-xl p-4 flex gap-3 text-brand-800 text-xs">
                      <Info className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed font-medium">
                        Patient safety guidelines require a unique medical ID (UMID) to be mapped to this patient profile. Ensure correct spelling.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Q4: CONTACT INFO */}
              {qaStep === 4 && (
                <div className="space-y-5 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-brand-600 uppercase tracking-widest block">QUESTION 4 OF 5</span>
                    <h3 className="text-lg sm:text-xl font-extrabold font-display text-slate-900 leading-snug">
                      How should our hospital staff coordinate with you?
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Communication vectors are guarded securely under HIPAA and clinical confidentiality standards.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    {/* Email Input */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                        <input 
                          type="email"
                          placeholder="sarath@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-slate-900 font-medium"
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Telephone Line</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                        <input 
                          type="tel"
                          placeholder="e.g. +91 80564 19529"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-slate-900 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <span className="block text-[10px] text-slate-400 italic text-center leading-relaxed">
                    * Automated slot lock confirmations and GPS direction links will be pushed here.
                  </span>
                </div>
              )}

              {/* Q5: SYMPTOMS / NOTES */}
              {qaStep === 5 && (
                <div className="space-y-5 text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-brand-600 uppercase tracking-widest block">QUESTION 5 OF 5</span>
                    <h3 className="text-lg sm:text-xl font-extrabold font-display text-slate-900 leading-snug">
                      Are there specific dental symptoms or pain levels we should note?
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      You can select common symptoms from the quick-tag cloud below to append details immediately.
                    </p>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    {/* Presets */}
                    <div className="flex flex-wrap gap-2">
                      {PRESET_SYMPTOMS.map(preset => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleSelectPreset(preset)}
                          className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-600 text-xs font-semibold transition-all cursor-pointer"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>

                    {/* Textarea & Voice-to-Text Section */}
                    <div className="space-y-3">
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                        <textarea
                          rows={4}
                          placeholder={
                            isListening 
                              ? "Listening to your voice... Speak clearly now." 
                              : "Optional: Describe tooth location, pain level from 1-10, or aesthetic goals..."
                          }
                          value={formData.notes}
                          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                          className={`w-full pl-11 pr-12 py-3 bg-slate-50 border ${
                            isListening ? "border-brand-500 bg-brand-50/10 ring-2 ring-brand-500/20" : "border-slate-200"
                          } rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all resize-none text-slate-900`}
                        />

                        {/* Speech Microphone trigger button situated beautifully inside the input area */}
                        {speechSupported && (
                          <button
                            type="button"
                            onClick={toggleListening}
                            title={isListening ? "Stop listening" : "Speak instead of typing"}
                            className={`absolute right-3.5 bottom-3.5 p-2 rounded-xl border transition-all cursor-pointer ${
                              isListening 
                                ? "bg-rose-500 border-rose-600 text-white shadow-lg shadow-rose-500/30 animate-pulse" 
                                : "bg-white border-slate-200 hover:border-brand-400 hover:bg-brand-50 text-slate-600 hover:text-brand-600"
                            }`}
                          >
                            {isListening ? (
                              <MicOff className="w-4 h-4 animate-bounce" />
                            ) : (
                              <Mic className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Speech Status Indicator with Interim Feedback */}
                      {speechSupported && (
                        <div className={`p-3.5 rounded-2xl border transition-all flex flex-col gap-2 ${
                          isListening 
                            ? "bg-brand-50/50 border-brand-200 shadow-inner" 
                            : "bg-slate-50 border-slate-100"
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2.5 h-2.5 rounded-full ${isListening ? "bg-rose-500 animate-ping" : "bg-slate-400"}`} />
                              <span className="text-[10px] font-mono font-bold uppercase text-slate-500">
                                {isListening ? "Live Audio Transcriber Active" : "Voice Assist Offline"}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={toggleListening}
                              className={`text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                                isListening ? "text-rose-600 hover:text-rose-700 font-bold" : "text-brand-600 hover:text-brand-700 font-bold"
                              }`}
                            >
                              <span>{isListening ? "Tap to Finish" : "Tap to Speak (Mic)"}</span>
                            </button>
                          </div>

                          {/* Sound wave simulation */}
                          {isListening && (
                            <div className="flex items-center gap-1 h-3.5 py-1">
                              <span className="w-0.5 h-full bg-brand-500 rounded-full animate-[pulse_0.6s_infinite_alternate]"></span>
                              <span className="w-0.5 h-3/4 bg-brand-500 rounded-full animate-[pulse_0.5s_infinite_alternate_0.1s]"></span>
                              <span className="w-0.5 h-1/2 bg-brand-500 rounded-full animate-[pulse_0.7s_infinite_alternate_0.2s]"></span>
                              <span className="w-0.5 h-full bg-brand-500 rounded-full animate-[pulse_0.6s_infinite_alternate_0.3s]"></span>
                              <span className="w-0.5 h-2/3 bg-brand-500 rounded-full animate-[pulse_0.5s_infinite_alternate_0.4s]"></span>
                              <span className="w-0.5 h-full bg-brand-500 rounded-full animate-[pulse_0.8s_infinite_alternate_0.5s]"></span>
                            </div>
                          )}

                          {isListening && speechInterim ? (
                            <p className="text-xs text-brand-700 italic font-medium leading-normal animate-pulse bg-brand-50 p-2 rounded-xl border border-brand-100">
                              "{speechInterim}..."
                            </p>
                          ) : (
                            <p className="text-[11px] text-slate-400 leading-normal">
                              {isListening 
                                ? "Speak your symptoms clearly. The transcriber will stream them straight into the notes area." 
                                : "Prefer speaking? Click the microphone button to dictate your clinical symptoms."
                              }
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Summary Matrix for user review */}
                    <div className="border border-slate-100 bg-slate-50 p-4 rounded-2xl space-y-3 mt-4">
                      <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">CONFIDENTIALITY GUARANTEE</span>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        By registering, this device session coordinates details directly into our local Ashok Nagar clinical system. All fields are kept secure in accordance with clinical guidelines.
                      </p>

                      <div className="pt-2 border-t border-slate-200 flex items-start gap-3">
                        <input 
                          type="checkbox" 
                          id="ack-terms" 
                          checked={acknowledgedTerms}
                          onChange={(e) => setAcknowledgedTerms(e.target.checked)}
                          className="mt-1 h-4 w-4 text-brand-600 focus:ring-brand-500 border-slate-300 rounded cursor-pointer"
                        />
                        <label htmlFor="ack-terms" className="text-xs font-medium text-slate-700 leading-normal select-none cursor-pointer">
                          I verify these details are correct and authorize Sinora Dental to lock in my digital appointment ticket.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: REGISTRATION SUCCESS */}
              {qaStep === 6 && successData && (
                <div className="text-center space-y-6 py-6">
                  {/* Glowing success seal */}
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase">
                      REGISTRATION CONFIRMED
                    </span>
                    <h3 className="text-2xl font-black font-display text-slate-900 tracking-tight">
                      Your Time Slot is Locked!
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-slate-800">{successData.name}</strong>. Your clinical request has bypassed the wait queue and is routed to our Ashok Nagar hub.
                    </p>
                  </div>

                  {/* High-visibility Ticket Details card */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 max-w-md mx-auto text-left grid grid-cols-2 gap-4 text-xs shadow-sm">
                    <div>
                      <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest">TICKET ID</span>
                      <strong className="text-slate-800 text-sm font-mono">SIN-{successData.id?.slice(0, 8).toUpperCase() || "OK"}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest">CLINICAL PATHWAY</span>
                      <strong className="text-slate-800 leading-tight block">{successData.service}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest">VISIT DATE</span>
                      <strong className="text-slate-800">{successData.date}</strong>
                    </div>
                    <div>
                      <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest">APPOINTMENT HOUR</span>
                      <strong className="text-slate-800">{successData.time}</strong>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="max-w-md mx-auto space-y-3 pt-2">
                    {/* Add to calendar button */}
                    <a
                      href={generateICSLink(successData)}
                      download={`sinora_appointment_${successData.id}.ics`}
                      className="w-full py-3 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Calendar className="w-4 h-4 text-brand-600 animate-pulse" />
                      <span>Sync to Personal Calendar (.ics)</span>
                    </a>

                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                    >
                      Return to Website
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM NAVIGATION FOOTER */}
        {qaStep <= 5 && (
          <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between">
            {qaStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                Welcome to Sinora
              </span>
            )}

            {qaStep < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
                disabled={
                  (qaStep === 1 && !formData.service) ||
                  (qaStep === 2 && (!formData.date || !formData.time)) ||
                  (qaStep === 3 && !formData.name.trim()) ||
                  (qaStep === 4 && (!formData.email.trim() || !formData.phone.trim()))
                }
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRegistrationSubmit}
                disabled={isSubmitting || !acknowledgedTerms}
                className="px-6 py-2.5 bg-slate-950 hover:bg-slate-900 text-brand-300 hover:text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-brand-400 border-t-transparent rounded-full animate-spin"></span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Slot Registration</span>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
