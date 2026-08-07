'use client'
import React from 'react'

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Appearance({setAppearanceOpen}) {
    return (
        <>
            <div onClick={() => setAppearanceOpen(false)} className="fixed inset-0  z-50 flex items-center justify-center bg-black/40"></div>


            <div onClick={(e)=> e.stopPropagation()} className=" fixed top-[50%] left-[50%] translate-[-50%] z-60 w-[90%] max-w-xl rounded-xl bg-background shadow-xl border p-4">

                <Button onClick={()=>setAppearanceOpen(false)} variant="ghost" size="icon" >
                    <X />
                </Button>

            </div>
        
        </>
    )
}
