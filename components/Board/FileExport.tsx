"use client";

import { Canvas } from "fabric";
import { NextPage } from "next";
import React from "react";

interface Props {
    canvas: Canvas | null,
};

const FileExport: NextPage<Props> = ({ canvas }) => {
    const export_canvas = async () => {
        if (!canvas) return;
        const json = canvas.toJSON();

        try {
            const res = await fetch("/api/boards/export", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ board: json }),
            });

            if (!res.ok) {
                console.error("Failed to save:", await res.json());
                return;
            }

            const data = await res.json();
            console.log("Saved board:", data.board);

        } catch (err) {
            console.error("Error exporting canvas:", err);
        }
    }

    return (
        <div className="fileExport">
            <button onClick={export_canvas}>
                SAVE
            </button>
        </div>
    );
}

export default FileExport;
