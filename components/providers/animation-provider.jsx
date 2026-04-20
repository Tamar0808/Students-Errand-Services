"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { gsap } from "gsap";

const AnimationContext = createContext({
    isAnimationEnabled: true,
    toggleAnimations: () => { },
    reduceMotion: false
});

export const useAnimation = () => {
    const context = useContext(AnimationContext);
    if (!context) {
        throw new Error("useAnimation must be used within AnimationProvider");
    }
    return context;
};

export default function AnimationProvider({ children }) {
    const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        // Check for user's motion preferences
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduceMotion(mediaQuery.matches);

        const handleChange = (e) => {
            setReduceMotion(e.matches);
            if (e.matches) {
                // Disable or reduce animations for users who prefer reduced motion
                gsap.globalTimeline.timeScale(0.1);
            } else {
                gsap.globalTimeline.timeScale(1);
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        // Apply initial setting
        if (mediaQuery.matches) {
            gsap.globalTimeline.timeScale(0.1);
        }

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const toggleAnimations = () => {
        setIsAnimationEnabled(prev => {
            const newValue = !prev;
            if (newValue) {
                gsap.globalTimeline.play();
            } else {
                gsap.globalTimeline.pause();
            }
            return newValue;
        });
    };

    const value = {
        isAnimationEnabled,
        toggleAnimations,
        reduceMotion
    };

    return (
        <AnimationContext.Provider value={value}>
            {children}
        </AnimationContext.Provider>
    );
}