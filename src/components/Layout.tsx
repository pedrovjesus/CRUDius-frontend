import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Terminal } from "./Terminal";
import { EntitySettings } from "./EntitySettings";
import { Canva } from "./Canva";

export const Layout = () => {
  const [nodes, setNodes] = useState([
    { id: '1Nome',focus: true, x: 300, y: -100, name: "Pessoa", type: 'create', values: [
      {name: 'pessoa0', type: 'string', data: 'teste'},
      {name: 'pessoa1', type: 'string', data: 'tststs'},
      {name: 'pessoa1saasasasa', type: 'string', data: 'tststasasass'},
    ] },
    { id: '2Nome', focus: false, x: -200, y: -200, name: "Dog", type: 'update', values: [
      {name: 'pessoa2', type: 'string', data: 'teste'},
      {name: 'pessoa3', type: 'string', data: 'tststs'},
    ] },
    { id: '3Nome', focus: false, x: 0, y: 0, name: "Worlf", type: 'delete', values: [
      {name: 'pessoa2', type: 'string', data: 'teste'},
    ] },
  ]);

  

  return (
    <div className="main">
      <Sidebar tables={nodes} setTables={setNodes}/>

      <div className="group-canva-terminal">
        <Canva tables={nodes} setTables={setNodes}/>
        <Terminal/>
      </div>

      <EntitySettings tables={nodes} setTables={setNodes} />
    </div>
  );
};
