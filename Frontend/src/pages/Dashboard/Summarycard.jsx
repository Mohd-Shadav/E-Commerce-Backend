import React from "react";

const cardStyle = {
    background: "linear-gradient(135deg, #e0e7ef 100%)",
    borderRadius: "18px",
    boxShadow: "0 6px 24px rgba(30, 41, 59, 0.08)",
    padding: "2rem 1.5rem",
    minWidth: "220px",
    textAlign: "center",
    transition: "transform 0.3s cubic-bezier(.4,2.3,.3,1), box-shadow 0.3s",
    cursor: "pointer",
};

const headingStyle = {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#334155",
    marginBottom: "0.5rem",
    letterSpacing: "0.5px",
};

const numberStyle = {
   
    fontWeight: 700,
    color: "#2563eb",
    margin: 0,
    transition: "transform 0.5s cubic-bezier(.4,2.3,.3,1)",
};

export default function SummaryCard({ heading, value }) {
    const [hovered, setHovered] = React.useState(false);

    return (
        <div
            style={{
                ...cardStyle,
                transform: hovered ? "translateY(-8px) scale(1.04)" : "none",
                boxShadow: hovered
                    ? "0 12px 32px rgba(30, 41, 59, 0.14)"
                    : cardStyle.boxShadow,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div style={headingStyle}>{heading}</div>
            <div
                style={{
                    ...numberStyle,fontSize: "2.5rem",
                    transform: hovered ? "scale(1.15)" : "scale(1)",
                }}
            >
                {value}
            </div>
        </div>
    );
}