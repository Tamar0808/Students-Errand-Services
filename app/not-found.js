"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Home, ArrowLeft, Search, HelpCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl floating-element"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl floating-element" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative max-w-2xl mx-auto px-4 text-center space-y-12 animate-fade-in">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-strong">
                        <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Student Errands</h1>
                    </div>
                </div>

                {/* 404 Content */}
                <div className="space-y-8">
                    {/* Large 404 */}
                    <div className="space-y-4">
                        <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            404
                        </div>
                        <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mx-auto"></div>
                    </div>

                    {/* Error Message */}
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                            Oops! Page Not Found
                        </h2>
                        <p className="text-xl text-slate-600 max-w-lg mx-auto leading-relaxed">
                            The page you're looking for seems to have wandered off campus. 
                            Let's get you back to where you need to be!
                        </p>
                    </div>

                    {/* Helpful Suggestions */}
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-indigo-200 p-8 shadow-strong">
                        <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                            <HelpCircle className="h-5 w-5 text-indigo-600" />
                            What can you do?
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-left">
                            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mt-1">
                                    <Home className="h-4 w-4 text-indigo-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-900">Go Home</h4>
                                    <p className="text-sm text-slate-600">Return to the main page</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                                    <Search className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-900">Browse Errands</h4>
                                    <p className="text-sm text-slate-600">Find available tasks</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/">
                            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-medium hover:shadow-strong transition-all duration-300 group">
                                <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                                Back to Home
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="outline" size="lg" className="border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300">
                                <Search className="h-5 w-5 mr-2" />
                                Browse Errands
                            </Button>
                        </Link>
                    </div>

                    {/* Go Back Link */}
                    <div className="pt-8">
                        <button 
                            onClick={() => window.history.back()} 
                            className="text-slate-500 hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2 mx-auto group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Or go back to the previous page</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}