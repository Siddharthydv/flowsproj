"use client";

import { ReactNode } from "react"

export const LinkButton = ({ children, onClick }: { children: ReactNode, onClick: () => void }) => {
    return <button className="flex justify-center px-2 py-2 cursor-pointer hover:bg-slate-100 font-light text-sm rounded hover:scale-110 active:scale-125 " onClick={onClick}>
        {children}
    </button>
}