"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, Sparkles, Bell } from "lucide-react";

export default function Navbar() {
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (!session) return null;

    const initials = session.user.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="border-b border-white/20 bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-soft">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-primary-solid hover-scale transition-all duration-200" onClick={closeMobileMenu}>
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            Student Errands
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-2">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="hover:bg-indigo-50 hover:text-indigo-700 transition-colors">Dashboard</Button>
                        </Link>

                        {session.user.role === "runner" && (
                            <>
                                <Link href="/runner/feed">
                                    <Button variant="ghost" className="hover:bg-indigo-50 hover:text-indigo-700 transition-colors">Errand Feed</Button>
                                </Link>
                                <Link href="/runner/tasks">
                                    <Button variant="ghost" className="hover:bg-indigo-50 hover:text-indigo-700 transition-colors">My Tasks</Button>
                                </Link>
                                <Link href="/runner/profile">
                                    <Button variant="ghost" className="hover:bg-indigo-50 hover:text-indigo-700 transition-colors">Profile</Button>
                                </Link>
                            </>
                        )}

                        {session.user.role === "user" && (
                            <Link href="/runners">
                                <Button variant="ghost" className="hover:bg-indigo-50 hover:text-indigo-700 transition-colors">Find Runners</Button>
                            </Link>
                        )}
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="relative hover:bg-indigo-50">
                            <Bell className="h-4 w-4" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse"></div>
                        </Button>

                        <div className="flex items-center space-x-3 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
                            <Avatar className="h-8 w-8 ring-2 ring-indigo-200">
                                <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold">{initials}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm min-w-0">
                                <div className="font-medium text-slate-900 break-words">{session.user.name}</div>
                                <div className="text-xs text-indigo-600 capitalize flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    {session.user.role}
                                </div>
                            </div>
                        </div>

                        <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: "/" })} className="border-slate-200 hover:border-indigo-300 hover:bg-indigo-50">
                            Sign Out
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMobileMenu}
                            className="p-2 hover:bg-indigo-50"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-indigo-100 bg-white/95 backdrop-blur-xl animate-slide-up">
                        <div className="px-2 pt-4 pb-6 space-y-3">
                            <div className="flex items-center space-x-4 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 mb-4 min-w-0">
                                <Avatar className="h-12 w-12 ring-2 ring-indigo-200">
                                    <AvatarFallback className="text-sm bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold">{initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900 break-words">{session.user.name}</div>
                                    <div className="text-xs text-indigo-600 capitalize flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        {session.user.role}
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="ml-auto">
                                    <Bell className="h-4 w-4" />
                                </Button>
                            </div>

                            <Link href="/dashboard" onClick={closeMobileMenu}>
                                <Button variant="ghost" className="w-full justify-start hover:bg-indigo-50 hover:text-indigo-700">
                                    Dashboard
                                </Button>
                            </Link>

                            {session.user.role === "runner" && (
                                <>
                                    <Link href="/runner/feed" onClick={closeMobileMenu}>
                                        <Button variant="ghost" className="w-full justify-start hover:bg-indigo-50 hover:text-indigo-700">
                                            Errand Feed
                                        </Button>
                                    </Link>
                                    <Link href="/runner/tasks" onClick={closeMobileMenu}>
                                        <Button variant="ghost" className="w-full justify-start hover:bg-indigo-50 hover:text-indigo-700">
                                            My Tasks
                                        </Button>
                                    </Link>
                                    <Link href="/runner/profile" onClick={closeMobileMenu}>
                                        <Button variant="ghost" className="w-full justify-start hover:bg-indigo-50 hover:text-indigo-700">
                                            Profile
                                        </Button>
                                    </Link>
                                </>
                            )}

                            {session.user.role === "user" && (
                                <Link href="/runners" onClick={closeMobileMenu}>
                                    <Button variant="ghost" className="w-full justify-start hover:bg-indigo-50 hover:text-indigo-700">
                                        Find Runners
                                    </Button>
                                </Link>
                            )}

                            <div className="pt-3 border-t border-indigo-100 mt-4">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
                                    onClick={() => {
                                        closeMobileMenu();
                                        signOut({ callbackUrl: "/" });
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}