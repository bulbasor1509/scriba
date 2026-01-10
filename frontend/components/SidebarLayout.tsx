"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function SidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Navbar toggleSidebar={() => setSidebarOpen((p) => !p)} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={sidebarOpen}/>
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
