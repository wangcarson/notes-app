import React from "react";
function FileExport({ canvas }) {
  const export_canvas = () => {
    if (!canvas) return;

    const json = canvas.toJSON();
    const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "canvas.json"
    link.click()
  }

  return (
    <div className="file_export">
      <button onClick={export_canvas}>
        Export Canvas
      </button>

    </div>
    
  )
}

export default FileExport
