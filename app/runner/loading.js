import { LoadingCard } from "@/components/ui/loading";
import { Zap, Star, CheckCircle, Target, TrendingUp, Award } from "lucide-react";

export default function RunnerLoading() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Skeleton */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-medium animate-pulse">
                        <Zap className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <div className="h-8 bg-slate-200 rounded w-48 animate-pulse"></div>
                        <div className="h-4 bg-slate-200 rounded w-64 mt-2 animate-pulse"></div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-12 bg-slate-200 rounded-xl w-64 animate-pulse"></div>
                    <div className="h-8 bg-slate-200 rounded-full w-20 animate-pulse"></div>
                </div>
            </div>

            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[Star, CheckCircle, Target, Zap].map((Icon, index) => (
                    <div key={index} className="bg-white rounded-2xl border-2 border-slate-200 p-6 animate-pulse">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
                                <Icon className="h-6 w-6 text-slate-400" />
                            </div>
                            <div>
                                <div className="h-8 bg-slate-200 rounded w-16 mb-2"></div>
                                <div className="h-4 bg-slate-200 rounded w-20"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Column Layout Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Available Errands */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center animate-pulse">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <div className="h-6 bg-slate-200 rounded w-40 animate-pulse"></div>
                            <div className="h-4 bg-slate-200 rounded w-48 mt-1 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <LoadingCard key={i} />
                        ))}
                    </div>
                </div>

                {/* My Tasks */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center animate-pulse">
                            <Award className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <div className="h-6 bg-slate-200 rounded w-32 animate-pulse"></div>
                            <div className="h-4 bg-slate-200 rounded w-40 mt-1 animate-pulse"></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <LoadingCard key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}