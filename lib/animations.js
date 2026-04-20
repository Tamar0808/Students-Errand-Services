"use client";

import { gsap } from "gsap";

// Animation configurations
export const animationConfig = {
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.1,
};

// Page transition animations
export const pageTransitions = {
  // Fade and slide up entrance
  fadeSlideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  },
  
  // Scale and fade
  scaleFade: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  },
  
  // Slide from right
  slideRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }
};

// Utility functions for common animations
export const animatePageEnter = (element, type = "fadeSlideUp") => {
  const config = pageTransitions[type];
  
  gsap.fromTo(element, 
    config.initial,
    {
      ...config.animate,
      duration: animationConfig.duration,
      ease: animationConfig.ease
    }
  );
};

export const animatePageExit = (element, type = "fadeSlideUp") => {
  const config = pageTransitions[type];
  
  return gsap.to(element, {
    ...config.exit,
    duration: animationConfig.duration * 0.8,
    ease: "power2.in"
  });
};

// Stagger animations for lists
export const animateStagger = (elements, delay = 0) => {
  gsap.fromTo(elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      stagger: animationConfig.stagger,
      delay
    }
  );
};

// Card hover animations
export const cardHoverAnimation = (element) => {
  const tl = gsap.timeline({ paused: true });
  
  tl.to(element, {
    y: -5,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    duration: 0.3,
    ease: "power2.out"
  });
  
  return tl;
};

// Button press animation
export const buttonPressAnimation = (element) => {
  gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    ease: "power2.out",
    yoyo: true,
    repeat: 1
  });
};

// Loading animation
export const loadingAnimation = (element) => {
  return gsap.to(element, {
    rotation: 360,
    duration: 1,
    ease: "none",
    repeat: -1
  });
};

// Reveal animation for text
export const revealText = (element, delay = 0) => {
  gsap.fromTo(element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay
    }
  );
};

// Floating animation for background elements
export const floatingAnimation = (element, intensity = 1) => {
  gsap.to(element, {
    y: `${10 * intensity}px`,
    rotation: `${2 * intensity}deg`,
    duration: 3 + Math.random() * 2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });
};