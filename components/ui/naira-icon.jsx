import React from 'react';

export const NairaIcon = ({ className = "h-4 w-4", ...props }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M6 4v16" />
        <path d="M18 4v16" />
        <path d="M6 8h12" />
        <path d="M6 16h12" />
        <path d="M6 4l12 16" />
    </svg>
);

export default NairaIcon;