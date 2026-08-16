"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { sidebarGroups } from "@/data/sidebar";

import { useState } from "react";
import Link from "next/link";


export default function SearchModal({setSearchOpen}) {

    const [search, setSearch] = useState("");

    const pages = sidebarGroups.flatMap(
        (group) => group.items
    );

    const filteredPages = pages.filter((item)=>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div onClick={() => setSearchOpen(false)} className="fixed inset-0  z-50 flex items-center justify-center bg-black/40"></div>


            <div onClick={(e)=> e.stopPropagation()} className=" fixed top-[50%] overflow-hidden left-[50%] translate-[-50%] z-60 w-[90%]  max-w-127.5 rounded-xl bg-background shadow-xl border">
                <div className="flex items-center gap-2 border-b  w-full bg-background  border-border px-4 pt-3 pb-1">

                    <Search className="size-6 text-muted-foreground"/>

                    <Input  autoFocus value={search} onChange={(e)=>setSearch(e.target.value)}  placeholder="Type a command or search..." className="border-0 bg-transparent focus-visible:ring-0"/>

                    <Button onClick={()=>setSearchOpen(false)} variant="ghost" size="icon" >
                        <X />
                    </Button>

                </div>

                <ScrollArea className="flex gap-1 px-4 h-87.5 ">
                    {
                        filteredPages.length > 0 ? (

                            filteredPages.map((item)=>{

                                const Icon = item.icon;

                                return (
                                    <Link onClick={()=>setSearchOpen(false)} href={item.href}  key={item.title} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer" >

                                        <Icon className="size-4" />

                                        <span> {item.title} </span>

                                    </Link>
                                )

                            })

                        ) : (

                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-sm text-foreground">
                                    No results found.
                                </p>
                            </div>

                        )

                        }

                </ScrollArea>
            </div>
        
        </>
        
    )
}

