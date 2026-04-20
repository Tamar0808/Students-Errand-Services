"use client";

import { usePageTransition } from "@/hooks/usePageTransition";

export default function PageTransition({
    children,
    animationType = "fadeSlideUp",
    className = ""
}) {
    const { containerRef } = usePageTransition(animationType);

    return (
        <div
            ref={containerRef}
            className={`w-full ${className}`}
        >
            {children}
        </div>
    );
}