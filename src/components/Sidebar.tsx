import { useEffect, useState } from "react";
import Logo from "../images/crudius2.svg";
import IconMenu from "../images/menu.svg";
import IconAdd from '../images/add.svg';
import IconArrpw from '../images/arrow.svg';
import IconSettings from '../images/settings.svg';
import postcssPluginWarning from "tailwindcss";

export const Sidebar = () => {
  // ns-resize
  function expand (e) {
    
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [entities, setEntities] = useState(["User", "Product", "Order"]);

  return (
    <aside className="menu-list-entity" onMouseMove={(e) => {expand(e)}}>
      <div className="header">
        <img className="logo" src={Logo} alt="logo of CRUDius" />

        <h1>CRUDius Studio</h1>

        <div className="section-undo-redo">
          <img className="undo disabled" src={IconArrpw} alt="undo" />
          <img className="redo" src={IconArrpw} alt="redo" />
        </div>
      </div>

      <div className="section-new-entity">
        <input className="input-add-entity" type="text" placeholder="add  entity" />
        <button className="button-add"><img src={IconAdd} alt="button add new entity"/></button>
      </div>

      <div className="list-entity">
        <div className="entity">
          <span>Cats</span>
          <img className="menu-entity" src={IconMenu} alt="menu of entity" />
        </div>

        <div className="entity">
          <span>Cats</span>
          <img className="menu-entity" src={IconMenu} alt="menu of entity" />
        </div>

        <div className="entity">
          <span>Cats</span>
          <img className="menu-entity" src={IconMenu} alt="menu of entity" />
        </div>
      </div>

      <button className="section-settings">
        <img src={IconSettings} alt="settings of CRUDius" />
        <span>Settings</span>
      </button>
    </aside>
  );
};
