import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Graph from "../Graph/Graph";
import UserForm from "../Form/UserForm";

const AppLayout: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#1e1e1e",
        color: "#fff",
      }}
    >
      {/* Sidebar (Hobbies/Filters) */}
      <Sidebar />

      {/* Graph Area */}
      <div style={{ flex: 1, position: "relative" }}>
        <Graph />
      </div>

      {/* Right Panel - Form */}
      <div
        style={{
          width: "320px",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          padding: "1rem",
        }}
      >
        <UserForm />
      </div>
    </div>
  );
};

export default AppLayout;
