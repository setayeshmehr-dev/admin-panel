"use client";

import { createContext, useContext, useState } from "react";
import { notifications as initialNotifications } from "@/data/notifications";


const NotificationContext = createContext();


export function NotificationProvider({children}) {

    const [notifications, setNotifications] = useState(initialNotifications);

    const markAllAsRead = () => {
        setNotifications((prev)=> 
            prev.map((item)=>({...item, unread:false}))
        );
    };


    const unreadCount = notifications.filter((item)=> item.unread).length;


    return (
        <NotificationContext.Provider value={{notifications, unreadCount, markAllAsRead}}>
            {children}
        </NotificationContext.Provider>
    );
}


export function useNotifications(){
    return useContext(NotificationContext);
}