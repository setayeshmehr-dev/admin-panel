'use client';

import { Menu,UserPlus ,CreditCard ,ShoppingCart , CheckCheck, Search, LogOut, Settings, Bell, Palette, Moon, Sun, Plus } from "lucide-react";

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

import React, { useState } from 'react'

const notifications = [
  {
    id: 1,
    title: "New order received",
    description: "Order #1024 has been created",
    time: "2 minutes ago",
    unread: true,
    icon: UserPlus
  },
  {
    id: 2,
    title: "Payment completed",
    description: "Payment successfully received",
    time: "10 minutes ago",
    unread: true,
    icon: CreditCard
  },
  {
    id: 3,
    title: "New customer registered",
    description: "A new customer joined",
    time: "1 hour ago",
    unread: false,
    icon: ShoppingCart
  },
  {
    id: 4,
    title: "New order received",
    description: "Order #1024 has been created",
    time: "2 minutes ago",
    unread: true,
    icon: UserPlus
  },
  {
    id: 5,
    title: "Payment completed",
    description: "Payment successfully received",
    time: "10 minutes ago",
    unread: true,
    icon: CreditCard
  },
  {
    id: 6,
    title: "New customer registered",
    description: "A new customer joined",
    time: "1 hour ago",
    unread: false,
    icon: ShoppingCart
  },
  {
    id: 7,
    title: "New order received",
    description: "Order #1024 has been created",
    time: "2 minutes ago",
    unread: true,
    icon: UserPlus
  },
  {
    id: 8,
    title: "Payment completed",
    description: "Payment successfully received",
    time: "10 minutes ago",
    unread: true,
    icon: CreditCard
  },
  {
    id: 9,
    title: "New customer registered",
    description: "A new customer joined",
    time: "1 hour ago",
    unread: false,
    icon: ShoppingCart
  },
]

export default function Header({setSidebarOpen , setSearchOpen, setAppearanceOpen}) {
    const [darkMode, setDarkMode] = useState(false)
    const unreadCount = notifications.filter((item)=>item.unread).length
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b border-border z-30 sticky top-0 left-0 right-0 bg-background" >
        <div className=" flex gap-2.5 ">
            <Button onClick={()=> setSidebarOpen(true)} variant="ghost" size="icon" className=" lg:hidden rounded-xl">
                <Menu className="size-5" />
            </Button>


            <Button onClick={()=> setSearchOpen(true)} variant="outline" className="justify-between w-[288px] h-9 rounded-lg hidden sm:flex">
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

            <Button onClick={()=> setAppearanceOpen(true)} variant="ghost" size="icon" className="rounded-xl">
              <Palette className="size-4" />
            </Button>

            <Popover>

                <PopoverTrigger className=" relative inline-flex size-9 items-center justify-center rounded-xl hover:bg-muted">
                    <Bell className="size-5"/>
                    { unreadCount > 0 && <span className=" absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-medium " > {unreadCount} </span> }
                </PopoverTrigger>

                <PopoverContent align="end" className=" w-95 p-0 overflow-hidden " >

                    {/* Header */}

                    <div className=" flex items-center justify-between px-4 py-3 " >
                        <div className=" flex items-center gap-2 " >
                            <h3 className=" font-semibold text-sm " > Notifications </h3>
                            <Badge className="bg-primary/20 rounded-full text-xs font-semibold text-primary " > {unreadCount} </Badge>
                        </div>
                        <div className="flex gap-1 text-muted-foreground hover:text-foreground text-xs cursor-pointer">
                            <CheckCheck className="size-4" />
                            <span className="  " > Mark all read </span>
                        </div>
                    </div>
                    
                    <Separator/>

                    {/* Content */}

                    <ScrollArea className=" h-80 " >

                        <div>
                            {notifications.map((item)=>{
                                const Icon = item.icon
                                return(
                                    <div key={item.id} className={`relative flex gap-3 items-center px-4 py-3 hover:bg-primary/30 transition-colors ${item.unread ? "bg-primary/20" : ""} cursor-pointer `} >

                                        { item.unread && <span className=" absolute right-5 top-1/2 translate-y-[-50%] items-center size-2 rounded-full bg-primary " /> }


                                        <div className=" flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 " >
                                            <Icon className="flex size-4 text-primary" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className={` text-sm font-medium ${item.unread ? "" : "text-muted-foreground"} `} > {item.title} </p>
                                            <p className=" text-xs text-muted-foreground " > {item.description} </p>
                                            <p className=" text-xs text-muted-foreground " > {item.time} </p>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>

                    </ScrollArea>

                    <Separator/>

                    {/* Footer */}

                    <div className=" w-full p-3" >
                        <span className="w-full flex justify-center items-center text-primary" > Show all notifications </span>
                    </div>


                </PopoverContent>

            </Popover>

            <DropdownMenu>

                <DropdownMenuTrigger
                    render={
                        <button className="rounded-full outline-none">
                            <Avatar className="cursor-pointer">
                                <AvatarFallback className="bg-linear-to-br from-primary from-35% via-primary/95 via-50% to-75% font-semibold to-secondary text-primary-foreground">
                                    AS
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    }
                />

                <DropdownMenuContent align="end" className="w-56">

                    <div className="px-3 py-2">
                        <p className="text-sm font-medium">
                            Amirali Setayeshmehr
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Setayeshmehr@example.com
                        </p>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <Settings />
                        Settings
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Bell />
                        Notifications
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem variant="destructive">
                        <LogOut />
                        Log out
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

        </div>
    </header>
  )
}
