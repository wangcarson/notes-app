"use client";

import { useState, useEffect, useRef} from "react";
import Image from "next/image";
import * as fabric from "fabric";

function Home() {
  const canvasref = useRef(null)

  useEffect (() => {
    const fabriccanvas = new fabric.Canvas(canvasref.current, {
      height: 500,
      width: 500,
      isDrawingMode: true,

    })

    fabriccanvas.freeDrawingBrush = new fabric.PencilBrush(fabriccanvas)
    fabriccanvas.freeDrawingBrush.color = "#000000"
    fabriccanvas.freeDrawingBrush.width = 5


    return () => {
      fabriccanvas.dispose()
    }
  }, [])



  return ( 
   <div style={{ display: "flex", flexDirection: "column"}}>
    <button>CLEAR CANVAS</button>
    <canvas ref = {canvasref} style={{border : "1px solid black"}}></canvas>
  </div>

  );
}

export default Home