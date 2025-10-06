"use client";

import { NextPage } from 'next'

interface Props {
    width: number,
}

const Sidebar: NextPage<Props> = ({ width }) => {
    return (
        <div 
            className="fixed h-full hidden w-${sidebarWidth} lg:flex flex-col bg-blue-100 border-r-1"
            style={{ width: width }}
        >
            Sidebar
        </div>
    );
}

export default Sidebar