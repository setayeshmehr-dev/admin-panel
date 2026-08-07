import { 
    ChevronRight,
    ChevronLeft,
    Zap, 
    X, 
    LayoutDashboard, 
    ChartColumn, 
    Store, 
    Handshake, 
    Rocket, 
    ChartNoAxesCombined, 
    ShoppingCart, 
    Package, 
    Users, 
    FileText, 
    Mail, 
    MessageSquare, 
    FolderOpen, 
    Kanban, 
    Calendar, 
    ListChecks, 
    FileInput, 
    Map, 
    ToggleLeft, 
    CloudUpload, 
    Activity, 
    MessageSquareText, 
    Timer, 
    ScrollText, 
    CreditCard, 
    UserRoundCog, 
    Bell, 
    Settings, 
    CircleQuestionMark, 
    LogOut} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";

import React from 'react'
import SidebarGroup from "./sidebarGroup";
import { Avatar, AvatarFallback } from "@/components/ui/avatar" ;

export default function Sidebar({ sidebarOpen, setSidebarOpen, setCollapsed, collapsed}) {

    const sidebarGroup = [
    {
        group: "OVERVIEW",
        items: [
            {title: "Dashboard", icon: LayoutDashboard},
            {title: "Analytics", icon: ChartColumn},
            {title: "eCommerce", icon: Store},
            {title: "CRM", icon: Handshake},
            {title: "SaaS", icon: Rocket},
            {title: "Charts", icon: ChartNoAxesCombined}
        ]
    },

    {
        group: "COMMERCE",
        items: [
            {title: "Orders", icon: ShoppingCart},
            {title: "Products", icon: Package},
            {title: "Customers", icon: Users},
            {title: "Invoices", icon: FileText}
        ]
    },

    {
        group: "APPS",
        items: [
            {title: "Mail", icon: Mail},
            {title: "Chat", icon: MessageSquare},
            {title: "Files", icon: FolderOpen},
            {title: "Kanban", icon: Kanban},
            {title: "Calendar", icon: Calendar},
            {title: "Wizard", icon: ListChecks},
            {title: "Forms", icon: FileInput}
        ]
    },

    {
        group: "DEV TOOLS",
        items: [
            {title: "Roadmap", icon: Map},
            {title: "Feature Flags", icon: ToggleLeft},
            {title: "Deployments", icon: CloudUpload},
            {title: "Activity", icon: Activity},
            {title: "Feedback", icon: MessageSquareText},
            {title: "Sprints", icon: Timer},
            {title: "Changelog", icon: ScrollText}
        ]
    },

    {
        group: "FINANCE",
        items: [{title: "Billing", icon: CreditCard}]

    },

    {
        group: "SYSTEM",
        items: [
            {title: "Users", icon: UserRoundCog},
            {title: "Notification", icon: Bell},
            {title: "Settings", icon: Settings},
            {title: "Help & Support", icon: CircleQuestionMark}
        ]

    },
    ];
    
    return (
        <aside style={{width: collapsed ? "75px" : "256px"}} className={`w-64 fixed lg:sticky z-50 transition-all  lg:top-0 lg:left-0 h-screen border-r flex flex-col border-border  duration-500 lg:transition-none bg-background ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
            <Button onClick={()=> setCollapsed(!collapsed)} variant="ghost" className=" w-6! h-6 rounded-full hidden lg:flex bg-background border p-0 border-border absolute z-30 -right-3 top-20">
                {collapsed ? (
                    <ChevronRight className="size-3 " />
                ) : (
                    <ChevronLeft className="size-3  " />
                )}
            </Button>
            {/* ///////////////////////////////////////////     Logo       /////////////////////////////////////////////////// */}
            <div className={`h-16 px-4 flex items-center justify-start border-b border-border shrink-0 ${collapsed ? " justify-center!" : " justify-start!"} `}>
                <div className="flex bg-primary w-9 h-9 items-center justify-center rounded-lg "> 
                    <Zap className="size-4.5 text-white"></Zap>
                </div>
                <div className={`flex flex-col ps-2.5 ${collapsed ? "w-0 hidden opacity-0" : "w-auto flex opacity-100"} `}>
                    <span className="text-sm font-semibold text-foreground">Apex</span>
                    <span className="text-xs text-muted-foreground">DASHBOARD</span>
                </div>
            </div>
            <Button  onClick={()=> setSidebarOpen(false)} variant="ghost" size="icon" className="absolute top-4 lg:hidden right-2.5">
                <X/>
            </Button>
            {/* /////////////////////////////////////////   NAV   ////////////////////////////////////////////////// */}

            <nav className={`flex-1 min-h-0 overflow-y-auto px-2 py-2 ${collapsed ? "px-0!" : "px-2!"}`}>

                <Accordion multiple defaultValue={sidebarGroup.map((group) => group.group)}>

                {sidebarGroup.map((group) => (
                <SidebarGroup key={group.group} collapsed={collapsed} group={group.group} items={group.items}/>
                ))}

                </Accordion>

            </nav>

            <div className={`h-16 border-t border-border px-4 flex items-center shrink-0 ${collapsed ? " justify-center!" : " justify-start!"} `}>
                <Avatar>
                    <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className={`flex flex-col ps-2.5 ${collapsed ? "w-0 hidden opacity-0" : "w-auto flex opacity-100"} `}>
                    <span className="text-sm font-semibold text-foreground">Amirali Setayeshmehr</span>
                    <span className="text-xs text-muted-foreground">Admin</span>
                </div>
            </div>

        </aside>
    )
}
