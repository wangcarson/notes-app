import Dashboard from "@/components/Dashboard/Dashboard";
import { BoardData } from "@/lib/models/Board";

export default async function DashboardPage() {
    const res = await import("@/app/api/boards/import_boards/route");
    const boards: BoardData[] = await (await res.GET()).json();

    return <Dashboard boards={boards} />
}
