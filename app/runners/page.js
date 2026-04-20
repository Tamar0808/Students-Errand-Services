"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, CheckCircle, TrendingUp, MapPin, X, Sparkles, Users } from "lucide-react";
import { NairaIcon } from "@/components/ui/naira-icon";

export default function RunnersPage() {
  const { data: session } = useSession();
  const [runners, setRunners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRunner, setSelectedRunner] = useState(null);
  const [userErrands, setUserErrands] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    fetchRunners();
    if (session?.user?.id) {
      fetchUserErrands();
    }
  }, [session]);

  const fetchRunners = async () => {
    try {
      const res = await fetch("/api/runners");
      const data = await res.json();
      setRunners(data);
    } catch (error) {
      console.error("Error fetching runners:", error);
      toast.error("Failed to load runners");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserErrands = async () => {
    try {
      const res = await fetch(`/api/errands?userId=${session.user.id}&status=pending`);
      const data = await res.json();
      setUserErrands(data);
    } catch (error) {
      console.error("Error fetching user errands:", error);
      toast.error("Failed to load your errands");
    }
  };

  const handleAssignTask = (runner) => {
    if (!runner.isAvailable) {
      toast.error("This runner is currently unavailable");
      return;
    }
    setSelectedRunner(runner);
    setShowAssignModal(true);
  };

  const assignErrandToRunner = async (errandId) => {
    const loadingToast = toast.loading("Assigning task...");
    
    try {
      const res = await fetch(`/api/errands/${errandId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "accepted",
          assignedTo: selectedRunner.userId._id,
        }),
      });

      if (res.ok) {
        setShowAssignModal(false);
        setSelectedRunner(null);
        fetchUserErrands();
        toast.success(`Task assigned to ${selectedRunner.userId.name}!`, {
          description: "They will be notified and can start working on it.",
          duration: 5000,
        });
      } else {
        toast.error("Failed to assign task", {
          description: "Please try again or contact support.",
        });
      }
    } catch (error) {
      console.error("Error assigning errand:", error);
      toast.error("Something went wrong", {
        description: "Please check your connection and try again.",
      });
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "info";
      default: return "secondary";
    }
  };

  const getInitials = (name) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Find Runners</h1>
          <p className="text-slate-600 mt-1">Browse available student runners</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">Find Runners</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Browse our community of trusted student runners and assign your errands with confidence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {runners.map((runner, index) => (
          <Card 
            key={runner._id} 
            className="hover-lift shadow-soft hover:shadow-medium border-0 bg-white/80 backdrop-blur-sm animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="text-center pb-4">
              <div className="relative flex justify-center mb-4">
                <Avatar className="h-20 w-20 ring-4 ring-white shadow-medium">
                  <AvatarFallback className="text-lg bg-gradient-to-br from-slate-100 to-slate-200 font-semibold">
                    {getInitials(runner.userId.name)}
                  </AvatarFallback>
                </Avatar>
                {runner.isAvailable && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <CardTitle className="text-xl font-semibold">{runner.userId.name}</CardTitle>
              <CardDescription className="text-slate-500">{runner.userId.email}</CardDescription>
              
              <div className="flex justify-center mt-3">
                <Badge 
                  variant={runner.isAvailable ? "success" : "secondary"}
                  className="text-xs font-medium px-3 py-1"
                >
                  {runner.isAvailable ? "Available Now" : "Unavailable"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-bold text-lg">{runner.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Rating</p>
                </div>
                
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="font-bold text-lg">{runner.completedCount}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Completed</p>
                </div>
                
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="font-bold text-lg">{runner.acceptRate}%</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Accept Rate</p>
                </div>
              </div>

              <Button 
                className="w-full shadow-soft hover:shadow-medium transition-all duration-200" 
                disabled={!runner.isAvailable}
                variant={runner.isAvailable ? "default" : "secondary"}
                onClick={() => handleAssignTask(runner)}
              >
                {runner.isAvailable ? "Assign Task" : "Unavailable"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {runners.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="py-16 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-slate-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">No runners available</h3>
                <p className="text-slate-500 mt-1">Check back later for available runners</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Assignment Modal */}
      {showAssignModal && selectedRunner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-strong animate-scale-in">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold gradient-text">
                    Assign Task to {selectedRunner.userId.name}
                  </h2>
                  <p className="text-slate-600">
                    Select one of your pending errands to assign to this trusted runner
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAssignModal(false)}
                  className="hover:bg-slate-100 rounded-full p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {userErrands.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No pending errands</h3>
                  <p className="text-slate-500 mb-4">
                    Create a new errand from your dashboard first.
                  </p>
                  <Button onClick={() => setShowAssignModal(false)}>
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userErrands.map((errand, index) => (
                    <Card 
                      key={errand._id} 
                      className="hover-lift shadow-soft hover:shadow-medium border-0 animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="text-lg font-semibold">{errand.title}</CardTitle>
                            <CardDescription className="text-slate-600">{errand.description}</CardDescription>
                          </div>
                          <Badge variant={getUrgencyColor(errand.urgency)} className="font-medium">
                            {errand.urgency.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span className="font-medium">{errand.location}</span>
                          </div>
                          {errand.priceOffer > 0 && (
                            <div className="flex items-center gap-2">
                              <NairaIcon className="h-4 w-4" />
                              <span className="font-semibold text-green-600">
                                ₦{errand.priceOffer.toFixed(2)}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <Button 
                          onClick={() => assignErrandToRunner(errand._id)}
                          className="w-full shadow-soft hover:shadow-medium transition-all duration-200"
                        >
                          Assign This Task
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}