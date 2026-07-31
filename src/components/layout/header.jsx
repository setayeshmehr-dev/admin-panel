'use client';

import { Menu, Search, Bell, Palette, Moon, Sun, Plus } from "lucide-react";

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"

import React, { useState } from 'react'

export default function Header({setSidebarOpen}) {
    const [darkMode, setDarkMode] = useState(false)
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b border-border z-30 sticky top-0 left-0 right-0 bg-background" >
        <div className=" flex gap-2.5 ">
            <Button onClick={()=> setSidebarOpen(true)} variant="ghost" size="icon" className=" lg:hidden rounded-xl">
                <Menu className="size-5" />
            </Button>


            <Button
            variant="outline"
            className="justify-between w-[288px] h-9 rounded-lg hidden sm:flex"
            >
                <div className="flex items-center gap-2.5">
                    <Search className="size-4" />
                    <span>Search anything...</span>
                </div>

                <kbd className="pointer-events-none rounded border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">⌘K</kbd>
            </Button>

        </div>
        <div className=" flex items-center gap-2 ">

            <Button variant="ghost" className=" hidden sm:flex rounded-xl ">
                <Plus className="size-4" />
                New Order
            </Button>

            <div className="h-6 w-px hidden sm:flex bg-border" />

            <Button onClick={() => setDarkMode(!darkMode)} variant="ghost" size="icon" className="rounded-xl">
                {darkMode ? (
                    <Sun className="size-4" />
                ) : (
                    <Moon className="size-4" />
                )}
            </Button>

            <Button variant="ghost" size="icon" className="rounded-xl">
              <Palette className="size-4" />
            </Button>

            <Button variant="ghost" size="icon" className="rounded-xl">
                <Bell className="size-4"  />
            </Button>

            <Avatar className="cursor-pointer">
                <AvatarFallback>AS</AvatarFallback>
            </Avatar>

        </div>
    </header>
  )
}
