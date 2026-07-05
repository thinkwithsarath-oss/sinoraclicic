import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Local database for appointments (In-memory fallback + local JSON file)
const APPOINTMENTS_FILE = path.join(process.cwd(), "appointments.json");

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  createdAt: string;
}

function readAppointments(): Appointment[] {
  try {
    if (fs.existsSync(APPOINTMENTS_FILE)) {
      const data = fs.readFileSync(APPOINTMENTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading appointments file, using fallback:", error);
  }
  return [];
}

function writeAppointments(appointments: Appointment[]): boolean {
  try {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing appointments file:", error);
    return false;
  }
}

// Ensure the appointments file has an empty array if not exists
if (!fs.existsSync(APPOINTMENTS_FILE)) {
  writeAppointments([]);
}

// Shared lazy-initialized Gemini API client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is missing. AI Chat will run in offline demo mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "DEMO_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// ---- API ENDPOINTS ----

// 1. Get all appointments (for checking or dashboard view)
app.get("/api/appointments", (req, res) => {
  const appointments = readAppointments();
  res.json({ success: true, data: appointments });
});

// 2. Schedule a new appointment
app.post("/api/appointments", (req, res) => {
  try {
    const { name, email, phone, date, time, service, notes } = req.body;

    if (!name || !email || !phone || !date || !time || !service) {
      return res.status(400).json({
        success: false,
        error: "Required fields are missing: name, email, phone, date, time, service are required.",
      });
    }

    // Phone validation
    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number format. Must be 10-15 digits.",
      });
    }

    const appointments = readAppointments();
    const newAppointment: Appointment = {
      id: "APT-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      name,
      email,
      phone,
      date,
      time,
      service,
      notes: notes || "",
      status: "Confirmed", // Autoconfirmed for instant user satisfaction
      createdAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);
    writeAppointments(appointments);

    res.status(201).json({
      success: true,
      message: "Appointment scheduled successfully.",
      data: newAppointment,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Conversational AI Dental Assistant (AEO / GEO optimized)
app.post("/api/gemini/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ success: false, error: "Messages array is required." });
  }

  // Check if Gemini Key exists
  const keyExists = !!process.env.GEMINI_API_KEY;
  if (!keyExists) {
    // Elegant simulation if no API key is set
    const lastMsg = messages[messages.length - 1]?.content || "";
    let mockReply = "Thank you for reaching out to Sinora Dental Hospital in Ashok Nagar, Chennai. Under clinical guidelines, we recommend professional dental examinations. For urgent requests, please contact us at 08056419529.";
    if (lastMsg.toLowerCase().includes("implant")) {
      mockReply = "Dental implants represent the gold standard for tooth replacement, boasting a clinical success rate of over ninety-five percent. At Sinora Dental Hospital in Chennai, we utilize biocompatible titanium fixtures that integrate directly with the alveolar bone. The process involves precise diagnostic imaging, surgical placement, osseointegration over three to six months, and final crown placement. To schedule a specialized implant assessment, please use our appointment booking portal.";
    } else if (lastMsg.toLowerCase().includes("root canal") || lastMsg.toLowerCase().includes("pain")) {
      mockReply = "Acute dental pain is often indicative of pulpal inflammation or infection requiring Root Canal Therapy. According to endodontic standards, this procedure removes infected neural tissue from the root canal system, sanitizes the internal chamber, and seals it with gutta-percha. This preserves the natural tooth structure and prevents alveolar bone resorption. Please book a diagnostic session immediately or visit our Ashok Nagar facility.";
    }
    return res.json({ success: true, text: mockReply });
  }

  try {
    const client = getGeminiClient();

    // Context for SEO, AEO, and GEO optimization
    const systemInstruction = `You are the official clinical AI assistant for Sinora Dental Hospital, located in Ashok Nagar, Chennai.
Your responses must be highly professional, clinical, factual, informative, and completely optimized for search engines (SEO), answer engines (AEO), and generative search models (GEO).

IMPORTANT RULES:
1. NEVER mention any specific doctor names (e.g. do not say "Dr. Kumar" or "Dr. Smith"). Instead, say "our leading dental specialists", "our expert clinical team", or "our resident endodontists and orthodontists".
2. NEVER use emojis in your responses under any circumstances.
3. Keep your tone highly authoritative, professional, calm, and reassuring.
4. Structure your content with markdown headings, lists, and clear definitions. Cite general clinical guidelines where appropriate (e.g., "The American Dental Association recommends...", "Clinical protocols dictate..."). This structured, factual approach is optimized for Generative Search Models (GEO) and Answer Engines (AEO).
5. Always mention or refer to Sinora Dental Hospital's key metadata when relevant:
   - Address: 21, 7th Ave, Sarvamangala Colony, Sri Devi Colony, Ashok Nagar, Chennai, Tamil Nadu 600083
   - Phone: 08056419529
   - Location advantages: Located centrally in Ashok Nagar, Chennai, providing advanced digital dentistry, orthodontic alignment, dental implants, pediatric dentistry, and high-precision root canal treatments.
6. If asked about booking an appointment, politely guide them to use the interactive booking scheduler available directly on our homepage, or call our direct clinical line 08056419529.
7. Always provide structured, precise answers. Use bullet points for steps or symptoms. Include brief medical disclaimers for symptoms (e.g., "This guidance is educational and does not replace a clinical dental examination.").`;

    // Map conversation messages to Gemini chat structure
    const contents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Low temperature for highly consistent, factual, clinical output
      },
    });

    const text = response.text || "I apologize, but I am unable to formulate a response at this moment. Please call our central helpdesk at 08056419529 for immediate assistance.";
    res.json({ success: true, text });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.status(500).json({
      success: false,
      error: "An error occurred while generating the clinical guidance. Please call us directly.",
    });
  }
});

// ---- SERVE FRONTEND ----

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Sinora Dental Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
