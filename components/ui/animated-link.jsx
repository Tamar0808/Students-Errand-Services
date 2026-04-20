"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { animatePageExit } from "@/lib/animations";

export default function AnimatedLink({
    href,
    children,
    className = "",
    animationType = "fadeSlideUp",
    ...props
}) {
    const router = useRouter();

    const handleClick = async (e) => {
        e.preventDefault();

        // Find the main page container
        const pageContainer = document.querySelector('[data-page-container]');

        if (pageContainer) {
            // Animate exit
            await animatePageExit(pageContainer, animationType);
        }

        // Navigate to new page
        router.push(href);
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={className}
            {...props}
        >
            {children}
        </Link>
    );
}