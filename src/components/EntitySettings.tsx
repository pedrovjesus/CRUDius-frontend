import { useEffect, useState } from "react";
import IconAdd from '../images/add.svg'

export const EntitySettings = (nodes) => {
  const tables = nodes.tables
  const setTables = nodes.setTables
  const [tableFocus, setTableFocus] = useState(null)
  const [inputFocus, setInpuFocus] = useState(null)
  let stop = false

  useEffect(() => {
    setTimeout(() => {
      tables.map((table) => {
        if (table.focus === true) {

          if (tableFocus !== null) {
            if (table.id === tableFocus.id) {
              stop = true
            } else {
              stop = false
            }
          }

          if (stop === false) {
            setTableFocus(table)
          }
        }
      })
    }, 10)
  })

  const getInputsValues = () => {
    let inputs = []

    if (tableFocus !== null) {
      tableFocus.values.map((data) => {
        if (data !== ' ') {
          if (inputFocus === data.name) {
            inputs.push(
              <input key={data.name} autoFocus id={data.name} onChange={(e) => {handleInputValue(data.name, e.target)}} value={data.data}/>
            )
          } else {
            inputs.push(
              <input key={data.name} id={data.name} onChange={(e) => {handleInputValue(data.name, e.target)}} value={data.data}/>
            )
          }

        }
      })
    }

    return inputs
  }

  function handleInputName (e) {
    setTableFocus({
      ...tableFocus,
      name: e.value
    })

    console.log(tableFocus.name)


    setTables((prevTable) =>
      prevTable.map((table) =>
        table.focus === true
          ? {
              ...table,
              name: tableFocus.name,
            }
          : table
      )
    );
  }

  function getInputsType (type) {
    if (tableFocus !== null) {
      if (tableFocus.type === type) {
        return ' focus'
      } else {
        return ''
      }
    }
  }

  function handleInputType (e) {
    const newType = e.classList[1]
    
    setTableFocus({
      ...tableFocus,
      type: newType,
    })

    setTables((prevTable) =>
      prevTable.map((table) =>
        table.focus === true
          ? {
              ...table,
              type: newType,
            }
          : table
      )
    );
  }

  function handleInputValue (name, e) {
    let values = [...tableFocus.values]

    if (tableFocus !== null) {
      tableFocus.values.map((value) => {
        if (value.name === name) {
          value.data = e.value
          value.name = e.value
          setInpuFocus(e.value)
        }
      })

      let newTable = {
        ...tableFocus,
        values: values,
      }

      setTableFocus(newTable)
  
      setTables((prevTable) =>
        prevTable.map((table) =>
          table.focus === true
            ? {
                ...table,
                values: values
              }
            : table
        )
      );
    }

  }

  function addValueTable () {
    if (tableFocus !== null) {
      let values = [
        ...tableFocus.values, 
        {name: 'default ' + tableFocus.values.length, type: 'string', data: 'default'},
      ]

      setInpuFocus(values[values.length -1].name)

      let newTable = {
        ...tableFocus,
        values: values
      }

      setTableFocus(newTable)
  
      setTables((prevTable) =>
        prevTable.map((table) =>
          table.focus === true
            ? {
                ...table,
                values: values
              }
            : table
        )
      );
    }
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
              <label htmlFor="type-create" onClick={(e) => {handleInputType(e.target)}} className={'label create' + getInputsType('create')}>C</label>
            </div>

            <div className="section-input">
              <input className="input-type-entity" type="radio" name="type-update" id="type-update" value='update' />
              <label htmlFor="type-update" onClick={(e) => {handleInputType(e.target)}} className={'label update' + getInputsType('update')}>U</label>
            </div>

            <div className="section-input">
              <input className="input-type" type="radio" name="type-delete" id="type-delete" value='delete' />
              <label htmlFor="type-delete" onClick={(e) => {handleInputType(e.target)}} className={'label delete' + getInputsType('delete')}>D</label>
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
          <div className="add-values">
            <h3>Values</h3>
            <button onClick={() => {addValueTable()}} className="button-value"><img src={IconAdd} alt="" /></button>
          </div>

          <div className="inputs">
            <div className="section-input">
              {getInputsValues()}
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
