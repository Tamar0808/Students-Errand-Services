"use client";

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { buttonPressAnimation } from "@/lib/animations"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-medium hover:from-indigo-700 hover:to-purple-700 hover:shadow-strong",
                destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-medium hover:from-red-600 hover:to-red-700 hover:shadow-strong",
                outline: "border-2 border-indigo-200 bg-white shadow-soft hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-medium",
                secondary: "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 shadow-soft hover:from-slate-200 hover:to-slate-300 hover:shadow-medium",
                ghost: "hover:bg-indigo-50 hover:text-indigo-700",
                link: "text-indigo-600 underline-offset-4 hover:underline hover:text-indigo-700",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-8 rounded-lg px-3 text-xs",
                lg: "h-12 rounded-xl px-8 text-base font-semibold",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const buttonRef = React.useRef(null);

    React.useImperativeHandle(ref, () => buttonRef.current);

    const handleClick = (e) => {
        if (buttonRef.current) {
            buttonPressAnimation(buttonRef.current);
        }
        onClick?.(e);
    };

    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={buttonRef}
            onClick={handleClick}
            {...props}
        />
    )
})
Button.displayName = "Button"

export { Button, buttonVariants }
