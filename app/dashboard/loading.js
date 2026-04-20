import { LoadingCard } from "@/components/ui/loading";
import { Sparkles, TrendingUp, Clock, CheckCircle, User } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Skeleton */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center animate-pulse">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
                            <div className="h-4 bg-slate-200 rounded w-64 mt-2 animate-pulse"></div>
                        </div>
                    </div>
                </div>
                <div className="h-12 bg-slate-200 rounded-xl w-48 animate-pulse"></div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[TrendingUp, Clock, User, CheckCircle, Sparkles].map((Icon, index) => (
                    <div key={index} className="bg-white rounded-2xl border-2 border-slate-200 p-4 animate-pulse">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center">
                                <Icon className="h-5 w-5 text-slate-400" />
                            </div>
                            <div>
                                <div className="h-6 bg-slate-200 rounded w-12 mb-1"></div>
                                <div className="h-3 bg-slate-200 rounded w-16"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Errands List Skeleton */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="h-6 bg-slate-200 rounded w-32 animate-pulse"></div>
                </div>
                
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <LoadingCard key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}