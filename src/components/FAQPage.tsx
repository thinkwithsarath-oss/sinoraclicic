import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  ChevronDown, 
  CheckCircle, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  MapPin, 
  Stethoscope,
  Info
} from "lucide-react";
import { HOSPITAL_METADATA } from "../types";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQS_LIST: FAQItem[] = [
  {
    id: "loc",
    category: "General",
    question: "Where is Sinora Dental Hospital located in Ashok Nagar, Chennai?",
    answer: "Sinora Dental Hospital is situated in the central hub of Ashok Nagar, Chennai, Tamil Nadu. The exact address is 21, 7th Ave, Sarvamangala Colony, Sri Devi Colony, Ashok Nagar, Chennai, Tamil Nadu 600083. It is easily accessible within a 5-minute walk from the Ashok Nagar Metro Station and major bus routes. Valet & secured basement parking is available for patients arriving by car."
  },
  {
    id: "apt",
    category: "General",
    question: "How do I schedule an appointment, and do you accept walk-ins?",
    answer: "You can book an appointment instantly using our digital Appointment Registration Wizard, or by calling our desk at 08056419529. While we accommodate emergency walk-ins for patients in acute pain, we highly recommend scheduled bookings. This ensures that a specialized chair, Class-B sterilized kit, and designated on-duty endodontist or surgeon are fully allocated to your slot."
  },
  {
    id: "ins",
    category: "Insurance",
    question: "Which insurance networks cover co-pay at Sinora Dental Hospital?",
    answer: "Our clinical node is integrated with major medical insurance providers across Chennai. This includes Star Health Insurance, ICICI Lombard, Niva Bupa, Care Health Insurance, HDFC ERGO, and Aditya Birla. Most surgical treatments, including root canals and periodontal debridement, support co-pay options. Our team will verify your policy eligibility during registration and coordinate pre-approvals instantly."
  },
  {
    id: "imp-fail",
    category: "Implants",
    question: "What is the clinical success rate of your dental implants?",
    answer: "Our computer-guided titanium dental implants achieve a long-term clinical success rate exceeding 98%. We exclusively utilize bio-compatible Grade-5 titanium fixtures which exhibit superior osseointegration. Using 3D Cone Beam CT scans, we map exact bone vectors, preventing nerve impact and achieving high mechanical security. Fusion typically spans 3 to 6 months before final monolithic crown placement."
  },
  {
    id: "rct-pain",
    category: "Root Canals",
    question: "Is modern root canal therapy painful? What are your zero-pain codes?",
    answer: "Under modern microscopic endodontics, a root canal is completely painless. We adhere to a strict 'zero-pain clinical code'. First, we deliver localized deep-anesthesia using computer-controlled flow rate devices. Second, we utilize flexible, high-frequency nickel-titanium rotaries that smoothly debride pulp chambers without creating pressure. Finally, apex-locating instruments verify precise cleaning borders to ensure complete post-treatment comfort."
  },
  {
    id: "align-age",
    category: "Aligners",
    question: "Are clear aligners suitable for older adults, and what is the typical treatment duration?",
    answer: "Absolutely. Clear aligners are suitable for patients of all ages, provided their periodontal tissues and bone support are healthy. Because aligners are constructed from custom-designed thermoplastic polymers, they are nearly invisible and highly comfortable. Typical alignment programs span twelve to twenty-four months, requiring 22 hours of daily wear. Progress is tracked via advanced 3D scanning software."
  },
  {
    id: "steril",
    category: "General",
    question: "What sterile protocols do you use to prevent cross-contamination?",
    answer: "We employ double-barrier Class-B fractional vacuum sterilizers (autoclaves) complying with strict European biological standards. Every handheld therapeutic tool undergoes a computer-monitored high-temperature cycle and is sealed in chemical-indicator pouches. Furthermore, every operatory room utilizes dynamic double-fan HEPA aerosol extractors to continuously filter air particles during dental procedures."
  }
];

interface FAQPageProps {
  setActiveTab: (tab: any) => void;
  openChatBot: (initialQuery: string) => void;
}

export default function FAQPage({ setActiveTab, openChatBot }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>("loc");
  
  const [customQuestion, setCustomQuestion] = useState("");
  const [callbackSuccess, setCallbackSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["All", "General", "Implants", "Root Canals", "Aligners", "Insurance"];

  const filteredFAQs = FAQS_LIST.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCustomQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCallbackSuccess(true);
      setCustomQuestion("");
    }, 1200);
  };

  const handleRouteToAI = () => {
    if (!customQuestion.trim()) return;
    openChatBot(customQuestion);
    setCustomQuestion("");
  };

  return (
    <div id="faq-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-left space-y-16">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
          ANSWER ENGINE OPTIMIZATION HUB
        </span>
        <h1 className="text-4xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
          Dental FAQ - Best Dental Hospital in Ashok Nagar Chennai
        </h1>
        <p className="text-slate-650 leading-relaxed text-sm sm:text-base">
          Get answers from the <span className="font-bold text-slate-800">best dentists in Chennai</span> about <span className="font-bold text-slate-800">Invisalign clear aligners</span>, affordable <span className="font-bold text-slate-800">dental implants cost in Chennai</span>, single-sitting <span className="font-bold text-slate-800">root canal treatment in Ashok Nagar Chennai</span>, and modern braces.
        </p>

        {/* Filters and Search Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeCategory === cat ? "bg-brand-600 text-white shadow-xs" : "bg-slate-50 border border-slate-150 text-slate-600 hover:bg-slate-100"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clinical topics..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-2xs"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Accordion FAQ List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 border border-dashed border-slate-200 rounded-3xl bg-slate-50/30">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold">No direct answers found for your query.</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="text-xs text-brand-600 font-bold underline mt-1"
              >
                Reset query parameters
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              return (
                <div 
                  key={faq.id}
                  id={`faq-accordion-${faq.id}`}
                  className={`border border-slate-150 rounded-2xl bg-white overflow-hidden transition-all ${isExpanded ? "ring-1 ring-brand-500 shadow-xs" : "hover:border-slate-300"}`}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                    className="w-full p-5 text-left flex justify-between items-center gap-4 cursor-pointer font-semibold text-slate-900 text-sm sm:text-base group"
                  >
                    <span className="group-hover:text-brand-700">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${isExpanded ? "rotate-180 text-brand-600" : ""}`} />
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-500 leading-relaxed space-y-3 bg-slate-50/50">
                          <p>{faq.answer}</p>
                          <div className="flex items-center gap-1.5 text-[10px] text-brand-600 font-mono font-bold uppercase pt-2">
                            <CheckCircle className="w-3.5 h-3.5 text-brand-500" />
                            <span>Clinical compliance node verified</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Right Side: Ask Custom Question (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-800 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 rounded-bl-full pointer-events-none"></div>
            
            <div className="space-y-2">
              <span className="text-[9px] font-mono font-bold text-brand-400 uppercase tracking-widest block">
                CONVERSATIONAL GATEWAY
              </span>
              <h3 className="text-lg font-bold font-display text-white">Ask a Custom Question</h3>
              <p className="text-xs text-slate-300">
                Type any symptom or question. Choose whether to ask our intelligent AI Assistant instantly or request a callback.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!callbackSuccess ? (
                <motion.form 
                  key="custom-qa-form"
                  onSubmit={handleCustomQuestionSubmit} 
                  className="space-y-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <textarea
                    required
                    placeholder="e.g. Do you offer pain-free injections for wisdom tooth extraction?"
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                  />

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {/* Ask AI */}
                    <button
                      type="button"
                      onClick={handleRouteToAI}
                      disabled={!customQuestion.trim()}
                      className="py-2 px-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 cursor-pointer disabled:bg-slate-800 disabled:text-slate-600"
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                      <span>Ask AI</span>
                    </button>

                    {/* Submit Callback */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !customQuestion.trim()}
                      className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-[10px] uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1 cursor-pointer disabled:bg-slate-800 disabled:text-slate-600"
                    >
                      <span>Get Callback</span>
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="custom-qa-success"
                  className="py-4 text-center space-y-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Callback Scheduled</h4>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    Our on-duty dental desk has logged this query. A coordinator will call you back on your primary line shortly.
                  </p>
                  <button
                    onClick={() => setCallbackSuccess(false)}
                    className="text-xs text-brand-400 font-bold underline"
                  >
                    Submit another question
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Trust badges */}
          <div className="p-5 border border-slate-150 bg-slate-50 rounded-2xl text-xs space-y-3">
            <div className="flex items-center gap-2 text-slate-800 font-bold font-mono text-[10px] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Certified Care</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              All therapeutic advice complies with Indian Dental Association (IDA) codes. Consultations are verified via formal diagnosis before clinical operations.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
