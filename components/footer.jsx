import Link from "next/link";
import { Sparkles, Heart, Mail, MapPin, Phone, ExternalLink, Globe, Users, MessageCircle } from "lucide-react";
import { NairaIcon } from "@/components/ui/naira-icon";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-12">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-glow">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Student Errands</h3>
                                <p className="text-sm text-slate-300">By students, for students</p>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                            Connecting UNIPORT students who need errands done with reliable student runners.
                            Building a stronger campus community, one task at a time.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <MessageCircle className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Users className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <Globe className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110">
                                <ExternalLink className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                            Quick Links
                        </h4>
                        <div className="space-y-3">
                            <Link href="/dashboard" className="block text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                                Dashboard
                            </Link>
                            <Link href="/runners" className="block text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                                Find Runners
                            </Link>
                            <Link href="/auth/signup?role=runner" className="block text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                                Become a Runner
                            </Link>
                            <Link href="/auth/signin" className="block text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                                Sign In
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                            Support
                        </h4>
                        <div className="space-y-3">
                            <Link href="#" className="block text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                                Help Center
                            </Link>
                            <Link href="#" className="block text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                                Safety Guidelines
                            </Link>
                            <Link href="#" className="block text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                                Community Rules
                            </Link>
                            <Link href="#" className="block text-slate-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform">
                                Report Issue
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full"></div>
                            Get in Touch
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm">Email us</p>
                                    <p className="text-white font-medium">support@studenterrands.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm">Campus Location</p>
                                    <p className="text-white font-medium">University of Port Harcourt</p>
                                    <p className="text-slate-300 text-sm">Student Affairs Complex</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-sm">Support Line</p>
                                    <p className="text-white font-medium">+234 (0) 800 ERRANDS</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-12 border-t border-white/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-white">1000+</div>
                            <div className="text-sm text-slate-300">Active Students</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-white">500+</div>
                            <div className="text-sm text-slate-300">Errands Completed</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-white flex items-center justify-center gap-1">
                                <NairaIcon className="h-6 w-6" />
                                50K+
                            </div>
                            <div className="text-sm text-slate-300">Earned by Runners</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-white">4.9★</div>
                            <div className="text-sm text-slate-300">Average Rating</div>
                        </div>
                    </div>
                </div>

                <div className="py-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 text-slate-300">
                            <span>Made with</span>
                            <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                            <span>by students, for students</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
                            <Link href="#" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="#" className="hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                        </div>

                        <div className="text-slate-300 text-sm">
                            © {currentYear} Student Errands UNIPORT. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}