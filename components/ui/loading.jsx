import { Sparkles, Loader2 } from "lucide-react";

export function LoadingSpinner({ size = "default", className = "" }) {
    const sizeClasses = {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12"
    };

    return (
        <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
    );
}

export function LoadingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl floating-element"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl floating-element" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative text-center space-y-8 animate-fade-in">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-strong animate-pulse">
                        <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Student Errands</h1>
                        <p className="text-sm text-slate-600">Loading your experience...</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-center">
                        <div className="relative">
                            <div className="w-20 h-20 border-4 border-indigo-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-lg font-medium text-slate-700">Getting things ready...</p>
                        <p className="text-sm text-slate-500">This won't take long</p>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LoadingCard() {
    return (
        <div className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-soft p-6 animate-pulse">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                    <div className="space-y-2 flex-1">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="h-3 bg-slate-200 rounded"></div>
                    <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                </div>
                <div className="flex gap-2">
                    <div className="h-6 bg-slate-200 rounded-full w-16"></div>
                    <div className="h-6 bg-slate-200 rounded-full w-20"></div>
                </div>
            </div>
        </div>
    );
}

export function LoadingButton({ children, loading, ...props }) {
    return (
        <button {...props} disabled={loading || props.disabled}>
            {loading ? (
                <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
}