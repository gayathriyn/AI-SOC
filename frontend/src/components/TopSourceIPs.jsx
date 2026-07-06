import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TopSourceIPs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();

    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadData() {
    try {
      const response = await axios.get(
        "https://ai-soc-x006.onrender.com/packets/top-source"
      );

      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="chart-card">
      <h2>Top Source IPs</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="ip" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopSourceIPs;