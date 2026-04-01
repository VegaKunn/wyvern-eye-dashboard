"use client";

import { useEffect, useState } from "react";

function TreeNode({ node }) {
  return (
    <div className="ml-4 border-l border-gray-300 pl-3 relative">
      {/* Linha + bolinha */}
      <div className="absolute -left-1 top-2 w-2 h-2 bg-gray-400 rounded-full"></div>

      <div className="text-sm font-medium hover:text-blue-600">{node.name}</div>

      <div className="mt-1">
        {node.children?.map((child, index) => (
          <TreeNode key={index} node={child} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [tree, setTree] = useState([]);

  useEffect(() => {
    fetch("/arvore.json")
      .then((res) => res.json())
      .then((data) => setTree(data));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Árvore de Armas</h1>

      <div className="space-y-2">
        {tree.map((node, index) => (
          <TreeNode key={index} node={node} />
        ))}
      </div>
    </main>
  );
}
