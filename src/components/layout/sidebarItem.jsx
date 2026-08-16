import React from 'react'
import Link from "next/link";

export default function SidebarItem({ icon: Icon, title, collapsed , href}) {
  return (
      <Link href={href} className={` flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted ${collapsed ? "mx-4 my-2 py-3! aspect-square justify-center " : " justify-normal aspect-auto py-2! "} `} >

            <Icon className="size-4" />
            {!collapsed && (<span className='text-sm '>{title}</span>)}

      </Link>
  );
}

