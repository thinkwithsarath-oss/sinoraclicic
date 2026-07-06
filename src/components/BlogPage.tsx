import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Clock, 
  User, 
  ArrowRight, 
  Bookmark, 
  Tag, 
  ChevronRight, 
  Calendar, 
  X, 
  BookOpen,
  ArrowLeft
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  authorTitle: string;
  readTime: string;
  date: string;
  summary: string;
  fullBody: string[];
  keywords: string[];
}

const ARTICLES_LIST: BlogPost[] = [
  {
    id: "titanium-implant-fusion",
    title: "Understanding Grade-5 Titanium Implant Fusion & Bone Density",
    category: "Implants",
    author: "Dr. Suresh Kumar, MDS",
    authorTitle: "Chief Implantology Specialist",
    readTime: "6 Min Read",
    date: "June 24, 2026",
    summary: "Discover the biochemistry of osseointegration, why Grade-5 titanium is biologically compatible, and how digital CBCT mapping safeguards bone density during implant procedures.",
    keywords: ["implants", "titanium", "osseointegration", "bone density", "cbct"],
    fullBody: [
      "In the domain of permanent oral rehabilitation, dental implants constructed from Grade-5 Titanium alloy (Ti6Al4V) represent the absolute gold standard of restorative engineering. But what makes this metal so uniquely suited to fuse with human bone tissues? The secret lies in a bio-chemical reaction known as osseointegration.",
      "When a micro-surgical implant is placed into the alveolar bone of the jaw, the titanium surface immediately reacts with oxygen, forming a microscopic layer of titanium dioxide (TiO2). This passive oxide film prevents corrosion and acts as a biocompatible scaffold. Rather than recognizing the metal as a foreign body, surrounding bone cells (osteoblasts) attach themselves directly to the oxide interface, laying down fresh bone matrix.",
      "To ensure osseointegration is predictable, our Chennai clinical node utilizes Cone Beam Computed Tomography (CBCT). This 3D bone mapping technology measures the exact bone density and thickness before surgical placement. If density is insufficient, bone augmentation protocols are scheduled to build a solid anchor.",
      "The healing timeline typically spans three to six months. During this silent healing phase, physiological forces are carefully monitored. Once full structural stability is confirmed with torque verification, a monolithic zirconia crown is coupled to the implant, restoring chewing efficiency up to 99%."
    ]
  },
  {
    id: "graphene-aligners-future",
    title: "Why Nanotube Graphene Matrix represents the future of orthodontic aligners",
    category: "Orthodontics",
    author: "Dr. Anjali Dev, MDS",
    authorTitle: "Senior Orthodontist",
    readTime: "5 Min Read",
    date: "May 18, 2026",
    summary: "How carbon-nanotube graphene polymers resolve the limitations of traditional plastics, providing orthodontic forces that are stable and resistant to cracking.",
    keywords: ["aligners", "orthodontics", "graphene", "clear braces", "biocompatible"],
    fullBody: [
      "Traditional clear aligners have revolutionized orthodontics, but they are not without limits. Standard PET-G materials are prone to subtle deformation, staining, and microscopic micro-fractures under heavy mastication stresses. Enter the next milestone of clear alignment technology: Graphene-Nanotube Matrix polymers.",
      "By blending ultra-lightweight carbon graphene nanotubes directly into medical-grade polymers, material scientists have created an aligner that is up to five times more crack-resistant than traditional clear trays. Furthermore, the polymer possesses superior elastomeric memory. This means it applies steady, gentle, continuous orthodontic forces over a longer period, reducing the sharp soreness typically felt when swapping to a new tray.",
      "At Sinora Dental Hospital, all clear aligners are designed using computerized orthodontic simulation software. By calculating exact torque parameters on crowded teeth, our design suites generate alignment sequences that reduce overall treatment duration by up to 25%.",
      "Because the graphene matrix restricts microbial biofilm adhesion, the aligners are also considerably more hygienic, preventing standard plaque odors and enamel demineralization during the orthodontic transition."
    ]
  },
  {
    id: "rct-biomechanics",
    title: "The Biomechanics of Single-Sitting Root Canal Therapies",
    category: "Root Canals",
    author: "Dr. Meera Raghavan, MDS",
    authorTitle: "Chief Endodontist",
    readTime: "4 Min Read",
    date: "April 10, 2026",
    summary: "An overview of how apex locators and flexible rotary instruments allow endodontists to safely complete root canal disinfection and sealing in a single sitting.",
    keywords: ["root canal", "rct", "apex locator", "endodontics", "pulpal infection"],
    fullBody: [
      "Historically, a root canal was viewed as a grueling, multi-appointment ordeal. Today, advanced apex locators, computerized rotaries, and deep disinfection chemistry enable clinicians to save infected teeth in a single session.",
      "Root canal therapy is essentially a micro-surgical cleaning procedure. Inside each tooth is a pulpal chamber housing blood vessels and nerves. When decay or fractures introduce oral bacteria into this zone, the pulp becomes infected, resulting in throbbing, localized pain.",
      "Under high-magnification loupes, our clinicians establish a clean access point. We use nickel-titanium (NiTi) rotary files. Unlike traditional stiff stainless steel files, NiTi files possess shape-memory flexibility, permitting them to safely navigate curved, complex root canals without stripping the inner tooth wall.",
      "To measure the precise length of each canal, a digital electronic apex locator monitors micro-electrical resistance at the root tip. This prevents over-instrumentation and ensures the thermoplastic gutta-percha sealant completely fills the canal space, permanently blocking biological entry pathways."
    ]
  },
  {
    id: "laser-debridement",
    title: "Periodontal Laser Debridement vs. Traditional Scalpel Surgery",
    category: "Hygiene",
    author: "Dr. Suresh Kumar, MDS",
    authorTitle: "Chief Laser Surgeon",
    readTime: "5 Min Read",
    date: "March 02, 2026",
    summary: "How laser-assisted pocket sterilization destroys deep plaque pathogens without sutures, leading to faster healing and zero gum bleeding.",
    keywords: ["periodontics", "laser debridement", "gum health", "bleeding gums", "scaling"],
    fullBody: [
      "Periodontitis represents a chronic bacterial infection targeting the bone and gum tissues supporting the teeth. Traditional periodontal therapies often involved invasive surgical flap procedures, using scalpels to cut back gum tissue and requiring multiple sutures to close.",
      "Modern laser dentistry has changed this paradigm. Using focused dental lasers, such as Erbium or Diode lasers, clinicians can target and vaporize only infected, diseased gum tissue without harming healthy surrounding cells. The laser's wavelength is specifically absorbed by dark pigmented anaerobic pathogens, instantly destroying the bacterial colony in deep pockets.",
      "Crucially, the laser beam cauterizes blood vessels and seals nerve endings simultaneously. This translates to an immediate reduction in post-operative pain, virtually zero bleeding, and a complete elimination of structural gum sutures.",
      "Most patients can return to standard nutritional diets on the very same evening. Furthermore, laser stimulation triggers a localized healing response in the cellular level, prompting biological reattachment of the gums to the teeth."
    ]
  },
  {
    id: "pediatric-anxiety",
    title: "Pediatric Dental Anxiety: Behavioral Protocols for Young Patients",
    category: "Pediatric",
    author: "Dr. Anjali Dev, MDS",
    authorTitle: "Child Restorative Dentist",
    readTime: "4 Min Read",
    date: "Feb 15, 2026",
    summary: "Learn about the scientific techniques used by our pediatric dental staff to manage children's dental fears and make hygiene visits a pleasant habit.",
    keywords: ["pediatric", "children dental", "anxiety", "habit counseling", "behavioral"],
    fullBody: [
      "For a child, a dental clinic can feel overwhelming—the sounds, lights, and unfamiliar instruments can easily trigger deep fears. Unmanaged dental anxiety can cause children to avoid medical treatments, leading to early childhood caries.",
      "At our Ashok Nagar clinic, we practice 'Tell-Show-Do' behavioral techniques. First, we explain each clinical instrument in friendly, non-threatening metaphors (e.g., calling our dental water sprayer a 'water hose to clean teeth castles'). Second, we demonstrate how it feels on the child's finger. Third, we perform the procedure with gentle speed.",
      "We avoid aggressive terms. By utilizing active distraction and positive reinforcement, children understand that taking care of their teeth is a fun, empowering habit.",
      "Our clinic also utilizes non-ionizing light diagnostics and pain-free composite micro-fillings. By creating a warm, playful environment, we ensure children grow up viewing dental hygiene as a positive, natural aspect of life."
    ]
  }
];

interface BlogPageProps {
  setActiveTab: (tab: any) => void;
  setAppointmentForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function BlogPage({ setActiveTab, setAppointmentForm }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const categories = ["All", "Implants", "Orthodontics", "Root Canals", "Hygiene", "Pediatric"];

  const filteredArticles = ARTICLES_LIST.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "All" || art.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleBookFromBlog = (serviceTitle: string) => {
    setSelectedArticle(null);
    setAppointmentForm((prev: any) => ({
      ...prev,
      service: serviceTitle,
      notes: `Consultation requested after reading clinical blog article.`
    }));
    setActiveTab("schedule");
  };

  return (
    <div id="blog-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-left relative">
      
      {/* Blog Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-2xl w-full relative z-10 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Header */}
              <div className="bg-slate-900 text-white p-6 relative flex-shrink-0">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="space-y-2 pr-8">
                  <span className="text-[10px] bg-brand-600 text-white px-2 py-0.5 rounded font-mono font-bold uppercase">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display leading-tight pr-4">
                    {selectedArticle.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
                
                {/* Author Block */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <div className="w-10 h-10 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold font-mono">
                    {selectedArticle.author.substring(4, 6)}
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800 text-xs">{selectedArticle.author}</span>
                    <span className="block text-[10px] text-slate-400 font-mono">{selectedArticle.authorTitle}</span>
                  </div>
                  <div className="ml-auto text-right text-[10px] font-mono text-slate-400 space-y-0.5">
                    <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /><span>{selectedArticle.readTime}</span></div>
                    <div><span>{selectedArticle.date}</span></div>
                  </div>
                </div>

                {/* Article Contents */}
                <div className="space-y-4">
                  {selectedArticle.fullBody.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {/* Keywords tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {selectedArticle.keywords.map((key, i) => (
                    <span key={i} className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg">
                      #{key}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-between items-center flex-shrink-0">
                <span className="text-[11px] text-slate-400 leading-normal max-w-sm text-center sm:text-left">
                  Have questions about this clinical protocol? Speak directly to our dental coordinators.
                </span>
                <button
                  onClick={() => handleBookFromBlog(selectedArticle.category === "Implants" ? "High-Precision Dental Implants" : selectedArticle.category === "Root Canals" ? "Advanced Root Canal Therapy" : selectedArticle.category === "Orthodontics" ? "Modern Braces & Clear Aligners" : selectedArticle.category === "Pediatric" ? "Specialized Pediatric Dentistry" : "Comprehensive Gum & Periodontal Care")}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-all cursor-pointer shadow-md shadow-brand-100"
                >
                  Schedule A Consultation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Blog Listing Header */}
      <div className="mb-12 space-y-4">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-600 uppercase block">
          CLINICAL HEALTH KNOWLEDGE BASE
        </span>
        <h1 className="text-4xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
          Dental & Oral Health Blog - Best Dental Hospital in Ashok Nagar Chennai
        </h1>
        <p className="text-slate-650 max-w-3xl leading-relaxed text-sm sm:text-base">
          Read expert-authored insights and articles about <span className="font-bold text-slate-800">Invisalign clear aligners</span>, premium <span className="font-bold text-slate-800">dental implants cost in Chennai</span>, painless <span className="font-bold text-slate-800">root canal treatment in Chennai</span>, and modern braces, written by the <span className="font-bold text-slate-800">best dentists in Ashok Nagar Chennai</span>.
        </p>

        {/* Filters and Search Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
          {/* Category Tabs */}
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
              placeholder="Filter by keywords (implant, bone)..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 border border-dashed border-slate-200 rounded-3xl bg-slate-50/30">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold">No publications matched your active criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="text-xs text-brand-600 font-bold underline mt-2"
            >
              Clear filter matrices
            </button>
          </div>
        ) : (
          filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-slate-150 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-brand-300 hover:shadow-sm text-left"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 bg-brand-50 text-brand-600 font-bold uppercase rounded">
                    {art.category}
                  </span>
                  <span>{art.date}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-brand-600">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold">{art.author.substring(0, 15)}...</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(art)}
                  className="text-xs font-mono font-bold text-brand-600 flex items-center gap-1 cursor-pointer hover:text-brand-700"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4 text-brand-600" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
