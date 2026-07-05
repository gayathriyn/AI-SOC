import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

import PacketTable from "./components/PacketTable";
import ThreatPieChart from "./components/ThreatPieChart";
import PacketLineChart from "./components/PacketLineChart";
import TopSourceIPs from "./components/TopSourceIPs";
import TopDestinationIPs from "./components/TopDestinationIPs";
import DownloadReport from "./components/DownloadReport";
import SystemStatus from "./components/SystemStatus";

function App() {
  const [summary, setSummary] = useState({
    total_packets: 0,
    high_threats: 0,
    medium_threats: 0,
    low_threats: 0,
  });

  useEffect(() => {
    loadSummary();

    const interval = setInterval(() => {
      loadSummary();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadSummary() {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/threats/summary"
      );

      setSummary(response.data);
    } catch (error) {
      console.error("Error loading summary:", error);
    }
  }

  return (
    <div className="container">
      <h1>🛡️ AI-SOC Dashboard</h1>

      {/* Summary Cards */}
      <div className="cards">
        <div className="card">
          <h2>Total Packets</h2>
          <h1>{summary.total_packets}</h1>
        </div>

        <div className="card high">
          <h2>High Threats</h2>
          <h1>{summary.high_threats}</h1>
        </div>

        <div className="card medium">
          <h2>Medium Threats</h2>
          <h1>{summary.medium_threats}</h1>
        </div>

        <div className="card low">
          <h2>Low Threats</h2>
          <h1>{summary.low_threats}</h1>
        </div>
      </div>

      {/* Download Report */}
      <div style={{ marginBottom: "25px", textAlign: "center" }}>
        <DownloadReport summary={summary} />
      </div>

      {/* First Row of Charts */}
      <div className="charts">
        <ThreatPieChart />
        <PacketLineChart />
      </div>

      {/* Second Row of Charts */}
      <div className="charts">
        <TopSourceIPs />
        <TopDestinationIPs />
      </div>

      {/* System Status */}
      <div className="charts">
        <SystemStatus />
      </div>

      {/* Packet Table */}
      <PacketTable />
    </div>
  );
}

export default App;