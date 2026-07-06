import { useEffect, useState } from "react";
import axios from "axios";

function PacketTable() {
  const [packets, setPackets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    loadPackets();

    const interval = setInterval(loadPackets, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadPackets() {
    try {
      const response = await axios.get(
        "https://ai-soc-x006.onrender.com/packets"
      );

      setPackets(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function badge(level) {
    if (level === "HIGH")
      return <span className="badge high">HIGH</span>;

    if (level === "MEDIUM")
      return <span className="badge medium">MEDIUM</span>;

    return <span className="badge low">LOW</span>;
  }

  function aiBadge(prediction) {
    if (prediction === "Suspicious")
      return (
        <span
          style={{
            color: "#ef4444",
            fontWeight: "bold",
          }}
        >
          🤖 Suspicious
        </span>
      );

    return (
      <span
        style={{
          color: "#22c55e",
          fontWeight: "bold",
        }}
      >
        🤖 Normal
      </span>
    );
  }

  const filteredPackets = packets.filter((packet) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      packet.source_ip.toLowerCase().includes(searchText) ||
      packet.destination_ip.toLowerCase().includes(searchText) ||
      packet.protocol.toLowerCase().includes(searchText) ||
      packet.threat_level.toLowerCase().includes(searchText) ||
      packet.ai_prediction.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "ALL" || packet.threat_level === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="table-container">
      <h2>Recent Packets</h2>

      <div className="filter-buttons">
        <button onClick={() => setFilter("ALL")}>All</button>

        <button onClick={() => setFilter("LOW")}>Low</button>

        <button onClick={() => setFilter("MEDIUM")}>Medium</button>

        <button onClick={() => setFilter("HIGH")}>High</button>
      </div>

      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search by IP, Protocol, Threat or AI Prediction..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Source IP</th>
            <th>Destination IP</th>
            <th>Protocol</th>
            <th>Threat</th>
            <th>AI Prediction</th>
            <th>Confidence</th>
            <th>Packet Size</th>
          </tr>
        </thead>

        <tbody>
          {filteredPackets.map((packet) => (
            <tr key={packet.id}>
              <td>{packet.source_ip}</td>

              <td>{packet.destination_ip}</td>

              <td>{packet.protocol}</td>

              <td>{badge(packet.threat_level)}</td>

              <td>{aiBadge(packet.ai_prediction)}</td>

              <td>{packet.ai_confidence}%</td>

              <td>{packet.packet_size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PacketTable;