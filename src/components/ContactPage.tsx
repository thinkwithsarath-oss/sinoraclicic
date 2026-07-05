import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  Navigation, 
  ShieldCheck, 
  Smile, 
  Volume2, 
  Car, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-react";
import { HOSPITAL_METADATA } from "../types";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Consultation Inquiry",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "General Consultation Inquiry",
        message: ""
      });
    }, 1500);
  };

  const amenities = [
    { label: "Secured Patient Parking", desc: "Dedicated car & two-wheeler parking in the building basement." },
    { label: "Wheelchair-Accessible Layout", desc: "No-step entry ramp, large elevator, and wheelchair friendly operatory." },
    { label: "Isolated Operating Suite", desc: "Fully isolated surgical suite for sterile implant placements." },
    { label: "Kids Play & Pediatric Lounge", desc: "Engaging and positive playroom to reduce children's dental anxieties." },
    { label: "Aerosol HEPA Extraction", desc: "Continuous double-fan dynamic aerosol suction in every room." }
  ];

  return (
    <div id="contact-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-left space-y-16">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
          COMMUNICATION TERMINAL
        </span>
        <h1 className="text-4xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
          Contact Our Ashok Nagar Clinic Node
        </h1>
        <p className="text-slate-650 leading-relaxed text-sm sm:text-base">
          Get in touch with our front-desk coordinators. We respond to all digital inquiries within two business hours. For immediate medical emergencies or severe dental pain triaging, call our direct helpline.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 relative">
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 font-display">Send a Secure Medical Query</h3>
            <p className="text-xs text-slate-500">
              Submit your symptoms, appointment requests, or insurance co-pay questions below. Your information is encrypted and transmitted securely.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="contact-form"
                onSubmit={handleSubmit} 
                className="space-y-4"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-400 uppercase">Full Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="Patient Legal Name"
                      value={formState.name}
                      onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-400 uppercase">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="patient@service.com"
                      value={formState.email}
                      onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-400 uppercase">Telephone Line</label>
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. 08056419529"
                      value={formState.phone}
                      onChange={(e) => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-400 uppercase">Inquiry Category</label>
                    <select 
                      value={formState.subject}
                      onChange={(e) => setFormState(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all cursor-pointer"
                    >
                      <option value="General Consultation Inquiry">General Consultation Inquiry</option>
                      <option value="Dental Implants Query">Dental Implants Query</option>
                      <option value="Orthodontic & Aligners Assessment">Orthodontic & Aligners Assessment</option>
                      <option value="Root Canal Treatment Session">Root Canal Treatment Session</option>
                      <option value="Insurance & Co-Pay Verification">Insurance & Co-Pay Verification</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-slate-400 uppercase">Your Message / Symptoms</label>
                  <textarea 
                    required
                    placeholder="Describe your current oral symptoms, desired therapies, or questions about co-pay networks..."
                    value={formState.message}
                    onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:bg-slate-400"
                >
                  {isSubmitting ? (
                    <span>Encrypting & Dispatching...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Dispatch Secure Message</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="contact-success"
                className="py-12 text-center space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Message Transmitted</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Your clinical registration ticket has been received by our front desk coordinators. A coordinator will call you back on your registered phone number within two business hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Right Side: Coordinate / Navigation Specs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Direct Address Cards */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-6">
            
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                LOCATION METRIC VECTOR
              </span>
              
              <div className="space-y-3 text-xs">
                <div className="flex gap-3">
                  <MapPin className="w-4.5 h-4.5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-800">Physical Clinic Node</span>
                    <span className="block text-slate-500 mt-0.5 leading-relaxed">{HOSPITAL_METADATA.address}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Phone className="w-4.5 h-4.5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-800">Direct Telephone Line</span>
                    <span className="block text-brand-600 font-mono font-bold mt-0.5 text-sm">{HOSPITAL_METADATA.phone}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Mail className="w-4.5 h-4.5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-slate-800">Clinic Email Link</span>
                    <span className="block text-slate-500 mt-0.5">{HOSPITAL_METADATA.contacts.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timetable */}
            <div className="border-t border-slate-200/60 pt-4 space-y-3">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                CLINIC OPERATIONAL WINDOW
              </span>
              <div className="space-y-2 text-xs">
                {HOSPITAL_METADATA.operatingHours.map((oh, index) => (
                  <div key={index} className="flex justify-between p-2.5 bg-white border border-slate-100 rounded-xl font-mono">
                    <span className="text-slate-500 font-semibold">{oh.days}</span>
                    <span className="text-slate-800 font-bold">{oh.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Transit and Coordinates Card */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
            <span className="text-[9px] font-mono font-bold text-brand-400 uppercase tracking-widest block">
              TRANSIT DIRECTIONS
            </span>
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="flex items-start gap-2.5">
                <Navigation className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Ashok Nagar Metro Station:</strong> Just a 5-minute walk (approx 450 meters) via 7th Ave and Sarvamangala Colony.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Car className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white">Basement Car Parking:</strong> Secured basement parking is available free of charge for active appointments.
                </p>
              </div>
            </div>
            
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>LAT: 13.0399252</span>
              <span>LONG: 80.2168084</span>
            </div>

            <a 
              href={HOSPITAL_METADATA.mapsLink}
              target="_blank"
              referrerPolicy="no-referrer"
              className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Launch Google Maps Direction</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

      {/* Amenities Section */}
      <div className="space-y-6 pt-4 border-t border-slate-150">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
            CLINICAL ESTABLISHMENT SPECS
          </span>
          <h2 className="text-2xl font-bold font-display tracking-tight text-slate-900">
            Premium Clinic Amenities
          </h2>
          <p className="text-xs text-slate-500 max-w-xl">
            Our Ashok Nagar healthcare establishment is fully optimized to provide physical safety, high barrier controls, and comfort.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {amenities.map((item, idx) => (
            <div key={idx} className="p-5 border border-slate-150 rounded-2xl bg-white space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <h4 className="text-sm font-bold text-slate-800">{item.label}</h4>
              </div>
              <p className="text-xs text-slate-500 leading-normal pl-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
