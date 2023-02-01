import { motion } from "framer-motion";
import { Line } from "react-lineto";

interface Node {
  id: number;
  position: number[];
  radius: number;
  active?: boolean;
}

export default function Graphs() {
  let activeNode = -1;
  let dragging = false;
  let draggingExistingNode = false;
  let mode = 0;

  const nodes: Node[] = [
    { id: 1, position: [100, 200], radius: 40 },
    { id: 2, position: [200, 150], radius: 40 },
    { id: 3, position: [300, 300], radius: 40 },
  ];
  const connections = [
    [1, 2],
    [2, 3],
  ];

  function dragListener(
    e: MouseEvent | TouchEvent | PointerEvent,
    nodeId: number
  ) {
    if (e instanceof MouseEvent || e instanceof PointerEvent) {
      const node = nodes.find((node) => node.id === nodeId);
      if (!node) return;
      node.position = [e.clientX, e.clientY];
    }
  }

  return (
    <div>
      <h1>Graphs</h1>
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh]">
        {connections.map((conn, key) => {
          const startNode = nodes.find((node) => node.id === conn[0]);
          const endNode = nodes.find((node) => node.id === conn[1]);
          if (!startNode || !endNode) return;
          return (
            <svg className="absolute top-6 left-6 w-full h-full">
              <line
                x1={startNode.position[0]}
                y1={startNode.position[1]}
                x2={endNode.position[0]}
                y2={endNode.position[1]}
                style={{ stroke: "rgb(0,0,0)", strokeWidth: 4 }}
              />
            </svg>
          );
        })}
        {nodes.map((node, key) => (
          <motion.div
            drag
            dragMomentum={false}
            onDrag={(e) => dragListener(e, node.id)}
            id={node.id.toString()}
            key={node.id}
            whileDrag={{ scale: 1.2, zIndex: 10 }}
            animate={{ x: node.position[0], y: node.position[1] }}
            className={`absolute flex justify-center items-center top-0 left-0 bg-gray-200 active:bg-white transition-colors border-2 border-black w-12 h-12 rounded-full }]`}
          >
            <span>{node.id}</span>
            <motion.div
              // animate={{ x: node.position[0], y: node.position[1] }}
              className="absolute w-16 h-16 rounded-full"
            ></motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
