import type { Node, Edge } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 150, y: 100 },
    type: "custom",
    data: {
      username: "Alice",
      age: 24,
      popularityScore: 7.5,
      hobbies: ["Reading", "Music"],
      label: "Alice",
    },
  },
  {
    id: "2",
    position: { x: 400, y: 200 },
    type: "custom",
    data: {
      username: "Bob",
      age: 28,
      popularityScore: 3.0,
      hobbies: ["Gaming", "Cooking"],
      label: "Bob",
    },
  },
  {
    id: "3",
    position: { x: 700, y: 100 },
    type: "custom",
    data: {
      username: "Charlie",
      age: 21,
      popularityScore: 9.2,
      hobbies: ["Travel", "Music"],
      label: "Charlie",
    },
  },
];

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];
