"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, CheckCircle, Star, Zap, User, Calendar, TrendingUp, Award, Target } from "lucide-react";
import { NairaIcon } from "@/components/ui/naira-icon";
import { LoadingSpinner, LoadingCard } from "@/components/ui/loading";
import { toast } from "sonner";
import SimpleCountUp from "@/components/ui/simple-count-up";

export default function RunnerDashboard() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(null);
  const [availableErrands, setAvailableErrands] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [acceptingErrand, setAcceptingErrand] = useState(null);
  const [completingErrand, setCompletingErrand] = useState(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile();
      fetchAvailableErrands();
      fetchMyTasks();
    }
  }, [session]);

  const fetchProfile = async () => {
    const res = await fetch(`/api/runners/${session.user.id}`);
    const data = await res.json();
    setProfile(data);
  };

  const fetchAvailableErrands = async () => {
    const res = await fetch("/api/errands?status=pending");
    const data = await res.json();
    setAvailableErrands(data);
  };

  const fetchMyTasks = async () => {
    const res = await fetch(`/api/errands?assignedTo=${session.user.id}`);
    const data = await res.json();
    setMyTasks(data);
  };

  const toggleAvailability = async () => {
    if (!profile) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/runners/${profile._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !profile.isAvailable }),
      });

      if (res.ok) {
        const updatedProfile = await res.json();
        setProfile(updatedProfile);
      }
    } catch (error) {
      console.error("Error updating availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const acceptErrand = async (errandId) => {
    setAcceptingErrand(errandId);
    try {
      const res = await fetch(`/api/errands/${errandId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "accepted",
          assignedTo: session.user.id,
        }),
      });

      if (res.ok) {
        fetchAvailableErrands();
        fetchMyTasks();
      }
    } catch (error) {
      console.error("Error accepting errand:", error);
    } finally {
      setAcceptingErrand(null);
    }
  };

  const completeErrand = async (errandId) => {
    setCompletingErrand(errandId);
    try {
      const res = await fetch(`/api/errands/${errandId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });

      if (res.ok) {
        fetchMyTasks();
        fetchProfile();
      }
    } catch (error) {
      console.error("Error completing errand:", error);
    } finally {
      setCompletingErrand(null);
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

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case "high": return "🔴";
      case "medium": return "🟡";
      case "low": return "🟢";
      default: return "⚪";
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Zap className="h-8 w-8 text-indigo-600" />
          </div>
          <p className="text-slate-600">Loading your runner profile...</p>
        </div>
      </div>
    );
  }

  const activeTasks = myTasks.filter(task => task.status === 'accepted');
  const completedTasks = myTasks.filter(task => task.status === 'completed');
  const totalEarnings = completedTasks.reduce((sum, task) => sum + (task.priceOffer || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in min-w-0 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-medium">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-primary-solid">Runner Dashboard</h1>
            <p className="text-slate-600">Manage your availability and track your earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-100">
            <Switch
              id="availability"
              checked={profile.isAvailable}
              onCheckedChange={toggleAvailability}
              disabled={loading}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
            />
            <Label htmlFor="availability" className="font-medium text-slate-700">
              {profile.isAvailable ? "Available for Errands" : "Currently Unavailable"}
            </Label>
          </div>
          <Badge
            variant={profile.isAvailable ? "success" : "secondary"}
            className={`px-4 py-2 text-sm font-semibold ${profile.isAvailable ? 'animate-pulse' : ''}`}
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${profile.isAvailable ? 'bg-green-400' : 'bg-slate-400'}`}></div>
            {profile.isAvailable ? "ONLINE" : "OFFLINE"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 min-w-0">
        <Card className="hover-lift border-2 border-transparent hover:border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">
                  <SimpleCountUp end={Math.round(profile.rating * 10)} decimals={1} duration={2} />
                </div>
                <div className="text-sm text-slate-600">Rating</div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < Math.floor(profile.rating) ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-2 border-transparent hover:border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">
                  <SimpleCountUp end={profile.completedCount} duration={2} />
                </div>
                <div className="text-sm text-slate-600">Completed</div>
                <div className="text-xs text-green-600 font-medium mt-1">
                  +<SimpleCountUp end={completedTasks.length} duration={1.5} /> this session
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-2 border-transparent hover:border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">{activeTasks.length}</div>
                <div className="text-sm text-slate-600">Active Tasks</div>
                <div className="text-xs text-blue-600 font-medium mt-1">In progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift border-2 border-transparent hover:border-emerald-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                <NairaIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900">
                  ₦<SimpleCountUp end={Math.round(totalEarnings)} duration={2.5} />
                </div>
                <div className="text-sm text-slate-600">Total Earned</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">This session</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Available Errands</h2>
              <p className="text-sm text-slate-600">{availableErrands.length} errands waiting for runners</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {availableErrands.length === 0 ? (
              <Card className="hover-lift">
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">No errands available</h3>
                  <p className="text-slate-500">Check back soon for new opportunities!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {availableErrands.map((errand, index) => (
                  <Card key={errand._id} className="hover-lift interactive-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <CardTitle className="text-lg text-slate-900 break-words">{errand.title}</CardTitle>
                            <span className="text-lg">{getUrgencyIcon(errand.urgency)}</span>
                            <Badge variant={getUrgencyColor(errand.urgency)} className="text-xs shrink-0">
                              {errand.urgency}
                            </Badge>
                          </div>
                          <CardDescription className="text-slate-600 leading-relaxed break-words">{errand.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3 text-sm">
                          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full">
                            <MapPin className="h-4 w-4 text-slate-500" />
                            <span>{errand.location}</span>
                          </div>
                          {errand.priceOffer > 0 && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                              <NairaIcon className="h-4 w-4 text-green-600" />
                              <span className="font-semibold text-green-700">₦{errand.priceOffer.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full">
                            <Calendar className="h-4 w-4 text-slate-500" />
                            <span>{new Date(errand.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">Posted by: {errand.postedBy.name}</p>
                            <p className="text-xs text-indigo-600">Student looking for help</p>
                          </div>
                        </div>

                        <Button
                          onClick={() => acceptErrand(errand._id)}
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-medium hover:shadow-strong transition-all duration-300"
                          disabled={!profile.isAvailable || acceptingErrand === errand._id}
                        >
                          {acceptingErrand === errand._id ? (
                            <div className="flex items-center gap-2">
                              <LoadingSpinner size="sm" />
                              <span>Accepting...</span>
                            </div>
                          ) : !profile.isAvailable ? (
                            "Set Available to Accept"
                          ) : (
                            "Accept Errand"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Award className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">My Tasks</h2>
              <p className="text-sm text-slate-600">{myTasks.length} total tasks ({activeTasks.length} active)</p>
            </div>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {myTasks.length === 0 ? (
              <Card className="hover-lift">
                <CardContent className="py-12 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">No active tasks</h3>
                  <p className="text-slate-500">Accept errands from the available list to get started!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {[...myTasks]
                  .sort((a, b) => {
                    if (a.status === "accepted" && b.status === "completed") return -1;
                    if (a.status === "completed" && b.status === "accepted") return 1;
                    return 0;
                  })
                  .map((task, index) => (
                    <Card key={task._id} className="hover-lift interactive-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <CardTitle className="text-lg text-slate-900 break-words">{task.title}</CardTitle>
                              <Badge variant={task.status === "completed" ? "success" : "info"} className="flex items-center gap-1 shrink-0">
                                {task.status === "completed" ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                {task.status === "completed" ? "Completed" : "In Progress"}
                              </Badge>
                            </div>
                            <CardDescription className="text-slate-600 leading-relaxed">{task.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-3 text-sm">
                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full">
                              <MapPin className="h-4 w-4 text-slate-500" />
                              <span>{task.location}</span>
                            </div>
                            {task.priceOffer > 0 && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
                                <NairaIcon className="h-4 w-4 text-green-600" />
                                <span className="font-semibold text-green-700">₦{task.priceOffer.toFixed(2)}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">For: {task.postedBy.name}</p>
                              <p className="text-xs text-indigo-600">Student client</p>
                            </div>
                          </div>

                          {task.status === "accepted" && (
                            <Button
                              onClick={() => completeErrand(task._id)}
                              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-medium hover:shadow-strong transition-all duration-300"
                              disabled={completingErrand === task._id}
                            >
                              {completingErrand === task._id ? (
                                <div className="flex items-center gap-2">
                                  <LoadingSpinner size="sm" />
                                  <span>Completing...</span>
                                </div>
                              ) : (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as Complete
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}