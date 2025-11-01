import React from "react";

const Loader: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#646cff",
        fontSize: "1.2rem",
      }}
    >
      <div className="spinner" style={{ animation: "spin 1s linear infinite" }}>
        ⏳ Loading...
      </div>
    </div>
  );
};

export default Loader;
