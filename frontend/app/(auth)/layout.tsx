import SidebarLayout from "@/components/SidebarLayout";

export default function SharedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>{children}</div>;
}
