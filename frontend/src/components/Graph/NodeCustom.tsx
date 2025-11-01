import React from "react";
import { Handle, Position } from "reactflow";
import { getNodeColor } from "../../utils/colors";
import { api } from "../../api/api";

interface NodeProps {
  data: {
    label: string;
    username: string;
    age: number;
    popularityScore: number;
    hobbies?: string[];
    onDropHobby?: (hobby: string, nodeId: string) => void;
  };
  id: string;
}

const NodeCustom: React.FC<NodeProps> = ({ data, id }) => {
  const color = getNodeColor(data.popularityScore);

  // 📏 Node size scales with popularity
  const baseSize = 100;
  const scaleFactor = 5;
  const maxSize = 220;
  const size = Math.min(baseSize + data.popularityScore * scaleFactor, maxSize);

  // 🎯 Copy ID on double-click
  const handleDoubleClick = async () => {
    try {
      await navigator.clipboard.writeText(id);
      // Optional toast or alert — for now we keep it simple:
      alert(`🆔 User ID copied: ${id}`);
    } catch (err) {
      console.error("Failed to copy ID:", err);
      alert("❌ Failed to copy ID");
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    const hobby = e.dataTransfer.getData("hobby");
    if (!hobby) return;
    try {
      await api.updateUser(id, { $push: { hobbies: hobby } });
      alert(`Added ${hobby} to ${data.username}`);
    } catch {
      alert("Error adding hobby");
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDoubleClick={handleDoubleClick}
      style={{
        padding: "10px",
        borderRadius: "12px",
        background: color,
        color: "#fff",
        width: `${size}px`,
        minHeight: `${size * 0.6}px`,
        textAlign: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: `scale(${1 + data.popularityScore * 0.01})`, // subtle growth
        userSelect: "none",
      }}
      title={`👤 ${data.username}\n🆔 ID: ${id}\n⭐ Popularity: ${data.popularityScore}\n🎂 Age: ${data.age}`}
    >
      <strong>{data.username}</strong>
      <div style={{ fontSize: "0.8rem" }}>Age: {data.age}</div>

      <div
        style={{
          fontSize: "0.75rem",
          opacity: 0.8,
          wordBreak: "break-all",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "normal",
          marginTop: "2px",
        }}
      >
        🆔 {id}
      </div>

      <div style={{ fontSize: "0.8rem" }}>
        ⭐ Popularity: {data.popularityScore}
      </div>

      {data.hobbies && data.hobbies.length > 0 && (
        <div
          style={{
            marginTop: "0.3rem",
            fontSize: "0.7rem",
            opacity: 0.9,
          }}
        >
          {data.hobbies.slice(0, 2).join(", ")}
          {data.hobbies.length > 2 && " ..."}
        </div>
      )}

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default NodeCustom;
