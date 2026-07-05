import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Search, 
  Download, 
  Trash2, 
  Check, 
  X, 
  ShieldAlert, 
  Database, 
  Calendar, 
  FileText, 
  Phone, 
  Mail, 
  ArrowLeft,
  ChevronDown,
  Lock,
  RefreshCw
} from "lucide-react";
import { AppointmentRecord } from "../types";

interface AdminPanelProps {
  appointments: AppointmentRecord[];
  onRefresh: () => Promise<void>;
  onBackToHome: () => void;
}

export default function AdminPanel({ appointments, onRefresh, onBackToHome }: AdminPanelProps) {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentRecord | null>(null);

  // Authentication Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Clinical passcode default
    if (passcode === "sinora_admin") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid clinical administrator passcode code. Please retry.");
    }
  };

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  // CSV Exporter
  const handleExportCSV = () => {
    try {
      if (appointments.length === 0) {
        alert("No leads database exists to export.");
        return;
      }

      const headers = ["ID", "Name", "Email", "Phone", "Date", "Time", "Clinical Service", "Notes", "Status", "Created At"];
      const rows = appointments.map(apt => [
        apt.id,
        `"${apt.name.replace(/"/g, '""')}"`,
        apt.email,
        apt.phone,
        apt.date,
        apt.time,
        `"${apt.service.replace(/"/g, '""')}"`,
        `"${(apt.notes || "").replace(/\n/g, " ").replace(/"/g, '""')}"`,
        apt.status,
        apt.createdAt || ""
      ]);

      const csvContent = 
        "data:text/csv;charset=utf-8," + 
        [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `sinora_leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("CSV Export error", error);
    }
  };

  // Filter Appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesService = serviceFilter === "all" || apt.service === serviceFilter;

    return matchesSearch && matchesService;
  });

  // Calculate high-level stats
  const totalLeads = appointments.length;
  const confirmedLeads = appointments.filter(a => a.status === "Confirmed").length;
  const pendingLeads = appointments.filter(a => a.status === "Pending").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 text-center space-y-2">
            <div className="w-12 h-12 bg-brand-500/15 rounded-2xl flex items-center justify-center mx-auto text-brand-400">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold font-display tracking-tight text-white">
              Clinical Ingress Security
            </h2>
            <p className="text-xs text-slate-400">
              Provide your administrator credentials to review scheduled lead records.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-4 text-left">
            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-800 text-xs rounded-xl flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-mono font-bold text-slate-500 uppercase">
                ADMIN ACCESS CODE (PASSHRASE)
              </label>
              <input 
                type="password"
                placeholder="Enter clinical access code..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                required
              />
              <span className="block text-[10px] text-slate-400 font-mono mt-1">
                Demo Code Hint: <code className="bg-slate-100 px-1 py-0.5 rounded font-bold text-slate-700">sinora_admin</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Verify Authority & Access Leads
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Clinic Home</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* TOP COMMAND BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-600 uppercase tracking-widest">
              <Database className="w-4 h-4" />
              <span>Lead Tracking Central Console</span>
            </div>
            <h1 className="text-3xl font-extrabold font-display tracking-tight text-slate-900">
              Clinical Ingress Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefreshData}
              disabled={isRefreshing}
              className="p-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer text-xs font-semibold"
              title="Reload live database from memory cache"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-brand-600" : ""}`} />
              <span>Refresh Leads</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider"
              title="Download entire sheet as standard CSV format"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Export CSV sheet</span>
            </button>

            <button
              onClick={onBackToHome}
              className="px-4 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        {/* METRICS CARD SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">TOTAL INGRESS LEADS</span>
            <span className="block text-3xl font-bold text-slate-900 font-mono">{totalLeads}</span>
            <span className="block text-[10px] text-slate-400">Total clinical bookings entered on server.</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
              <Check className="w-5 h-5" />
            </div>
            <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">CONFIRMED VISITS</span>
            <span className="block text-3xl font-bold text-emerald-600 font-mono">{confirmedLeads}</span>
            <span className="block text-[10px] text-slate-400">Active synced appointment dates confirmed.</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs space-y-2 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <FileText className="w-5 h-5" />
            </div>
            <span className="block text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">PENDING SECTOR</span>
            <span className="block text-3xl font-bold text-amber-600 font-mono">{pendingLeads}</span>
            <span className="block text-[10px] text-slate-400">Inquiries requiring clinical triage verify.</span>
          </div>
        </div>

        {/* SEARCH AND FILTERS PANEL */}
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name, email, phone, or Ticket ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Service filter selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs text-slate-400 font-mono font-bold uppercase">FILTER SERVICE:</span>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-transparent cursor-pointer"
            >
              <option value="all">Show All Treatments</option>
              <option value="High-Precision Dental Implants">Dental Implants</option>
              <option value="Advanced Root Canal Therapy">Root Canal Therapy</option>
              <option value="Modern Braces & Clear Aligners">Braces & Aligners</option>
              <option value="Specialized Pediatric Dentistry">Pediatric Dentistry</option>
              <option value="Comprehensive Gum & Periodontal Care">Gum & Periodontal Care</option>
            </select>
          </div>
        </div>

        {/* LEADS LIST CONTAINER */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-md overflow-hidden">
          {filteredAppointments.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Database className="w-8 h-8" />
              </div>
              <p className="text-slate-500 font-semibold text-sm">No registered leads found matching filters.</p>
              <p className="text-slate-400 text-xs">Verify your search terms or schedule test appointments.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-[10px] font-mono tracking-wider uppercase border-b border-slate-800">
                    <th className="p-4">Ticket ID</th>
                    <th className="p-4">Patient Profile</th>
                    <th className="p-4">Contact Indicators</th>
                    <th className="p-4">Clinical Pathway</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Ticket ID */}
                      <td className="p-4 font-mono font-bold text-brand-700">
                        {apt.id}
                      </td>

                      {/* Patient Name */}
                      <td className="p-4">
                        <span className="font-bold text-slate-900 block">{apt.name}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Registered: {apt.createdAt ? new Date(apt.createdAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : "N/A"}
                        </span>
                      </td>

                      {/* Contact Indicators */}
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{apt.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate max-w-[150px]">{apt.email}</span>
                        </div>
                      </td>

                      {/* Treatment Service */}
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200/50 text-slate-700 font-medium block w-fit text-[11px]">
                          {apt.service}
                        </span>
                      </td>

                      {/* Date & Time Slot */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 text-slate-800 font-semibold font-sans">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{apt.date}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5 pl-5">
                          Time: {apt.time}
                        </div>
                      </td>

                      {/* Status badge */}
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase inline-block ${
                          apt.status === "Confirmed" 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                            : apt.status === "Cancelled"
                            ? "bg-rose-50 text-rose-700 border border-rose-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>
                          {apt.status}
                        </span>
                      </td>

                      {/* Details expand click */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedAppointment(apt)}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                        >
                          View Notes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* LEAD DETAILS DIALOG BACKDROP MODAL */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setSelectedAppointment(null)}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
          ></div>
          
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-lg w-full relative z-10 overflow-hidden text-left">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <div>
                <span className="block text-[8px] font-mono text-slate-400 uppercase">TICKET ENQUIRY</span>
                <span className="text-sm font-bold font-mono text-brand-400">{selectedAppointment.id}</span>
              </div>
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">PATIENT PROFILE</span>
                <p className="text-base font-bold text-slate-800">{selectedAppointment.name}</p>
                <p className="text-xs text-slate-500">Email: {selectedAppointment.email} | Phone: {selectedAppointment.phone}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">SCHEDULED TIME</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedAppointment.date} @ {selectedAppointment.time}</p>
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">CLINICAL PATHWAY</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedAppointment.service}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1">
                <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">NOTES & CHIPS INJECTED</span>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 max-h-40 overflow-y-auto">
                  <p className="text-xs text-slate-600 leading-relaxed font-sans whitespace-pre-wrap">
                    {selectedAppointment.notes || "No extra diagnostic symptoms or preferences noted."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 font-semibold"
              >
                Close Dialog
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
