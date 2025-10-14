"use client";

import { NextPage } from 'next';
import { Pencil, Palette } from 'lucide-react';

interface Props {
    onClear: () => void;
    onSave: () => void;
    onColorChange: (color: string) => void;
    currentColor: string;
}

const Navbar: NextPage<Props> = ({ onClear, onSave, onColorChange, currentColor }) => {
    const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'];

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex gap-4 p-4 bg-gray-100 border-b border-gray-300">
            {/* Colour Pens */}
            <div className="flex gap-2">
                {colors.map(color => (
                    <button
                        key={color}
                        onClick={() => onColorChange(color)}
                        className={`p-2 rounded hover:bg-gray-50 ${currentColor === color ? 'ring-2 ring-blue-500' : ''}`}
                    >
                        <Pencil color={color} size={20} />
                    </button>
                ))}
            </div>
            <button onClick={onClear} className="ml-auto px-4 py-2 bg-white rounded hover:bg-gray-50">
                CLEAR CANVAS
            </button>
            <button onClick={onSave} className="px-4 py-2 bg-white rounded hover:bg-gray-50">
                SAVE
            </button>
        </div>
    );
}

export default Navbar;