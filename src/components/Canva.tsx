import { useRef, useState, useEffect } from "react";

type TableValue = {
  name: string;
  data: string;
};

export type Table = {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  focus: boolean;
  values: TableValue[];
};

type CanvaProps = {
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
};

export const Canva: React.FC<CanvaProps> = ({ tables, setTables }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const canvas = canvasRef.current;
  const canvasWidth = canvas?.width || window.innerWidth;
  const canvasHeight = canvas?.height || window.innerHeight;
  const isDraggingCanvas = useRef<boolean>(false);
  const isDraggingInput = useRef<boolean>(false);
  const draggingInputId = useRef<string | null>(null);
  const lastMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, [offset, zoom]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = -e.deltaY;
    const zoomIntensity = 0.001;

    const newZoom = zoom * (1 + delta * zoomIntensity);
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const worldX = (mouseX - offset.x) / zoom;
    const worldY = (mouseY - offset.y) / zoom;

    if (newZoom >= 0.316 && newZoom <= 2.773) {
      setZoom(newZoom);
      setOffset({
        x: mouseX - worldX * newZoom,
        y: mouseY - worldY * newZoom,
      });
    }
  };

  // Clique do mouse
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    lastMouse.current = { x: e.clientX, y: e.clientY };

    for (let table of tables) {
      const getTable = document.getElementById(table.id);
      if (!getTable) continue;

      const screenX = offset.x + table.x * zoom;
      const screenY = offset.y + table.y * zoom;
      const width = getTable.offsetWidth * zoom;
      const height = getTable.offsetHeight * zoom;

      setTables((prev) => prev.map((t) => ({ ...t, focus: false })));

      if (
        e.clientX >= screenX &&
        e.clientX <= screenX + width &&
        e.clientY >= screenY &&
        e.clientY <= screenY + height
      ) {
        isDraggingInput.current = true;
        draggingInputId.current = table.id;
        getTable.classList.add("focus");
        changeFocus(table.id);
        return;
      }
    }

    isDraggingCanvas.current = true;
  };

  // Movimento do mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    if (isDraggingCanvas.current) {
      setOffset((prev) => {
        const newX = Math.max(
          -canvasWidth / 2,
          Math.min(prev.x + dx, canvasWidth / 2)
        );
        const newY = Math.max(
          -canvasHeight / 2,
          Math.min(prev.y + dy, canvasHeight / 2)
        );
        return { x: newX, y: newY };
      });
    }

    if (isDraggingInput.current && draggingInputId.current) {
      setTables((prev) =>
        prev.map((table) =>
          table.id === draggingInputId.current
            ? { ...table, x: table.x + dx / zoom, y: table.y + dy / zoom }
            : table
        )
      );
    }

    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  // Soltar o mouse
  const handleMouseUp = () => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === draggingInputId.current ? { ...table, focus: true } : table
      )
    );

    isDraggingCanvas.current = false;
    isDraggingInput.current = false;
    draggingInputId.current = null;
  };

  // Alterar foco da tabela
  function changeFocus(id: string) {
    setTables((prev) =>
      prev.map((table) =>
        table.id === id ? { ...table, focus: true } : { ...table, focus: false }
      )
    );
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <canvas ref={canvasRef} />

      {tables.map((table) => {
        const style: React.CSSProperties = {
          left: offset.x + table.x * zoom,
          top: offset.y + table.y * zoom,
          transform: `scale(${zoom})`,
          position: "absolute",
        };

        return (
          <div
            onClick={() => changeFocus(table.id)}
            id={table.id}
            key={table.id}
            style={style}
            className={`absolute cursor-grab text-sm rounded border transition-transform duration-150
    ${table.focus ? "border-blue-400 scale-105" : "border-gray-700"} 
    bg-gray-800 w-36`}
          >
            {/* Header minimalista */}
            <div className="px-2 py-1 border-b border-gray-700">
              <span className="font-medium text-white text-sm">
                {table.name}
              </span>
            </div>

            {/* Conteúdo compacto */}
            <div className="p-1 flex flex-col gap-1">
              {table.values.map((val) => (
                <div
                  key={val.name}
                  className="flex justify-between items-center text-xs text-white px-1 py-1"
                >
                  <span>{val.name}</span>
                  <span>{val.data}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
