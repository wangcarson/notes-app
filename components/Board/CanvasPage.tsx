"use client";

import { Canvas, PencilBrush } from 'fabric';
import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { BoardData } from '@/lib/models/Board';
import { updateBoardData } from '@/app/actions';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    board: BoardData
};

const CanvasPage: NextPage<Props> = ({ board }) => {
    // Canvas reference
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvas, setCanvas] = useState<Canvas | null>(null);

    useEffect(() => {
        const fabricCanvas = initializeBoard();
        if (!fabricCanvas) return;
        
        // Load from data if given
        if (board?.board) {
            fabricCanvas.loadFromJSON(board.board);
        }
        
        setCanvas(fabricCanvas);
        
        return () => {
            fabricCanvas.dispose();
        };
    }, []);

    const initializeBoard = () => {
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

        // Create brush
        const brush = new PencilBrush(fabricCanvas);
        brush.color = "#000000";
        brush.width = 5;
        fabricCanvas.freeDrawingBrush = brush;

        return fabricCanvas;
    }

    const handleSave = async () => {
        if (!canvas) return;
        const success = await updateBoardData(board._id, canvas.toJSON());

        if (success) {
            toast.success("Saved board!");
        } else {
            toast.error("Failed to save board");
        }
    }

    return ( 
        <div className='flex flex-col'>
            <Toaster />
            
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
export default CanvasPage;