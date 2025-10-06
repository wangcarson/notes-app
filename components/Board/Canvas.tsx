import { Canvas, PencilBrush } from 'fabric'; // browser
import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

interface Props {}

const BoardCanvas: NextPage<Props> = ({}) => {
    // Canvas reference
    const canvasref = useRef(null);
    const [canvas, setCanvas] = useState<Canvas | null>(null);

    useEffect(() => {
        // Create fabric canvas
        const fabriccanvas = new Canvas(canvasref.current!, {
            width : 100,
            height : 100,
            isDrawingMode: true,
        })

        fabriccanvas.setDimensions({ width: window.innerWidth, height: window.innerHeight });

        fabriccanvas.freeDrawingBrush = new PencilBrush(fabriccanvas);
        fabriccanvas.freeDrawingBrush.color = "#000000";
        fabriccanvas.freeDrawingBrush.width = 5;
        setCanvas(fabriccanvas);
        
        return () => {
            canvas.dispose();
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
export default BoardCanvas;