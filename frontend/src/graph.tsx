import { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import type { Node, Edge, Connection } from "reactflow";

import "reactflow/dist/style.css";

// 🟢 Initial nodes
const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" }, type: "default" },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" }, type: "default" },
  { id: "3", position: { x: 200, y: 100 }, data: { label: "3" }, type: "default" },
];

// 🟣 Initial edges
const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "default" },
  { id: "e1-3", source: "1", target: "3", type: "default" },
];

function Flow() {
  // ✅ Correct destructuring (3 values)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // ✅ Connection handler
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div
      style={{
        width: "50%",
        height: "50%",
        border: "5px solid black",
        margin: "auto",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Flow;
