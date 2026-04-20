"use client";

import React, { useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cardHoverAnimation } from "@/lib/animations";

export default function AnimatedCard({ children, className = "", ...props }) {
    const cardRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            animationRef.current = cardHoverAnimation(cardRef.current);
        }
    }, []);

    const handleMouseEnter = () => {
        animationRef.current?.play();
    };

    const handleMouseLeave = () => {
        animationRef.current?.reverse();
    };

    return (
        <Card
            ref={cardRef}
            className={`transition-all duration-300 cursor-pointer ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {children}
        </Card>
    );
}