import { useEffect, useState } from "react";
import Logo from "../images/crudius2.svg";
import IconMenu from "../images/menu.svg";
import IconAdd from '../images/add.svg';
import IconArrpw from '../images/arrow.svg';
import IconSettings from '../images/settings.svg';

export const Sidebar = (nodes) => {
  const tables = nodes.tables
  const setTables = nodes.setTables

  const [inputTable, setInputTable] = useState('')

  function handleChange (e) {
    setInputTable(e.value.trim())
  }

  function addTable () {
    if (inputTable !== '') {
      setTables([
        ...tables,
        { id: tables.length, focus: true, x: 0, y: 0, name: inputTable, type: 'delete', values: [
          {name: 'Default', type: 'string', data: 'init'},
        ] },
      ])

      setInputTable('')
    }
  }

  return (
    <aside className="menu-list-entity">
      <div className="header">
        <img className="logo" src={Logo} alt="logo of CRUDius" />

        <h1>CRUDius Studio</h1>

        <div className="section-undo-redo">
          <img className="undo disabled" src={IconArrpw} alt="undo" />
          <img className="redo" src={IconArrpw} alt="redo" />
        </div>
      </div>

      <div className="section-new-entity">
        <input className="input-add-entity" value={inputTable} onChange={(e) => {handleChange(e.target)}} type="text" placeholder="add  entity" />
        <button className="button-add" onClick={() => {addTable()}}><img src={IconAdd} alt="button add new entity"/></button>
      </div>

      <div className="list-entity">
        {tables.map((table) => {
          function getClass () {
            if (table.focus == 0) {
              return 'entity'
            } else {
              return 'entity focus'
            }
          }

          function changeFocus (id) {
            setTables((prevTable) =>
              prevTable.map((table) =>

                table.id === id
                  ? {
                      ...table,
                      focus: true,
                    }
                  : {
                      ...table,
                      focus: false,
                    }
              )
            );
          }
          return (
            <div className={getClass()} key={table.id} onClick={() => {changeFocus(table.id)}}>
              <span>{table.name}</span>
              <img className="menu-entity" src={IconMenu} alt="menu of entity" />
            </div>
          )
        })}
      </div>

      <button className="section-settings">
        <img src={IconSettings} alt="settings of CRUDius" />
        <span>Settings</span>
      </button>
    </aside>
  );
};
