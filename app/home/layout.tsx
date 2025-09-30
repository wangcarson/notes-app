import AuthModal from "@/components/Auth/Modal/AuthModal";
import { ModalProvider } from "@/context/ModalContext";
import HomeNavbar from "@/components/Main/HomeNavbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalProvider>
      <div className="flex flex-col">
        {/* Navbar */}
        <HomeNavbar />
        <AuthModal />

        {/* Main content */}
        {children}
      </div>
    </ModalProvider>
  );
}
