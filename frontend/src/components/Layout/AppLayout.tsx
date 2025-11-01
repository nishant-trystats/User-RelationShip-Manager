import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Graph from "../Graph/Graph";
import UserForm from "../Form/UserForm";
import { useState } from "react";

const AppLayout: React.FC = () => {
  const [refresh, setRefresh] = useState(true);

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
      <Sidebar setRefresh={setRefresh} refresh={refresh} />

      {/* Graph Area */}
      <div style={{ flex: 1, position: "relative" }}>
        <Graph refresh={refresh} />
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
        <UserForm refresh={refresh} setRefresh={setRefresh} />
      </div>
    </div>
  );
};

export default AppLayout;
