export const EntitySettings = () => {
  return (
    <div className="entity-settings">

      <h2>Entity Settings</h2>

      <div className="section-entity-settings">
        <div className="label-inputs entity-type">
          <h3>Tyoe</h3>

          <div className="inputs">
            <div className="section-input">
              <input className="input-type-entity" onFocus={() => { alert('sjsjjs') }} type="radio" name="type-create" id="type-create" value='create' />
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
              <input className="input-name" type="text" />
            </div>
          </div>
        </div>

        <div className="label-inputs entity-values">
          <h3>Values</h3>

          <div className="inputs">
            <div className="section-input">
              <input type="text" />
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
