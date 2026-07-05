import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Award, 
  Activity, 
  Sparkles, 
  Smile, 
  ShieldCheck, 
  ChevronRight, 
  AlertCircle, 
  Search, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Stethoscope,
  Info
} from "lucide-react";
import { ClinicalService } from "../types";

// Static details for SEO/AEO optimization with rich keywords
export const SERVICES_LIST: ClinicalService[] = [
  {
    id: "implants",
    title: "High-Precision Dental Implants",
    shortDesc: "Permanent, bio-compatible tooth replacement using state-of-the-art titanium fixtures.",
    fullDesc: "Our high-precision dental implant protocol restores oral function and facial aesthetics. Using premium titanium fixtures that exhibit outstanding osseointegration properties, we insert the implant directly into the alveolar bone structure. Over a three to six month period, the bone fuses with the implant, creating an anchor as secure as a natural tooth root. This prevents bone resorption, maintains facial contours, and offers unmatched structural resilience.",
    symptoms: [
      "Edentulism (completely or partially missing teeth)",
      "Unstable, clicking, or ill-fitting traditional dentures",
      "Bone resorption and loss of jaw density due to prolonged tooth loss",
      "Inability to chew fibrous foods or articulate words clearly",
      "Premature facial sagging and wrinkles around the mouth"
    ],
    protocol: [
      "3D Cone Beam Computed Tomography (CBCT) diagnostic mapping for bone density",
      "Digital computer-guided surgical planning and custom template fabrication",
      "Flapless laser-assisted micro-surgical implant placement",
      "Controlled osseointegration monitoring phase (3-4 months fusion)",
      "Custom abutment coupling and final monolithic zirconia crown cementing"
    ],
    duration: "3 - 6 Months (Osseointegration Dependent)",
    costEstimate: "₹28,000 - ₹45,000 per fixture unit",
    iconName: "Award"
  },
  {
    id: "root-canal",
    title: "Advanced Root Canal Therapy",
    shortDesc: "Decisive micro-surgical endodontics to save infected teeth and eliminate acute pain.",
    fullDesc: "Modern endodontic treatment is highly efficient and designed to relieve pain rather than cause it. Root canal therapy addresses deep pulpal infections, abscesses, or trauma-induced necrosis. Under high magnification, our specialists debride the infected pulpal pathways, perform advanced chemical disinfection using apex-locating rotaries, and fill the canals with thermoplastic gutta-percha sealant to prevent future re-infection.",
    symptoms: [
      "Severe pulpal pain aggravated by hot or cold food/liquids",
      "Localized dental abscess, gum swelling, or facial tenderness",
      "Acute discomfort during mastication, chewing, or biting pressure",
      "Spontaneous, throbbing pain radiating to the jaw, temple, or neck",
      "Dark discoloration of the tooth indicating nerve death"
    ],
    protocol: [
      "High-magnification digital radiography and pulp vitality assessment",
      "Painless local anesthesia delivery and isolated rubber dam placement",
      "Continuous torque rotary endodontic root canal debridement",
      "Chemical sterilization and subgingival laser disinfection",
      "Thermoplastic gutta-percha hermetic obturation and crown protection"
    ],
    duration: "1 - 2 Sessions (Single Sitting RCT where indicated)",
    costEstimate: "₹3,500 - ₹10,500 based on canal anatomy",
    iconName: "Activity"
  },
  {
    id: "orthodontics",
    title: "Modern Braces & Clear Aligners",
    shortDesc: "Advanced alignment therapies including high-precision metal brackets and clear aligners.",
    fullDesc: "Orthodontic treatment corrects malocclusions, crowded arches, and skeletal mismatches. We offer advanced fixed bracket systems and custom, metal-free carbon-graphene polymer clear aligners. By applying continuous, controlled physiological forces, teeth are gradually repositioned into optimal alignment. This prevents future periodontal issues, resolves uneven wear, and relieves TMJ stress.",
    symptoms: [
      "Dental crowding, spacing, or severe teeth gaps (diastema)",
      "Malocclusion including overbite, underbite, crossbite, or open bite",
      "Misaligned teeth causing difficulty in brushing, leading to plaque build-up",
      "Premature wear of enamel on specific teeth due to a faulty bite",
      "Jaw joint clicking, clicking sounds, or muscle fatigue when chewing"
    ],
    protocol: [
      "Digital intraoral 3D scanner mapping (replacing messy molds)",
      "Computerized orthodontic treatment progression and biomechanical design",
      "Precise indirect bracket bonding or clear aligner delivery",
      "Regular physiological tension adjustments and aligner sequence tracking",
      "Retention phase planning to preserve the final aligned smile"
    ],
    duration: "12 - 24 Months (Depends on alignment severity)",
    costEstimate: "₹45,000 - ₹1,30,000 based on alignment profile",
    iconName: "Sparkles"
  },
  {
    id: "pediatric",
    title: "Specialized Pediatric Dentistry",
    shortDesc: "Gentle preventive care and dental habit formation for young patients in a supportive environment.",
    fullDesc: "Early dental health forms the cornerstone of permanent dentition. Pediatric dentistry focuses on preventive therapies, sealants, fluoride treatments, and dental habit counseling. Our protocols are designed specifically to manage children's anxieties, utilizing non-threatening behavioral orientation to build positive, life-long oral hygiene habits.",
    symptoms: [
      "Early childhood caries (ECC) or visible black spots in child's teeth",
      "Teething pain, gum irritation, or thumb-sucking structural risks",
      "Dental trauma from sports, falling, or play",
      "Congenitally missing teeth, delayed teething, or enamel defects",
      "Persistent bad breath or reluctance to chew hard food items"
    ],
    protocol: [
      "Interactive, non-threatening behavioral orientation and child play introduction",
      "Gentle diagnostic exploration and non-ionizing light tooth charting",
      "Pit and fissure sealant application for active cavity prevention",
      "Gentle decay removal and bio-compatible white composite micro-restorations"
    ],
    duration: "45 - 60 Minutes per check-up session",
    costEstimate: "₹1,200 - ₹3,000 based on clinical scope",
    iconName: "Smile"
  },
  {
    id: "periodontics",
    title: "Comprehensive Gum & Periodontal Care",
    shortDesc: "Treatment of gingivitis, periodontitis, and bone-support diseases using laser debridement.",
    fullDesc: "Periodontal disease is the primary cause of adult tooth loss. Our specialized scaling, root planing, and subgingival laser therapies combat plaque-induced periodontal infections. By halting alveolar bone destruction, we stabilize tooth structures, eliminate chronic bleeding, and eradicate dangerous oral pathogens from the bloodstream.",
    symptoms: [
      "Gingival bleeding during brushing, flossing, or eating hard fruits",
      "Chronic halitosis (bad breath) that persists after brushing and mouthwash",
      "Receding gums (teeth looking longer) and exposure of sensitive roots",
      "Mobile, loose, shifting, or painful tooth structures",
      "Tender, swollen, dark red, or puffy gums"
    ],
    protocol: [
      "Digital periodontal pocket depth measurement and bone support assessment",
      "Piezoelectric subgingival scaling and ultrasonic calculus debridement",
      "Laser-assisted pocket sterilization to kill anaerobe bacteria",
      "Customized home care protocols and quarterly maintenance tracking"
    ],
    duration: "1 - 3 Sessions (Depending on pocket depths)",
    costEstimate: "₹1,500 - ₹9,000 based on severity",
    iconName: "ShieldCheck"
  }
];

interface ServicesPageProps {
  setActiveTab: (tab: any) => void;
  setAppointmentForm: React.Dispatch<React.SetStateAction<any>>;
  scrollToScheduler: (serviceTitle?: string) => void;
}

export default function ServicesPage({
  setActiveTab,
  setAppointmentForm,
  scrollToScheduler
}: ServicesPageProps) {
  const [selectedService, setSelectedService] = useState<ClinicalService>(SERVICES_LIST[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [costScale, setCostScale] = useState(1);

  const filteredServices = SERVICES_LIST.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBookService = (serviceTitle: string) => {
    scrollToScheduler(serviceTitle);
  };

  return (
    <div id="services-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-left">
      
      {/* Dynamic SEO Meta Header */}
      <div className="mb-12 space-y-4">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
          TREATMENT CATALOG & MEDICAL STANDARDS
        </span>
        <h1 className="text-4xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
          Dental Treatments, Clinical Protocols & Pricing
        </h1>
        <p className="text-slate-550 max-w-3xl leading-relaxed text-sm sm:text-base">
          Review exhaustive clinical guidelines, indicators, and scheduled procedural phases for all therapies conducted at Sinora Dental Hospital in Chennai. Our protocols comply with international sterile codes.
        </p>

        {/* Search filter */}
        <div className="relative max-w-md pt-4">
          <Search className="absolute left-3.5 top-7 w-4.5 h-4.5 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms, treatment types (implant, root, crowd)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Directory Menu (5 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block px-2 mb-1">
            CLINICAL PATHWAYS DIRECTORY
          </span>
          {filteredServices.length === 0 ? (
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-center text-xs text-slate-500">
              No matching clinical services found for "{searchQuery}".
            </div>
          ) : (
            filteredServices.map(srv => (
              <button
                key={srv.id}
                id={`srv-btn-${srv.id}`}
                onClick={() => {
                  setSelectedService(srv);
                  setCostScale(1);
                }}
                className={`w-full text-left p-4 rounded-xl transition-all border flex items-center justify-between group ${selectedService.id === srv.id ? "bg-white border-brand-500 text-brand-700 shadow-sm font-semibold" : "bg-slate-50/50 border-slate-100 text-slate-600 hover:bg-slate-100/50 hover:text-slate-800"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedService.id === srv.id ? "bg-brand-50 text-brand-600" : "bg-white border border-slate-200 text-slate-400 group-hover:text-slate-600"}`}>
                    {srv.id === "implants" && <Award className="w-4 h-4" />}
                    {srv.id === "root-canal" && <Activity className="w-4 h-4" />}
                    {srv.id === "orthodontics" && <Sparkles className="w-4 h-4" />}
                    {srv.id === "pediatric" && <Smile className="w-4 h-4" />}
                    {srv.id === "periodontics" && <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="block text-sm font-semibold leading-tight">{srv.title}</span>
                    <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{srv.duration}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedService.id === srv.id ? "translate-x-0.5 text-brand-500" : "text-slate-400 opacity-0 group-hover:opacity-100"}`} />
              </button>
            ))
          )}

          {/* Quick FAQ Card in sidebar */}
          <div className="p-5 border border-slate-100 bg-brand-50/10 rounded-2xl text-xs space-y-3">
            <div className="flex items-center gap-2 text-brand-700 font-bold font-mono text-[10px] uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" />
              <span>Sterilization Standard</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              All therapeutic tools undergo dual thermal Class-B autoclave processing. Air is continuously purified via medical-grade aerosol extraction.
            </p>
          </div>
        </div>

        {/* Right Details Panel (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8 relative overflow-hidden">
            
            {/* Title Header */}
            <div className="border-b border-slate-100 pb-6 space-y-3">
              <div className="flex items-center gap-2 text-brand-600 font-mono text-[10px] font-bold tracking-widest uppercase">
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                <span>CLINICAL PROFILE CODE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
                {selectedService.title}
              </h2>
              <p className="text-slate-550 leading-relaxed text-sm sm:text-base">
                {selectedService.fullDesc}
              </p>
            </div>

            {/* Symptoms and Protocols Grid */}
            <div className="grid md:grid-cols-2 gap-8 pt-2">
              {/* Symptoms */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-400" />
                  INDICATORS & CLINICAL SYMPTOMS
                </span>
                <ul className="space-y-3">
                  {selectedService.symptoms.map((sym, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full flex-shrink-0 mt-1.5"></span>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Protocol */}
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4 text-slate-400" />
                  STANDARDISED CLINICAL PROTOCOLS
                </span>
                <ol className="space-y-3">
                  {selectedService.protocol.map((ptc, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2.5 leading-relaxed">
                      <span className="font-mono font-bold text-brand-600 flex-shrink-0">{i+1}.</span>
                      <span>{ptc}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Quick stats footer */}
            <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-xs font-mono">
              <div>
                <span className="block text-slate-400 uppercase font-semibold">ESTIMATED TIMELINE</span>
                <span className="block text-sm font-bold text-slate-800 mt-1">{selectedService.duration}</span>
              </div>
              <div>
                <span className="block text-slate-400 uppercase font-semibold">PRICING PROFILE</span>
                <span className="block text-sm font-bold text-slate-800 mt-1">{selectedService.costEstimate}</span>
              </div>
              <div>
                <span className="block text-slate-400 uppercase font-semibold">CLINIC NODE LOCATION</span>
                <span className="block text-sm font-bold text-slate-800 mt-1">Ashok Nagar, Chennai</span>
              </div>
            </div>

          </div>

          {/* Dynamic Interactive Cost Estimator Widget */}
          <div className="bg-slate-55/40 border border-slate-200/50 rounded-3xl p-6 sm:p-8 text-left space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-brand-600 uppercase tracking-widest block">
                  PRICE ESTIMATOR NODE
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                  Interactive Cost & Co-Pay Calculator
                </h3>
                <p className="text-xs text-slate-400">
                  Select parameters below to calculate average diagnostic and therapeutic costs at our clinic.
                </p>
              </div>
              <div className="px-3.5 py-1.5 bg-white border border-slate-200 text-xs font-mono rounded-lg shadow-2xs">
                <span>Standard Star / ICICI Co-Pay Network Approved</span>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 pt-2 items-center">
              
              {/* Parameters Slider/Controls */}
              <div className="md:col-span-7 space-y-4">
                {selectedService.id === "implants" && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700">Number of Fixtures: <span className="text-brand-600 font-mono font-bold">{costScale} Implant(s)</span></label>
                    <input 
                      type="range" 
                      min="1" 
                      max="4" 
                      value={costScale}
                      onChange={(e) => setCostScale(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>1 Unit</span>
                      <span>2 Units</span>
                      <span>3 Units</span>
                      <span>4+ Units</span>
                    </div>
                  </div>
                )}

                {selectedService.id === "root-canal" && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700">Anatomy Complexity Profile</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 1, label: "Single Canal" },
                        { val: 2, label: "Molar Root (Multi)" },
                        { val: 3, label: "Re-treatment Case" }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => setCostScale(opt.val)}
                          className={`p-2.5 border rounded-xl text-center font-bold text-xs cursor-pointer transition-all ${costScale === opt.val ? "border-brand-500 bg-brand-50/20 text-brand-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedService.id === "orthodontics" && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700">Therapy Materials Preference</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 1, label: "Metal Brackets" },
                        { val: 2, label: "Ceramic Braces" },
                        { val: 3, label: "Clear Aligners" }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => setCostScale(opt.val)}
                          className={`p-2.5 border rounded-xl text-center font-bold text-xs cursor-pointer transition-all ${costScale === opt.val ? "border-indigo-500 bg-indigo-50/20 text-indigo-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedService.id === "pediatric" && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700">Clinical Focus Range</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 1, label: "Hygiene & Fluoride" },
                        { val: 2, label: "Pit/Fissure Sealant" },
                        { val: 3, label: "Composite Cavity Fill" }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => setCostScale(opt.val)}
                          className={`p-2.5 border rounded-xl text-center font-bold text-xs cursor-pointer transition-all ${costScale === opt.val ? "border-emerald-500 bg-emerald-50/20 text-emerald-700" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedService.id === "periodontics" && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700">Surgical Quadrant Scope</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 1, label: "Ultrasonic Scaling" },
                        { val: 2, label: "Laser (1 Arch)" },
                        { val: 3, label: "Full-Mouth Debridement" }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => setCostScale(opt.val)}
                          className={`p-2.5 border rounded-xl text-center font-bold text-xs cursor-pointer transition-all ${costScale === opt.val ? "border-slate-800 bg-slate-150 text-slate-800" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 p-3 bg-white border border-slate-100 rounded-xl">
                  <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="text-[10px] text-slate-500 leading-normal">
                    Estimated co-pay insurance covers up to 80% of costs, depending on your health policy provider network (e.g. Star, ICICI).
                  </span>
                </div>
              </div>

              {/* Price Calculations Output Box */}
              <div className="md:col-span-5 p-6 bg-slate-900 rounded-2xl text-white text-left space-y-4 border border-slate-800">
                <div>
                  <span className="text-[9px] font-mono text-brand-400 uppercase tracking-widest block font-bold">CALCULATED BILL ESTIMATE</span>
                  <span className="block text-2xl font-black mt-1">
                    {selectedService.id === "implants" && `₹${(28000 * costScale).toLocaleString()} - ₹${(45000 * costScale).toLocaleString()}`}
                    {selectedService.id === "root-canal" && (costScale === 1 ? "₹3,500 - ₹4,500" : costScale === 2 ? "₹6,000 - ₹7,000" : "₹9,000 - ₹10,500")}
                    {selectedService.id === "orthodontics" && (costScale === 1 ? "₹45,000 - ₹55,000" : costScale === 2 ? "₹75,000 - ₹85,000" : "₹1,10,000 - ₹1,30,000")}
                    {selectedService.id === "pediatric" && (costScale === 1 ? "₹1,200 - ₹1,800" : costScale === 2 ? "₹2,000 - ₹2,500" : "₹2,800 - ₹3,000")}
                    {selectedService.id === "periodontics" && (costScale === 1 ? "₹1,500 - ₹2,500" : costScale === 2 ? "₹4,000 - ₹5,000" : "₹7,500 - ₹9,000")}
                  </span>
                  <span className="block text-[9px] text-slate-400 font-mono mt-0.5">Indian Rupee (INR) for Chennai clinical nodes.</span>
                </div>

                <div className="border-t border-slate-800 pt-3 space-y-1.5 text-[10px] font-mono text-slate-300">
                  <div className="flex justify-between"><span>Clinical Sessions:</span> <span className="text-white font-bold">{selectedService.id === "implants" ? "3 - 4 Sessions" : selectedService.id === "root-canal" ? "1 - 2 Sessions" : "Sequential"}</span></div>
                  <div className="flex justify-between"><span>Biocompatible grade:</span> <span className="text-white font-bold">{selectedService.id === "implants" ? "Grade-5 Ti6Al4V" : "Standard Monolithic"}</span></div>
                  <div className="flex justify-between"><span>Insurance Coverable:</span> <span className="text-emerald-400 font-bold">Yes (Pre-approval ready)</span></div>
                </div>

                <button
                  onClick={() => handleBookService(selectedService.title)}
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-brand-950/20 active:scale-95"
                >
                  <DollarSign className="w-3.5 h-3.5 text-white" />
                  Lock In Cost & Book
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
