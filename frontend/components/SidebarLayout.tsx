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
        <div>
            <Navbar/>
            <div className="flex">
                <Sidebar/>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
