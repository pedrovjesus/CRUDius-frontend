import { Sidebar } from "./Sidebar";
import { Terminal } from "./Terminal";
import { EntitySettings } from "./EntitySettings";
import { Canva } from "./Canva";

export const Layout = () => {
  return (
    <div className="main">
      <Sidebar/>

      <div className="group-canva-terminal">
        <Canva/>
        <Terminal/>
      </div>

      <EntitySettings/>
    </div>
  );
};
