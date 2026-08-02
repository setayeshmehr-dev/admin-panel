'use client'
import React from 'react'
import Header from "../../components/layout/header"
import Sidebar from "../../components/layout/sidebar"

import { useState } from "react";

export default function DashboardLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} collapsed={collapsed} setCollapsed={setCollapsed}/>

        <div className="flex-1 transition-all duration-500">

        <div onClick={() => setSidebarOpen(false)} className={`fixed inset-0 transition-opacity duration-300 z-40 bg-black/40  lg:hidden ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"} `}/>

        <Header setSidebarOpen={setSidebarOpen}/>

        <main>
          {children}
        </main>

      </div>

    </div>
  );
}

