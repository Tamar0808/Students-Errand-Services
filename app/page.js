"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Zap, Shield, Star, Sparkles, Clock, MapPin, CheckCircle, TrendingUp } from "lucide-react";
import { NairaIcon } from "@/components/ui/naira-icon";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/ui/scroll-to-top";
import SimpleCountUp from "@/components/ui/simple-count-up";

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const floatingElementsRef = useRef([]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-x-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="/student-runner-bg.svg" 
            alt="Student running errands" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-pink-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-sm font-medium text-indigo-700">
                <Sparkles className="h-4 w-4" />
                <span>Connecting Students Across Campus</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-heading-solid text-balance leading-tight">
                Student Errand
                <br />
                <span className="relative gradient-text">
                  Services
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse"></div>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto text-balance leading-relaxed">
                Connect with fellow UNIPORT students to get errands done or earn money running them. 
                <span className="text-indigo-600 font-semibold"> Fast, safe, and community-driven.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center hero-animate">
              <Link href="/auth/signup?role=user">
                <Button size="lg" className="group shadow-strong hover:shadow-glow transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-4 text-lg">
                  Get Started as User
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/auth/signup?role=runner">
                <Button size="lg" variant="outline" className="shadow-medium hover:shadow-strong transition-all duration-300 border-2 border-indigo-200 hover:border-indigo-300 px-8 py-4 text-lg hover-glow">
                  Become a Runner
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 mt-20 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  <SimpleCountUp end={1000} suffix="+" duration={2.5} delay={0.2} />
                </div>
                <div className="text-slate-600 font-medium text-lg">Active Students</div>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  <SimpleCountUp end={500} suffix="+" duration={2.5} delay={0.4} />
                </div>
                <div className="text-slate-600 font-medium text-lg">Errands Completed</div>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  <SimpleCountUp end={49} suffix="★" duration={2.5} delay={0.6} decimals={1} />
                </div>
                <div className="text-slate-600 font-medium text-lg">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-sm font-medium text-indigo-700 mb-6">
              <Star className="h-4 w-4" />
              <span>Why Choose Our Platform?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-heading-solid mb-6">
              Built by Students, for Students
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of campus errands with our innovative platform designed specifically for UNIPORT student life.
            </p>
          </div>

          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="group text-center space-y-6 interactive-card p-8 rounded-2xl">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto group-hover:shadow-glow transition-all duration-300">
                  <Zap className="h-10 w-10 text-indigo-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Lightning Fast</h3>
              <p className="text-slate-600 leading-relaxed">
                Get your errands posted and accepted within minutes. Real-time updates and instant notifications keep you informed every step of the way.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-indigo-600 font-medium">
                <Clock className="h-4 w-4" />
                <span>Average response: 3 minutes</span>
              </div>
            </Card>

            <Card className="group text-center space-y-6 interactive-card p-8 rounded-2xl">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center mx-auto group-hover:shadow-glow transition-all duration-300">
                  <Shield className="h-10 w-10 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Trusted & Safe</h3>
              <p className="text-slate-600 leading-relaxed">
                All runners are verified students with ID verification. Our comprehensive rating and review system ensures quality service and peace of mind.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium">
                <Shield className="h-4 w-4" />
                <span>100% verified students</span>
              </div>
            </Card>

            <Card className="group text-center space-y-6 interactive-card p-8 rounded-2xl">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto group-hover:shadow-glow transition-all duration-300">
                  <Users className="h-10 w-10 text-purple-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Community Driven</h3>
              <p className="text-slate-600 leading-relaxed">
                Built for the student community by students. Help each other succeed while earning money or saving precious time for what matters most.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-purple-600 font-medium">
                <Users className="h-4 w-4" />
                <span>Growing community</span>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="py-32 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-60 h-60 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/80 mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Ready to Get Started?</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white-contrast mb-6">
                Join the Revolution
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Thousands of UNIPORT students are already transforming their campus experience. Be part of the community that's changing how students help each other.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              <Card className="bg-white/95 backdrop-blur-xl hover-lift group border-2 border-indigo-200 shadow-strong">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900">Need Errands Done?</CardTitle>
                  <CardDescription className="text-slate-600 text-base">
                    Post your errand and let trusted student runners help you out
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                      <span>Post errands in under 2 minutes</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                      <span>Set your own price and timeline</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                      <span>Track progress in real-time</span>
                    </div>
                  </div>
                  <Link href="/auth/signup?role=user" className="block">
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-strong hover:shadow-glow transition-all duration-300" size="lg">
                      Get Started as User
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-xl hover-lift group border-2 border-green-200 shadow-strong">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                    <NairaIcon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900">Want to Run Errands?</CardTitle>
                  <CardDescription className="text-slate-600 text-base">
                    Earn money helping fellow students while building your reputation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                      <span>Flexible schedule that fits your life</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                      <span>Choose tasks that match your skills</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                      <span>Build reputation and earn more</span>
                    </div>
                  </div>
                  <Link href="/auth/signup?role=runner" className="block">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-strong hover:shadow-glow transition-all duration-300" size="lg">
                      Get Started as Runner
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="pt-12">
              <p className="text-slate-400 text-lg">
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-white font-medium hover:text-indigo-300 transition-colors underline decoration-2 underline-offset-4">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
