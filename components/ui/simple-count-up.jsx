"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SimpleCountUp({
    end,
    duration = 2,
    suffix = "",
    prefix = "",
    className = "",
    decimals = 0,
    delay = 0
}) {
    const [currentValue, setCurrentValue] = useState(0);
    const elementRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) return;

        const timer = setTimeout(() => {
            hasAnimated.current = true;

            const obj = { value: 0 };

            gsap.to(obj, {
                value: end,
                duration: duration,
                ease: "power2.out",
                delay: delay,
                onUpdate: () => {
                    if (decimals > 0) {
                        setCurrentValue(obj.value / Math.pow(10, decimals));
                    } else {
                        setCurrentValue(Math.floor(obj.value));
                    }
                },
                onComplete: () => {
                    if (decimals > 0) {
                        setCurrentValue(end / Math.pow(10, decimals));
                    } else {
                        setCurrentValue(end);
                    }
                }
            });
        }, 500); // Small delay to ensure component is mounted

        return () => clearTimeout(timer);
    }, [end, duration, decimals, delay]);

    const formatValue = (value) => {
        if (decimals > 0) {
            return value.toFixed(1);
        }
        return Math.floor(value).toLocaleString();
    };

    return (
        <span ref={elementRef} className={className}>
            {prefix}{formatValue(currentValue)}{suffix}
        </span>
    );
}