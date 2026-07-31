import { Zap, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import React from 'react'


export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <aside className={`w-65 fixed lg:sticky z-50 lg:top-0 lg:left-0 h-screen border-r border-border transition-transform duration-500 bg-background ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="h-16 px-4 flex items-center justify-start border-b border-border">
            <div className="flex bg-primary w-9 h-9 items-center justify-center rounded-lg "> 
                <Zap className="size-4.5 text-white"></Zap>
            </div>
            <div className="flex flex-col ps-2.5">
                <span className="text-sm font-semibold text-foreground">Apex</span>
                <span className="text-xs text-muted-foreground">DASHBOARD</span>
            </div>
        </div>
            <Button  onClick={()=> setSidebarOpen(false)} variant="ghost" size="icon" className="absolute top-4 lg:hidden right-2.5">
               <X/>
            </Button>
    </aside>
  )
}
