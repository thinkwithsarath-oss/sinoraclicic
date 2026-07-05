/**
 * Formats a JS Date object to the standard ICS format: YYYYMMDDTHHmmSSZ
 */
function formatICSDate(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

/**
 * Generates an object URL for a downloadable .ics calendar file
 */
export function generateICSLink(appointment: {
  id: string;
  name: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
}): string {
  try {
    const dateStr = appointment.date; // e.g., "2026-07-06"
    const timeStr = appointment.time; // e.g., "10:00 AM" or "02:00 PM"
    
    // Parse time components
    const [timeVal, modifier] = timeStr.split(" ");
    let [hoursStr, minutesStr] = timeVal.split(":");
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    
    if (modifier === "PM" && hours < 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
    
    // Create Date objects in local time
    const startObj = new Date(dateStr);
    startObj.setHours(hours, minutes, 0, 0);
    
    // Default appointment duration is 1 hour (60 minutes)
    const endObj = new Date(startObj.getTime() + 60 * 60 * 1000);
    
    const cleanNotes = (appointment.notes || "")
      .replace(/\r?\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
    const cleanService = appointment.service.replace(/,/g, "\\,").replace(/;/g, "\\;");
    const cleanName = appointment.name.replace(/,/g, "\\,").replace(/;/g, "\\;");

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sinora Dental Hospital//Clinical Appointment Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${appointment.id}@sinoradental.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(startObj)}`,
      `DTEND:${formatICSDate(endObj)}`,
      `SUMMARY:Sinora Dental Appointment - ${cleanService}`,
      `DESCRIPTION:Patient: ${cleanName}\\nTreatment: ${cleanService}\\nNotes: ${cleanNotes}\\nClinical Support Phone: 08056419529`,
      "LOCATION:21\\, 7th Ave\\, Sarvamangala Colony\\, Sri Devi Colony\\, Ashok Nagar\\, Chennai\\, Tamil Nadu 600083\\, India",
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-PT2H", // Remind 2 hours before
      "ACTION:DISPLAY",
      "DESCRIPTION:Reminder: Your dental appointment at Sinora Dental Hospital is in 2 hours.",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error generating calendar file link:", error);
    return "#";
  }
}
