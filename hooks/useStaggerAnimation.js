"use client";

import { useEffect, useRef } from "react";
import { animateStagger } from "@/lib/animations";

export const useStaggerAnimation = (dependency = [], delay = 0) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (children.length > 0) {
      animateStagger(children, delay);
    }
  }, dependency);

  return containerRef;
};