import MainContent from "@/components/Dashboard/MainContent";
import Header from "@/components/Dashboard/Header";
import Sidebar from "@/components/Dashboard/Sidebar";
import { BoardData } from "@/lib/models/Board";
import { NextRequest } from "next/server";

export default async function DashboardPage() {
    // Fetch data on the server
    const res = await import("@/app/api/boards/import_all/route");
    const boards: BoardData[] = await (await res.GET({} as unknown as NextRequest)).json();

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
                <Header left={sidebarWidth} height={headerHeight} />

                {/* Main content */}
                <MainContent top={headerHeight} boards={boards} />
            </div>
        </div>
    );
}
