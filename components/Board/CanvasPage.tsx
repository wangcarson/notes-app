"use client";

import { Canvas, PencilBrush, Point } from 'fabric';
import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { BoardData } from '@/lib/models/Board';
import { updateBoardData } from '@/app/actions';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './BoardNavbar';

interface Props {
    board: BoardData
};

const CanvasPage: NextPage<Props> = ({ board }) => {
    // Canvas reference
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    
    // Pan and zoom state
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
    const [currentColor, setCurrentColor] = useState('#000000');

    useEffect(() => {
        const fabricCanvas = initializeBoard();
        if (!fabricCanvas) return;
        
        // Load from data if given
        if (board?.board) {
            fabricCanvas.loadFromJSON(board.board);
        }
        
        setCanvas(fabricCanvas);
        
        // Listen for browser zoom changes
        const handleBrowserZoom = () => {
            const browserZoom = window.devicePixelRatio;
            setZoom(browserZoom);
        };
        
        window.addEventListener('resize', handleBrowserZoom);
        handleBrowserZoom(); // Initial check
        
        return () => {
            fabricCanvas.dispose();
            window.removeEventListener('resize', handleBrowserZoom);
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

    const handleColorChange = (color: string) => {
        if (!canvas) return;
        canvas.freeDrawingBrush.color = color;
        setCurrentColor(color);
    }

    

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isPanning || !canvas) return;
        
        // Calculate how far the mouse moved
        const deltaX = e.clientX - lastPanPoint.x;
        const deltaY = e.clientY - lastPanPoint.y;
        
        // Update pan offset (for the grid background)
        setPanOffset(prev => ({
            x: prev.x + deltaX,
            y: prev.y + deltaY
        }));
        
        // Update Fabric.js viewport (for the canvas content)
        const vpt = canvas.viewportTransform!;
        vpt[4] += deltaX; // x offset
        vpt[5] += deltaY; // y offset
        canvas.requestRenderAll();
        
        // Update last position for next move
        setLastPanPoint({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    // Scroll wheel pan handler
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        if (!canvas) return;
        
        // Get scroll deltas (deltaX for horizontal, deltaY for vertical)
        const deltaX = e.deltaX;
        const deltaY = e.deltaY;
        
        // Update pan offset (for the grid background)
        setPanOffset(prev => ({
            x: prev.x - deltaX,
            y: prev.y - deltaY
        }));
        
        // Update Fabric.js viewport (for the canvas content)
        const vpt = canvas.viewportTransform!;
        vpt[4] -= deltaX; // x offset
        vpt[5] -= deltaY; // y offset
        canvas.requestRenderAll();
    };

    // Calculate background style based on pan and zoom
    const gridSize = 20; // Base grid size in pixels
    const backgroundStyle = {
        backgroundSize: `${gridSize * zoom}px ${gridSize * zoom}px`,
        backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
        backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
        `,
        backgroundColor: '#ffffff'
    };

    return ( 
        <div className='relative h-screen'>
            <Toaster />
            
            {/* Fixed Toolbar */}
            <Navbar 
                onClear={() => canvas!.clear()} 
                onSave={handleSave} 
                onColorChange={handleColorChange}
                currentColor={currentColor}
            />

            {/* Canvas container with background grid */}
            <div 
                className="absolute inset-0 overflow-hidden"
                style={backgroundStyle}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
            >
                <canvas 
                    ref={canvasRef} 
                    className="absolute top-0 left-0"
                    style={{ background: 'transparent', cursor : 'crosshair' }}
                />
            </div>
        </div>
    );
}
export default CanvasPage;