"use client";

import { useState, useEffect, useRef} from "react";
import Image from "next/image";
import * as fabric from "fabric";
import FileExport from "@/components/Board/FileExport";
import FileImport from "@/components/Board/FileImport";

function Home() {

  // canvas reference
  const canvasref = useRef(null)
  const [canvas, setCanvas] = useState(null)


  useEffect (() => {
    const fabriccanvas = new fabric.Canvas(canvasref.current, {
      width : 100,
      height : 100,
      isDrawingMode: true,

    })

    fabriccanvas.setWidth(window.innerWidth);
    fabriccanvas.setHeight(window.innerHeight);


    fabriccanvas.freeDrawingBrush = new fabric.PencilBrush(fabriccanvas)
    fabriccanvas.freeDrawingBrush.color = "#000000"
    fabriccanvas.freeDrawingBrush.width = 5
    setCanvas(fabriccanvas)
    
    return () => {
      fabriccanvas.dispose()
    }
  }, [])



  return ( 
   <div style={{ display: "flex", flexDirection: "column"}}>
    <button onClick={()=> canvas.clear()}>CLEAR CANVAS</button>
    <FileExport canvas = {canvas}/>
    <FileImport canvas = {canvas}/>
    <canvas ref = {canvasref} style={{border : "1px solid black"}}></canvas>

  </div>

  );
}

export default Home