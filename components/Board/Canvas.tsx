"use client";

import { Canvas, PencilBrush } from 'fabric';
import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { BoardData } from '@/lib/models/Board';
import { saveBoard } from '@/app/actions';

interface Props {
    board: BoardData
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
        if (board?.board) {
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

    const handleSave = async () => {
        if (!canvas) return;
        const json = canvas.toJSON();

        const success = await saveBoard(board._id, json);
        if (success) {
            console.log("Saved board:", board.title);
        }
    }

    return ( 
        <div className='flex flex-col'>
            {/* Clear */}
            <button onClick={() => canvas!.clear()}>CLEAR CANVAS</button>

            {/* Save */}
            <div className="fileExport">
                <button onClick={handleSave}>
                    SAVE
                </button>
            </div>

            <canvas ref={canvasRef} className="border-1 border-black"></canvas>
        </div>
    );
}
export default BoardCanvas;