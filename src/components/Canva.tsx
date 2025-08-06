import { useEffect, useRef, useState } from "react";

export const Canva = () => {
  const canvasRef = useRef(null)

  const [zoom, setZoom] = useState(0.6)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const draw = (ctx, pY, pX) => {
      ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      ctx.save();
      ctx.translate(offset.x, offset.y)
      ctx.scale(zoom, zoom)
  
      ctx.fillStyle = "#fff"
      ctx.font = "24px Arial"
      ctx.fillText("Minha Tabela", 0, 30)
  
      const headers = ["Nome", "Idade"]
      const rows = [
        ["Alice", "25"],
        ["Bob", "30"],
        ["Charlie", "28"],
      ]
  
      const cellWidth = 150
      const cellHeight = 40
      const startX = pX
      const startY = pY
  
      ctx.font = "bold 16px Arial"
      ctx.fillStyle = "#333"
      headers.forEach((header, i) => {
        ctx.strokeRect(startX + i * cellWidth, startY, cellWidth, cellHeight)
        ctx.fillText(header, startX + i * cellWidth + 10, startY + 25)
      });
  
      ctx.font = "14px Arial"
      rows.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const x = startX + colIndex * cellWidth
          const y = startY + (rowIndex + 1) * cellHeight
          ctx.strokeRect(x, y, cellWidth, cellHeight)
          ctx.fillText(cell, x + 10, y + 25)
        });
      });
  
      ctx.restore()
    };

    draw('ooo', 98, 1)
    draw('sss', 2, 38)
  }, [zoom, offset])


  const handleMouseDown = (e) => {
    isDragging.current = true
    lastMousePos.current = { x: e.clientX, y: e.clientY }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastMousePos.current.x
    const dy = e.clientY - lastMousePos.current.y
    setOffset((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    lastMousePos.current = { x: e.clientX, y: e.clientY }
  };

  const handleMouseUp = () => {
    isDragging.current = false
  };

  return (
    <canvas
      ref={canvasRef}
      className="canva"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ display: "block", cursor: "grab" }}
    />
  );
};
