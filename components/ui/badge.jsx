import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2",
    {
        variants: {
            variant: {
                default: "border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-soft",
                secondary: "border-transparent bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700",
                destructive: "border-transparent bg-gradient-to-r from-red-500 to-red-600 text-white shadow-soft",
                outline: "text-slate-700 border-slate-300",
                success: "border-transparent bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-soft",
                warning: "border-transparent bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-soft",
                info: "border-transparent bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-soft",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

function Badge({ className, variant, ...props }) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
