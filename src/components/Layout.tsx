import { useState } from "react";
import { Canva } from "./Canva";

import { Sidebar } from "./Sidebar";
import { Terminal } from "./Terminal";

interface ILayoutProps {
  title: string;
  children: React.ReactNode;
}

type TableValue = { name: string; data: string };
type Table = {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  focus: boolean;
  values: TableValue[];
};

export const Layout: React.FC<ILayoutProps> = ({ title, children }) => {
  // Estado das tabelas
  const [entities, setEntities] = useState<string[]>([
    "User",
    "Product",
    "Order",
  ]);
  const [tables, setTables] = useState<Table[]>(
    entities.map((entity, i) => ({
      id: `table-${i}`,
      name: entity,
      type: "type-a",
      x: 100 * i,
      y: 50,
      focus: false,
      values: [{ name: entity, data: "string" }, { name: entity, data: "number" }],
    }))
  );

  return (
    <div className="flex flex-col min-h-screen bg-neutral-800 text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar entities={entities} setEntities={setEntities} />

        <div className="flex flex-col pb-0 flex-1 p-2 justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            <div className="p-6">{children}</div>
          </div>

          <div className="max-w-3 max-h-3 border-amber-300">
            <Canva tables={tables} setTables={setTables} />
          </div>

          <div className="h-50">
            <Terminal />
          </div>
        </div>
      </div>
    </div>
  );
};
