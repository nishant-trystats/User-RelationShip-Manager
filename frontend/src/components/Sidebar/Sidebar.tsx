import React from "react";

interface SidebarProps {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ refresh, setRefresh }) => {
  const hobbies = ["Reading", "Gaming", "Travel", "Music", "Cooking"];

  return (
    <div
      style={{
        width: "250px",
        padding: "1rem",
        borderRight: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.05)",
      }}
    >
      <h3 style={{ color: "#646cff", marginBottom: "1rem" }}>Hobbies</h3>
      <small style={{ opacity: 0.7 }}>Drag onto a user node</small>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "0.5rem" }}>
        {hobbies.map((hobby) => (
          <li
            key={hobby}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("hobby", hobby)}
            onDragEnd={() => {
              setTimeout(() => setRefresh(!refresh), 500);
            }}
            style={{
              background: "#2a2a2a",
              marginBottom: "0.5rem",
              padding: "0.5rem",
              borderRadius: "5px",
              cursor: "grab",
              transition: "transform 0.1s",
            }}
            onMouseDown={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = "scale(0.97)")
            }
            onMouseUp={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
            }
          >
            {hobby}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
