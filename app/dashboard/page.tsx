import Dashboard from "@/components/Dashboard/Dashboard";
import { BoardData } from "@/lib/models/Board";
import { NextRequest } from "next/server";

export default async function DashboardPage() {
    // Fetch data on the server
    const res = await import("@/app/api/boards/import_all/route");
    const boards: BoardData[] = await (await res.GET({} as unknown as NextRequest)).json();

    // Pass to client component
    return <Dashboard boards={boards} />
}
