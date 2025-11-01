import React from "react";

const NodeLegend: React.FC = () => {
  const items = [
    { color: "#4caf50", label: "High (8+)" },
    { color: "#2196f3", label: "Medium (5–8)" },
    { color: "#ff9800", label: "Low (3–5)" },
    { color: "#f44336", label: "Very Low (<3)" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        background: "rgba(255,255,255,0.08)",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        fontSize: "0.8rem",
      }}
    >
      <strong>Popularity Legend</strong>
      {items.map((item) => (
        <div key={item.color} style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: item.color,
              marginRight: 6,
            }}
          ></span>
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default NodeLegend;
