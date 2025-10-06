import AuthModal from "@/components/Auth/AuthModal";
import HomeNavbar from "@/components/Main/HomeNavbar";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <HomeNavbar />
      <AuthModal />

      {/* Main content */}
      {children}
    </div>
  );
}
