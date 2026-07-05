import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function DownloadReport({ summary }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // ==========================
    // HEADER
    // ==========================

    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("AI-SOC", 20, 18);

    doc.setFontSize(11);
    doc.text("AI Powered Security Operations Center", 20, 25);

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // ==========================
    // REPORT INFO
    // ==========================

    doc.setFontSize(18);
    doc.text("Security Analysis Report", 20, 45);

    doc.setFontSize(11);

    doc.text(
      `Generated On: ${new Date().toLocaleString()}`,
      20,
      55
    );

    // ==========================
    // THREAT SUMMARY
    // ==========================

    doc.setFontSize(15);
    doc.text("Threat Summary", 20, 72);

    autoTable(doc, {
      startY: 78,

      head: [["Metric", "Value"]],

      body: [
        ["Total Packets", summary.total_packets],
        ["High Threats", summary.high_threats],
        ["Medium Threats", summary.medium_threats],
        ["Low Threats", summary.low_threats],
      ],

      headStyles: {
        fillColor: [37, 99, 235],
      },
    });

    // ==========================
    // AI SUMMARY
    // ==========================

    let y = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(15);
    doc.text("AI Analysis", 20, y);

    autoTable(doc, {
      startY: y + 5,

      head: [["AI Metric", "Value"]],

      body: [
        [
          "Detection Engine",
          "Isolation Forest"
        ],

        [
          "AI Status",
          "Active"
        ],

        [
          "Confidence",
          "Real-Time Prediction"
        ],
      ],

      headStyles: {
        fillColor: [16, 185, 129],
      },
    });

    // ==========================
    // SYSTEM STATUS
    // ==========================

    y = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(15);
    doc.text("System Status", 20, y);

    autoTable(doc, {
      startY: y + 5,

      head: [["Component", "Status"]],

      body: [
        ["Backend API", "Online"],
        ["Database", "Connected"],
        ["AI Engine", "Running"],
        ["Dashboard", "Active"],
      ],

      headStyles: {
        fillColor: [245, 158, 11],
      },
    });

    // ==========================
    // FOOTER
    // ==========================

    y = doc.lastAutoTable.finalY + 25;

    doc.setFontSize(10);

    doc.text(
      "Generated automatically by AI-SOC Dashboard",
      20,
      y
    );

    doc.text(
      "Version 1.0",
      20,
      y + 8
    );

    doc.text(
      "© 2026 AI-SOC",
      20,
      y + 16
    );

    doc.save("AI-SOC_Security_Report.pdf");
  };

  return (
    <button
      className="download-btn"
      onClick={generatePDF}
    >
      📄 Download Security Report
    </button>
  );
}

export default DownloadReport;