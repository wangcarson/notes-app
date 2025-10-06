import MainContent from "@/components/Dashboard/MainContent";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import { BoardData } from "@/lib/models/Board";
import { NextRequest } from "next/server";
import { getBoardsByUser } from "../actions";
import { Toaster } from "react-hot-toast";

export default async function DashboardPage() {
    // Fetch data on the server
    const boards = await getBoardsByUser();

    // Pass to client component
    const sidebarWidth = 240;
    const headerHeight = 64;

    return (
        <div className="min-h-screen flex flex-row">
            <Sidebar width={sidebarWidth} />

            <div
                className="flex flex-col grow lg:ml-[var(--sidebar-padding)]"
                style={{ '--sidebar-padding': `${sidebarWidth}px` } as React.CSSProperties}
            >
                <Toaster />
                <Header left={sidebarWidth} height={headerHeight} />

                {/* Main content */}
                <MainContent top={headerHeight} boards={boards} />
            </div>
        </div>
    );
}
