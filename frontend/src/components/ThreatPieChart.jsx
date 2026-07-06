import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

function ThreatPieChart() {
  const [data, setData] = useState([]);

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
        "https://ai-soc-x006.onrender.com/threats/summary"
      );

      setData([
        {
          name: "Low",
          value: response.data.low_threats,
        },
        {
          name: "Medium",
          value: response.data.medium_threats,
        },
        {
          name: "High",
          value: response.data.high_threats,
        },
      ]);
    } catch (error) {
      console.error("Error loading threat summary:", error);
    }
  }

  return (
    <div className="chart-card">
      <h2>Threat Distribution</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name) => [`${value} Packets`, name]}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatPieChart;