import React from 'react'

export default function SidebarItem({ icon: Icon, title, collapsed }) {
  return (
      <div className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted cursor-pointer ${collapsed ? "mx-4 my-2 py-3! aspect-square justify-center " : " justify-normal aspect-auto py-2! "}`}>

        <Icon className={collapsed ? "size-4" : "size-4"} />
        <span className={`text-sm ${collapsed ? "hidden" : "flex"}`}>{title}</span>

      </div>
  );
}

