function SystemStatus() {
  const services = [
    { name: "Backend API", status: "Online" },
    { name: "PostgreSQL", status: "Connected" },
    { name: "AI Engine", status: "Running" },
    { name: "Packet Capture", status: "Active" },
    { name: "Threat Detector", status: "Active" },
  ];

  return (
    <div className="status-card">
      <h2>System Status</h2>

      {services.map((service, index) => (
        <div className="status-row" key={index}>
          <span>{service.name}</span>

          <span className="online">
            🟢 {service.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SystemStatus;