import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function PacketLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadPackets();

    const interval = setInterval(() => {
      loadPackets();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadPackets() {
    try {
      const response = await axios.get(
        "https://ai-soc-x006.onrender.com/packets"
      );

      const chartData = response.data
        .slice()
        .reverse()
        .map((packet, index) => ({
          packet: index + 1,
          size: packet.packet_size,
        }));

      setData(chartData);
    } catch (error) {
      console.error("Error loading packet data:", error);
    }
  }

  return (
    <div className="chart-card">
      <h2>Packet Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />

          <XAxis
            dataKey="packet"
            stroke="#ffffff"
          />

          <YAxis
            stroke="#ffffff"
          />

          <Tooltip
            formatter={(value) => [`${value} Bytes`, "Packet Size"]}
          />

          <Line
            type="monotone"
            dataKey="size"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PacketLineChart;