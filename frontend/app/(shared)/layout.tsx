import SidebarLayout from "@/components/SidebarLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function SharedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <SidebarLayout>{children}</SidebarLayout>
        </SidebarProvider>
    );
}
