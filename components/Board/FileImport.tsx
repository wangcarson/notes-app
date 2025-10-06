"use client";

import { Canvas } from "fabric";
import { NextPage } from "next";
import React from "react";

interface Props {
    canvas: Canvas | null,
};

const FileImport: NextPage<Props> = ({ canvas }) => {
    // if no canvas, then return none
    if (!canvas) return;

    const handleFileUpload = (json: string | object) => {
        try {
            // clear the canvas and build it with the given json
            canvas.clear();
            canvas.loadFromJSON(json);
            console.log("rerendered new board");

        } catch (error) {
            console.error ("Invalid JSON file: ", error);
        }
    };

    const sampleImport = async () => {
        try {
            const res = await fetch("/api/boards/import_all", {
                method: "POST",
            });
            if (!res.ok) {
                console.error("Failed to import boards");
                return;
            }

            const boards = await res.json();

            if (boards.length > 0) {
                // take the first board’s JSON and load it
                console.log("Board from API:", boards[0]);
                handleFileUpload(boards[0]);
            } else {
                console.log("No boards found for this user");
            }
        } catch (err) {
            console.error("Error importing boards:", err);
        }
    };
    return (
        <div className="fileImport">
            <button onClick={sampleImport}>
                SAMPLE IMPORT
            </button>
        </div>
    );
};

export default FileImport;