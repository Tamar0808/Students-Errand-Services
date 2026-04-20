"use client";

import { useEffect, useRef } from "react";
import { loadingAnimation } from "@/lib/animations";

export default function LoadingAnimation({
    children,
    className = "",
    size = "md"
}) {
    const elementRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (elementRef.current) {
            animationRef.current = loadingAnimation(elementRef.current);
        }

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, []);

    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12"
    };

    return (
        <div
            ref={elementRef}
            className={`${sizeClasses[size]} ${className}`}
        >
            {children}
        </div>
    );
}