// src/Certificate.js
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./Certificate.css";

export default function Certificate() {
  const [studentName, setStudentName] = useState("");

  const generatePDF = () => {
    const doc = new jsPDF("landscape", "pt", "a4");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // 🌅 Sunset gradient background (light orange -> soft yellow)
    const steps = 30; // number of gradient bands
    for (let i = 0; i < steps; i++) {
      const ratio = i / steps;
      const r = Math.round(255 - ratio * 30); // from 255 → 225
      const g = Math.round(200 + ratio * 55); // from 200 → 255
      const b = Math.round(100 + ratio * 50); // from 100 → 150
      doc.setFillColor(r, g, b);
      doc.rect(0, (pageHeight / steps) * i, pageWidth, pageHeight / steps, "F");
    }

    // Border
    doc.setLineWidth(4);
    doc.rect(20, 20, pageWidth - 40, pageHeight - 40, "S");

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.text("Certificate of Completion", pageWidth / 2, 120, { align: "center" });

    // Subtitle
    doc.setFontSize(18);
    doc.setFont("times", "normal");
    doc.text("This is proudly presented to", pageWidth / 2, 180, { align: "center" });

    // Student Name
    doc.setFont("times", "bolditalic");
    doc.setFontSize(26);
    doc.text(studentName || "Student Name", pageWidth / 2, 240, { align: "center" });

    // Content
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text(
      "for successfully completing all Virtual Lab Experiments and Quiz",
      pageWidth / 2,
      300,
      { align: "center" }
    );

    // Date
    const date = new Date().toLocaleDateString();
    doc.setFontSize(14);
    doc.text(`Date: ${date}`, pageWidth / 2, 360, { align: "center" });

    // Signature line
    doc.setFontSize(14);
    doc.text("__________________", pageWidth - 150, 440, { align: "center" });
    doc.text("Instructor", pageWidth - 150, 460, { align: "center" });

    // Footer
    doc.setFontSize(12);
    doc.text("Virtual Lab Project", pageWidth / 2, pageHeight - 40, { align: "center" });

    doc.save("certificate.pdf");
  };

  return (
    <div className="certificate-page">
      <h2>🎓 Certificate Generator</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button onClick={generatePDF}>Generate Fancy Certificate</button>
    </div>
  );
}
