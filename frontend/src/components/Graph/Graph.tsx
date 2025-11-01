import React, { useEffect, useCallback, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,

  Controls,
  Background,
} from "reactflow";
import type {  Connection} from "reactflow";
import "reactflow/dist/style.css";
import NodeCustom from "./NodeCustom";
import NodeLegend from "./NodeLegend";
import { api } from "../../api/api";

const nodeTypes = { custom: NodeCustom };

const Graph: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);

  // Load users + relations
  const fetchGraph = async () => {
    setLoading(true);
    try {
      const res = await api.getGraph();
      const { users, relations } = res.data;

const radius = 300; // adjust circle size
const centerX = 600; // X-center of circle
const centerY = 400; // Y-center of circle

const mappedNodes = users.map((u: any, i: number) => {
  const angle = (2 * Math.PI * i) / users.length;
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  return {
    id: u._id,
    type: "custom",
    position: { x, y },
    data: {
      username: u.username,
      age: u.age,
      popularityScore: u.popularityScore ?? 0,
      hobbies: u.hobbies,
    },
  };
});


      const mappedEdges = relations.map((r: any, i: number) => ({
        id: `e-${r.from}-${r.to}-${i}`,
        source: r.from,
        target: r.to,
      }));

      setNodes(mappedNodes);
      setEdges(mappedEdges);
    } catch (err) {
      console.error("Failed to load graph:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, []);

  // Connect event → backend relation
  const onConnect = useCallback(async (params: Connection) => {
    try {
      await api.linkUsers(params.target, params.source);
      setEdges((eds) => addEdge(params, eds));
    } catch (err) {
      alert("Error creating relation");
    }
  }, [setEdges]);

  if (loading) return <div>Loading graph...</div>;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <Background />
        <NodeLegend />
      </ReactFlow>
    </div>
  );
};

export default Graph;
