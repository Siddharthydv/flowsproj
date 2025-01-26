"use client"
import { ReactNode } from "react"

export const PrimaryButton = ({ children, onClick, size = "small" }: {
    children: ReactNode,
    onClick: () => void,
    size?: "big" | "small"
}) => {
    return <button onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-10 py-4"} cursor-pointer hover:shadow-md bg-[#D64B3D] hover:bg-[#d33e30] text-white rounded-full text-center flex justify-center flex-col transition-transform hover:scale-110 active:scale-125`}>
        {children}
    </button>
}