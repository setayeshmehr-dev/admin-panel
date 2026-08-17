'use client'
import {Moon, Sun, Monitor, PanelLeft , PanelTop, X} from "lucide-react";
import React, { useState } from "react";
import AppearanceItem from "@/components/layout/appearanceItem";
import AppearanceColorItem from "@/components/layout/appearanceColorItem";

import { Button } from "@/components/ui/button";


export default function Appearance({setAppearanceOpen, setLayoutMode, layoutMode}) {

    const [theme, setTheme] = useState("light");
    const [color, setColor] = useState("violet");

    return (
        <>
            <div onClick={() => setAppearanceOpen(false)} className="fixed inset-0  z-50 flex items-center justify-center bg-black/40"></div>

            <div className=" fixed top-0 **:select-none right-0 m-3  z-60 w-[90%] h-[95%] max-w-100  rounded-xl bg-background shadow-xl border p-4 " >

                <Button onClick={()=>setAppearanceOpen(false)} variant="ghost" size="icon" className=" absolute top-1 right-2" >
                    <X />
                </Button>

                <div className=' flex flex-col mb-10  md:mb-5 lg:mb-10'>
                    <span className='font-semibold'>
                        Customize
                    </span>
                    <span className='text-muted-foreground text-sm'>
                        Personalize your dashboard experience.
                    </span>
                </div>

                <span className='font-semibold text-[14px]' >Theme</span>
         
                <div className="flex gap-2 mt-2 mb-10 md:mb-5 lg:mb-10">

                    <AppearanceItem active={theme === "light"} onClick={() => setTheme("light")} icon={Sun} label="Light"/>
                    
                    <AppearanceItem active={theme === "dark"} onClick={() => setTheme("dark")} icon={Moon} label="Dark"/>

                    <AppearanceItem active={theme === "system"} onClick={() => setTheme("system")} icon={Monitor} label="System"/>

                </div>

                <span className='font-semibold text-[14px]' >Color</span>
                <div className='flex h-auto *:md:w-[31%] *:lg:w-[48%] mb-10 md:mb-5 lg:mb-10 mt-2 flex-wrap gap-2'>
                        <AppearanceColorItem active={color === "emerald"} onClick={() => setColor("emerald")} color="#009048" label="Emerald" />
                        <AppearanceColorItem active={color === "blue"} onClick={() => setColor("blue")} color="#0079d3" label="Blue" />
                        <AppearanceColorItem active={color === "violet"} onClick={() => setColor("violet")} color="#615cdc" label="Violet" />
                        <AppearanceColorItem active={color === "rose"} onClick={() => setColor("rose")} color="#bb3181" label="Rose" />
                        <AppearanceColorItem active={color === "red"} onClick={() => setColor("red")} color="#ae0000" label="Red" />
                        <AppearanceColorItem active={color === "slate"} onClick={() => setColor("slate")} color="#6a727e" label="Slate" />
                </div>

                <span className=' hidden md:flex font-semibold text-[14px] mt-10 md:mt-5 lg:mt-10' >Layout</span>

                <div className='hidden md:flex h-auto gap-2 mt-2'>

                    <AppearanceItem active={layoutMode === "sidebar"} onClick={() => setLayoutMode("sidebar")} icon={PanelLeft} label="Sidebar"/>

                    <AppearanceItem active={layoutMode === "topnav"} onClick={() => setLayoutMode("topnav")} icon={PanelTop} label="Top Nav"/>

                </div>
            </div>
        </>
    )
}



