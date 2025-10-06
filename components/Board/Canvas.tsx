"use client";

import { Canvas, PencilBrush } from 'fabric';
import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import FileExport from './FileExport';
import { BoardData } from '@/lib/models/Board';

interface Props {
    board?: BoardData
};

const BoardCanvas: NextPage<Props> = ({ board }) => {
    // Canvas reference
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvas, setCanvas] = useState<Canvas | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Create fabric canvas
        const fabricCanvas = new Canvas(canvasRef.current, {
            width: 100,
            height: 100,
            isDrawingMode: true,
        });

        fabricCanvas.setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });

        // Load from data if given
        if (board) {
            fabricCanvas.loadFromJSON(board.board);
        }

        // Create brush
        const brush = new PencilBrush(fabricCanvas);
        brush.color = "#000000";
        brush.width = 5;
        fabricCanvas.freeDrawingBrush = brush;
        
        setCanvas(fabricCanvas);
        
        return () => {
            fabricCanvas.dispose();
        };
    }, []);

    // TODO: Save instead of exporting
    return ( 
        <div className='flex flex-col'>
            <button onClick={() => canvas!.clear()}>CLEAR CANVAS</button>
            <FileExport canvas={canvas}/> 
            <canvas ref={canvasRef} className="border-1 border-black"></canvas>
        </div>
    );
}
export default BoardCanvas;