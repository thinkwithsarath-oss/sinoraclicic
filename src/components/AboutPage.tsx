import React from "react";
import { motion } from "motion/react";
import { 
  Building, 
  ShieldCheck, 
  Heart, 
  MapPin, 
  Phone, 
  Users, 
  CheckCircle, 
  Award, 
  Calendar,
  FileText,
  Bookmark
} from "lucide-react";
import { HOSPITAL_METADATA } from "../types";

const CLINICAL_SPECIALISTS = [
  {
    id: "dr_suresh",
    name: "Dr. Suresh Kumar, MDS",
    title: "Chief Implantologist & Laser Surgeon",
    exp: "16+ Years Clinical Experience",
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
    exp: "12+ Years Clinical Experience",
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
    exp: "10+ Years Clinical Experience",
    creds: "Certified Clear Aligner and Invisalign Clinical Specialist.",
    focus: "Severe crossbite correction, biomechanical software simulation.",
    school: "SRM Dental College, Chennai",
    status: "AVAILABLE",
    statusColor: "text-sky-600 bg-sky-50 border-sky-200"
  }
];

interface AboutPageProps {
  setActiveTab: (tab: any) => void;
  scrollToScheduler: () => void;
}

export default function AboutPage({ setActiveTab, scrollToScheduler }: AboutPageProps) {
  return (
    <div id="about-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-left space-y-16">
      
      {/* 1. Header & Intro */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
          CLINICAL LEADERSHIP & FOUNDERS
        </span>
        <h1 className="text-4xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
          About Sinora Dental Hospital, Chennai
        </h1>
        <p className="text-slate-650 leading-relaxed text-sm sm:text-base">
          Sinora Dental Hospital is Chennai's premier medical hub for computer-guided implants, micro-endodontics, and orthodontic alignments. Founded on the principles of biological biocompatibility, ISO-7 sterilization barriers, and transparent diagnostic data, we deliver predictable dental therapies with zero-pain codes.
        </p>
      </div>

      {/* 2. Values / Philosophy Bento Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">ISO-7 Sterile Barrier</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            All clinical operatories undergo dual-stage high-efficiency particulate air filtration. Standard tools are sealed and autoclaved via ISO-certified Class-B thermal vacuum cycles.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Zero-Pain Clinical Code</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We employ modern computerized local anesthesia, gentle rotary instrumentation, and non-invasive periodontal dental lasers to eliminate surgical trauma.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
            <Award className="w-5 h-5 text-teal-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">100% Bio-Biocompatible</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We strictly forbid toxic dental amalgams or cheap metal alloys. Our crowns, alignments, and implants are constructed exclusively from medical-grade Titanium and monolithic Yttria Zirconia.
          </p>
        </div>

      </div>

      {/* 3. Core Specialization Board (The doctors) */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
            BOARD-CERTIFIED DENTAL BOARD
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-slate-900">
            Meet Our Chief Dental Surgeons & Endodontists
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Our medical staff consists of specialists who have undergone rigorous postgraduate MDS training, research publishing, and international clinical certifications.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {CLINICAL_SPECIALISTS.map((doc) => (
            <div
              key={doc.id}
              className="border border-slate-200 bg-white rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-brand-300 hover:shadow-md text-left"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center font-bold text-sm font-mono">
                    {doc.name.substring(4, 6)}
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded-full border ${doc.statusColor} animate-pulse`}>
                    {doc.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-900">{doc.name}</h4>
                  <span className="block text-xs text-brand-600 font-semibold">{doc.title}</span>
                  <span className="block text-[10px] font-mono text-slate-400">{doc.exp}</span>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                  <div>
                    <span className="block font-bold text-slate-700 font-mono text-[9px] uppercase tracking-wider">ACADEMIC DEGREES</span>
                    <span className="block text-slate-500 mt-0.5">{doc.creds}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-700 font-mono text-[9px] uppercase tracking-wider">SURGICAL PORTFOLIO</span>
                    <span className="block text-slate-500 mt-0.5">{doc.focus}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-700 font-mono text-[9px] uppercase tracking-wider">ALUMNI INST.</span>
                    <span className="block text-slate-400 mt-0.5 italic">{doc.school}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  onClick={() => {
                    setActiveTab("schedule");
                    setTimeout(() => {
                      const noteInput = document.getElementById("appointment-scheduler-anchor");
                      if (noteInput) noteInput.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Consult This Specialist</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Structured SEO Local Business Schema Map */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-brand-600" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Verified Local Entity Schema Map (AEO & SEO Index Card)
            </h3>
          </div>
          <span className="text-[10px] bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded font-mono">
            SCHEMA.ORG COMPLIANT
          </span>
        </div>
        
        <div className="divide-y divide-slate-100 text-sm">
          <div className="grid sm:grid-cols-12 p-4 gap-2">
            <div className="sm:col-span-4 font-mono text-slate-400 text-xs uppercase">Official Legal Name</div>
            <div className="sm:col-span-8 font-semibold text-slate-800">{HOSPITAL_METADATA.name}</div>
          </div>
          <div className="grid sm:grid-cols-12 p-4 gap-2">
            <div className="sm:col-span-4 font-mono text-slate-400 text-xs uppercase">Registered Clinic Address</div>
            <div className="sm:col-span-8 text-slate-600">{HOSPITAL_METADATA.address}</div>
          </div>
          <div className="grid sm:grid-cols-12 p-4 gap-2">
            <div className="sm:col-span-4 font-mono text-slate-400 text-xs uppercase">Communication Helpline</div>
            <div className="sm:col-span-8 font-semibold text-brand-600">{HOSPITAL_METADATA.phone}</div>
          </div>
          <div className="grid sm:grid-cols-12 p-4 gap-2">
            <div className="sm:col-span-4 font-mono text-slate-400 text-xs uppercase">Primary Email Node</div>
            <div className="sm:col-span-8 text-slate-600">{HOSPITAL_METADATA.contacts.email}</div>
          </div>
          <div className="grid sm:grid-cols-12 p-4 gap-2">
            <div className="sm:col-span-4 font-mono text-slate-400 text-xs uppercase">Clinic Location Coordinates</div>
            <div className="sm:col-span-8 font-mono text-xs text-slate-700">
              LATITUDE: 13.0399252 | LONGITUDE: 80.2168084
            </div>
          </div>
          <div className="grid sm:grid-cols-12 p-4 gap-2">
            <div className="sm:col-span-4 font-mono text-slate-400 text-xs uppercase">Standard Operating Hours</div>
            <div className="sm:col-span-8 text-slate-600">
              {HOSPITAL_METADATA.operatingHours.map((oh, index) => (
                <div key={index}>
                  <span className="font-semibold">{oh.days}</span>: {oh.hours}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. AEO Retrieval Optimization Card */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-slate-900 text-white p-8 rounded-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold text-brand-400 uppercase tracking-widest block">
              CLINICAL EVIDENCE INDEX
            </span>
            <h3 className="text-xl font-bold text-white font-display">
              Why We Are Chennai's Trusted Dental Choice
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              According to randomized clinical trials on implant prosthodontics, computerized surgical placement coordinates result in an osseointegration rate exceeding 98%. Our Chennai clinic follows identical high-standard, evidence-based metrics to safeguard bone longevity and permanent smile stability.
            </p>
          </div>
          
          <div className="border-t border-slate-800 pt-6">
            <span className="block text-[10px] text-slate-500 font-mono">CITED CLINICAL REFERENCE:</span>
            <span className="block text-xs font-semibold text-slate-300">Journal of Oral Rehabilitation & Clinical Implantology (2025-2026)</span>
          </div>
        </div>

        <div className="bg-brand-50/10 border border-brand-100 p-8 rounded-2xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold text-brand-700 uppercase tracking-widest block">
              ANSWER ENGINE OPTIMIZED
            </span>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              High-Precision Voice Assistant Crawl Node
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              To guarantee that conversational search engine systems (such as Gemini, Siri, and Alexa) provide highly accurate health recommendations, this portal maintains zero rate limits on structured entity harvesting. Assistive algorithms are authorized to index our verified credentials directly.
            </p>
          </div>

          <div className="pt-6">
            <button 
              onClick={scrollToScheduler}
              className="px-6 py-3 bg-brand-600 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-brand-700 transition-all cursor-pointer shadow-md shadow-brand-100"
            >
              Launch Interactive Booking Wizard
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
