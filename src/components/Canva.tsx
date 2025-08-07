import { useRef, useState, useEffect } from "react";

export const Canva = () => {
  const canvasRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const isDraggingCanvas = useRef(false);
  const isDraggingInput = useRef(false);
  const draggingInputId = useRef(null);
  const lastMouse = useRef({ x: 0, y: 0 });

  const [tables, setTables] = useState([
    { id: 1, x: 300, y: -100, name: "Nome", type: 'create', values: [
      {name: 'pessoa', type: 'string', data: 'teste'},
      {name: 'pessoa1', type: 'string', data: 'tststs'},
    ] },
    { id: 2, x: -200, y: -200, name: "Nome", type: 'update', values: [
      {name: 'pessoa2', type: 'string', data: 'teste'},
      {name: 'pessoa3', type: 'string', data: 'tststs'},
    ] },
        { id: 3, x: 0, y: 0, name: "Nome", type: 'delete', values: [
      {name: 'pessoa2', type: 'string', data: 'teste'},
      {name: 'pessoa3', type: 'string', data: 'tststs'},
    ] },
  ]);

  // Desenha o grid
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, [offset, zoom]);

  // Zoom com scroll do mouse
  const handleWheel = (e) => {
    const delta = -e.deltaY;
    const zoomIntensity = 0.001;

    const newZoom = zoom * (1 + delta * zoomIntensity);
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calcula o ponto no mundo antes do zoom
    const worldX = (mouseX - offset.x) / zoom;
    const worldY = (mouseY - offset.y) / zoom;

    // Atualiza zoom e offset para manter o ponto fixo
    if (newZoom >+ 0.316478381828866 && newZoom <+ 2.773078757450189) {
      setZoom(newZoom);
      setOffset({
        x: mouseX - worldX * newZoom,
        y: mouseY - worldY * newZoom,
      });
    }
  };

  const handleMouseDown = (e) => {
    lastMouse.current = { x: e.clientX, y: e.clientY };

    // Detecta clique na tabela
    for (let table of tables) {
      const getTable = document.getElementById(table.id)
      const screenX = offset.x + table.x * zoom;
      const screenY = offset.y + table.y * zoom;
      const width = getTable.offsetWidth * zoom;
      const height = getTable.offsetHeight * zoom;

      if (
        e.clientX >= screenX &&
        e.clientX <= screenX + width &&
        e.clientY >= screenY &&
        e.clientY <= screenY + height
      ) {
        isDraggingInput.current = true;
        draggingInputId.current = table.id;
        return;
      }
    }

    isDraggingCanvas.current = true;
  };

  const handleMouseMove = (e) => {
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    if (isDraggingCanvas.current) {
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    }

    if (isDraggingInput.current && draggingInputId.current != null) {
      setTables((prevInputs) =>
        prevInputs.map((table) =>
          table.id === draggingInputId.current
            ? {
                ...table,
                x: table.x + dx / zoom,
                y: table.y + dy / zoom,
              }
            : table
        )
      );
    }

    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingCanvas.current = false;
    isDraggingInput.current = false;
    draggingInputId.current = null;
  };

  return (
    <div
      className="main-canva"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <canvas
        ref={canvasRef}
      />

      {tables.map((table) => {
        const style = {
          left: offset.x + table.x * zoom,
          top: offset.y + table.y * zoom,
          transform: `scale(${zoom})`,
          zIndex: 1,
        };

        const list = table.values.map((dataTable) => {
          return (
              <div key={dataTable.name} className="value">
                <span>{dataTable.data}</span>
              </div>
          );
        })
        return (
          <div className={'table ' + table.type} id={table.id} key={table.id} style={style}>
            <div className="header">
              <span>{table.name}</span>
            </div>
            <div className="content">
              {list}
            </div>
          </div>
        );
      })}
    </div>
  );
}
