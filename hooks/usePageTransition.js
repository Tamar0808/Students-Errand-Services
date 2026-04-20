"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { animatePageEnter, animatePageExit } from "@/lib/animations";

export const usePageTransition = (animationType = "fadeSlideUp") => {
  const containerRef = useRef(null);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If pathname changed, animate entrance
    if (previousPathname.current !== pathname) {
      animatePageEnter(container, animationType);
      previousPathname.current = pathname;
    } else {
      // Initial load animation
      animatePageEnter(container, animationType);
    }
  }, [pathname, animationType]);

  const exitPage = async (callback) => {
    const container = containerRef.current;
    if (!container) {
      callback?.();
      return;
    }

    const animation = animatePageExit(container, animationType);
    await animation;
    callback?.();
  };

  return { containerRef, exitPage };
};