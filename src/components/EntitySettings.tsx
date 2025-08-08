import { useEffect, useState } from "react";

export const EntitySettings = (nodes) => {
  const tables = nodes.tables
  const setTables = nodes.setTables
  const [tableFocus, setTableFocus] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      tables.map((table) => {
        if (table.focus === true && tableFocus === null) {
          setTableFocus(table)
        }
      })
    }, 1000)
  })

  const inputs = () => {
    let tableExisted = tableFocus === null? null: true

    if (tableExisted === true) {
      {tableFocus.values.map((data) => {
      })}
      return (
        <h1>
          skksk
        </h1>
      )
    } else {
      <></>
    }
  }

  function handleInputName (e) {
    
    setTables((prevTable) =>
      prevTable.map((table) =>
        table.ud === tableFocus.id
          ? {
              ...table,
              name: e.value,
            }
          : table
      )
    );
  }

  return (
    <div className="entity-settings">

      <h2>Entity Settings</h2>

      <div className="section-entity-settings">
        <div className="label-inputs entity-type">
          <h3>Tyoe</h3>

          <div className="inputs">
            <div className="section-input">
              <input className="input-type-entity" type="radio" name="type-create" id="type-create" value='create' />
              <label htmlFor="type-create">C</label>
            </div>

            <div className="section-input">
              <input className="input-type-entity" type="radio" name="type-update" id="type-update" value='update' />
              <label htmlFor="type-update">U</label>
            </div>

            <div className="section-input">
              <input className="input-type" type="radio" name="type-delete" id="type-delete" value='delete' />
              <label htmlFor="type-delete">D</label>
            </div>
          </div>
        </div>

        <div className="label-inputs entity-name">
          <h3>Name</h3>

          <div className="inputs">
            <div className="section-input">
              <input className="input-name focus" onChange={(e) => {handleInputName(e.target)}} value={tableFocus === null? '  ': tableFocus.name} type="text" />
            </div>
          </div>
        </div>

        <div className="label-inputs entity-values">
          <h3>Values</h3>

          <div className="inputs">
            <div className="section-input">
              {inputs()}
              <button className="button-value">New value</button>
            </div>
          </div>
        </div>

        <div className="export-menu">
          <button className="button-export">Export</button>
        </div>
      </div>
    </div>
  );
};
