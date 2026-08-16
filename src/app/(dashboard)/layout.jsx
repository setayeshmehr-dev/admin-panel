'use client'
import React from 'react'
import Header from "../../components/layout/header"
import Sidebar from "../../components/layout/sidebar"
import SearchModal from '@/components/layout/searchModal'
import Appearance from '@/components/layout/appearance'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { NotificationProvider } from "@/context/notificationContext";

import { useState, useEffect } from "react";

export default function DashboardLayout({ children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isCollapsed = isDesktop && collapsed;
  const [searchOpen, setSearchOpen] = useState(false)
  const [appearanceOpen, setAppearanceOpen] = useState(false)

  useEffect(() => {

    const handleKeyDown = (e) => {

        if ((e.metaKey || e.ctrlKey) && e.key === "k") {

            e.preventDefault();

            setSearchOpen(true);

        }

    };


    window.addEventListener("keydown", handleKeyDown);


    return () => {
        window.removeEventListener("keydown", handleKeyDown);
    };

}, []);

  return (
    <NotificationProvider>
      <div className="flex min-h-screen">

        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} collapsed={isCollapsed} setCollapsed={setCollapsed}/>
          <div onClick={() => setSidebarOpen(false)} className={`fixed inset-0 transition-opacity duration-300 z-40 bg-black/40  lg:hidden ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}/>

          <div className="flex-1 transition-all duration-500">

            <Header setSidebarOpen={setSidebarOpen} setSearchOpen={setSearchOpen} setAppearanceOpen={setAppearanceOpen}/>

            <main className='p-52'>
              {children}
            </main>

        </div>
        {searchOpen && (
          <SearchModal setSearchOpen={setSearchOpen} />
        )}

        {appearanceOpen && (
          <Appearance appearanceOpen={appearanceOpen} setAppearanceOpen={setAppearanceOpen} />
        )}

      </div>
    </NotificationProvider>
  );
}

