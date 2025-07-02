import React from "react";

const card = {
  background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)",
  borderRadius: "16px",
  padding: "20px",
  display: "flex",
  height: "200px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  boxShadow: "8px 8px 20px rgba(0,0,0,0.08), -6px -6px 16px rgba(255,255,255,0.8)",
  transition: "all 0.3s ease-in-out",
  transform: "translateZ(0)",
};

const cardHover = {
  ...card,
  boxShadow: "12px 12px 24px rgba(0,0,0,0.15), -6px -6px 16px rgba(255,255,255,0.9)",
  transform: "scale(1.03)",
};

const iconValueStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "1.4rem",
  color: "#333",
};

const iconWrapper = {
  backgroundColor: "#f0f4ff",
  padding: "10px",
  borderRadius: "12px",
  boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.08), inset -2px -2px 6px rgba(255,255,255,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function DashboardOrdersCard({ heading, icon, value }) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      style={hover ? cardHover : card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={iconValueStyle}>
        <div style={iconWrapper}>{icon}</div>
      <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#444" }}>{heading}</h4>
      </div>
        <p style={{ margin: 0, fontWeight: 600,fontSize:"3rem",color:"grey" }}>{value}</p>
    </div>
  );
}

export default DashboardOrdersCard;
