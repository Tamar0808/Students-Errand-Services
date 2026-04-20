"use client";

import { Toaster } from "sonner";

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            expand={true}
            richColors
            closeButton
            toastOptions={{
                style: {
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                },
            }}
        />
    );
}