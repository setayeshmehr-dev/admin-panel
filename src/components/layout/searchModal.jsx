"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function SearchModal({setSearchOpen}) {
    return (
        <>
            <div onClick={() => setSearchOpen(false)} className="fixed inset-0  z-50 flex items-center justify-center bg-black/40"></div>


            <div onClick={(e)=> e.stopPropagation()} className=" fixed top-[50%] left-[50%] translate-[-50%] z-60 w-[90%] max-w-xl rounded-xl bg-background shadow-xl border p-4">
                <div className="flex items-center gap-2">

                    <Search className="size-5 text-muted-foreground"/>

                    <Input  autoFocus placeholder="Search pages..." className="border-0 focus-visible:ring-0"/>

                    <Button onClick={()=>setSearchOpen(false)} variant="ghost" size="icon" >
                        <X />
                    </Button>

                </div>

                <div className=" mt-4 h-87.5 overflow-y-auto">

                    <p className="text-sm text-muted-foreground">
                        Search results will appear here
                    </p>

                </div>
            </div>
        
        </>
        
    )
}
