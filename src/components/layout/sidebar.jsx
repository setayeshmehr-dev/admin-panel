import {  ChevronRight, ChevronLeft, Flame,  X,  LogOut} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar" ;
import { ScrollArea } from "../ui/scroll-area";

import React from 'react'
import Link from "next/link";
import SidebarGroup from "./sidebarGroup";
import { sidebarGroups } from "@/data/sidebar";

export default function Sidebar({ sidebarOpen, setSidebarOpen, setCollapsed, collapsed}) {
    
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
                <div className="flex bg-linear-to-br from-primary to-secondary from-25%  to-85% w-9 h-9 items-center justify-center rounded-lg "> 
                    <Flame className="size-4.5 text-white"></Flame>
                </div>
                <div className={`flex flex-col ps-2.5 ${collapsed ? "w-0 hidden opacity-0" : "w-auto flex opacity-100"} `}>
                    <span className="bg-linear-to-br from-primary from-25% to-secondary to-85% bg-clip-text text-transparent text-sm font-semibold">Flame</span>
                    <span className="text-xs text-muted-foreground">DASHBOARD</span>
                </div>
            </div>
            <Button  onClick={()=> setSidebarOpen(false)} variant="ghost" size="icon" className="absolute top-4 lg:hidden right-2.5">
                <X/>
            </Button>
            {/* /////////////////////////////////////////   NAV   ////////////////////////////////////////////////// */}

            <ScrollArea className={`flex-1 min-h-0 overflow-y-auto px-2 py-2 ${collapsed ? "px-0!" : "px-2!"}`}>

                <Accordion multiple defaultValue={sidebarGroups.map((group) => group.group)}>

                {sidebarGroups.map((group) => (
                <SidebarGroup key={group.group} collapsed={collapsed} group={group.group} items={group.items}/>
                ))}

                </Accordion>

            </ScrollArea>

            <div className={` h-18 border-t  border-border ps-4 pe-2 py-2 flex items-center gap-1 shrink-0 ${collapsed ? " justify-center!" : " justify-start!"} `}>
                <Link href="/profile" className="hover:bg-muted cursor-pointer flex items-center justify-center px-3 py-2 rounded-[15px]">
                    <Avatar>
                        <AvatarFallback className="bg-linear-to-br from-primary from-25%  to-85%  to-secondary font-semibold text-primary-foreground">AS</AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col ps-2.5 ${collapsed ? "w-0 hidden opacity-0" : "w-auto flex opacity-100"} `}>
                        <span className="text-[12px] font-semibold text-foreground">Amirali Setayeshmehr</span>
                        <span className="text-[10px] text-muted-foreground">Admin</span>
                    </div>
                </Link>
                <Link href="/login" className={` hover:bg-muted cursor-pointer w-8! h-8 ${collapsed ? "hidden" : " flex "} items-center justify-center rounded-full`} >
                    <LogOut className="size-4 text-muted-foreground" />
                </Link>

            </div>

        </aside>
    )
}
