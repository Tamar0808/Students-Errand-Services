"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, User, CheckCircle, AlertTriangle } from "lucide-react";
import { NairaIcon } from "@/components/ui/naira-icon";

export default function RunnerTasksPage() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchTasks();
    }
  }, [session]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`/api/errands?assignedTo=${session.user.id}`);
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (taskId) => {
    const loadingToast = toast.loading("Marking task as complete...");
    
    try {
      const res = await fetch(`/api/errands/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });
      
      if (res.ok) {
        fetchTasks();
        toast.success("Task completed successfully! 🎉", {
          description: "Great job! Your earnings have been updated.",
          duration: 5000,
        });
      } else {
        toast.error("Failed to complete task", {
          description: "Please try again or contact support.",
        });
      }
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Something went wrong", {
        description: "Please check your connection and try again.",
      });
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const rejectTask = async (taskId, taskTitle) => {
    toast.custom((t) => (
      <div className="bg-white border border-slate-200 rounded-xl shadow-strong p-6 max-w-md">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">
              Reject Task?
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Are you sure you want to reject "{taskTitle}"? This will return it to the pending list.
            </p>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={async () => {
                  toast.dismiss(t);
                  const loadingToast = toast.loading("Rejecting task...");
                  
                  try {
                    const res = await fetch(`/api/errands/${taskId}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ 
                        status: "pending",
                        assignedTo: null,
                      }),
                    });
                    
                    if (res.ok) {
                      fetchTasks();
                      toast.success("Task rejected", {
                        description: "The task has been returned to the pending list.",
                      });
                    } else {
                      toast.error("Failed to reject task");
                    }
                  } catch (error) {
                    toast.error("Something went wrong");
                  } finally {
                    toast.dismiss(loadingToast);
                  }
                }}
              >
                Yes, Reject
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.dismiss(t)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    ), {
      duration: Infinity,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "success";
      case "accepted": return "info";
      default: return "secondary";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold gradient-text">My Tasks</h1>
          <p className="text-slate-600 mt-1">Manage your accepted and completed errands</p>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const activeTasks = tasks.filter(task => task.status === "accepted");
  const completedTasks = tasks.filter(task => task.status === "completed");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">My Tasks</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Manage your accepted and completed errands with ease
        </p>
      </div>

      {/* Active Tasks - Show First */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Active Tasks ({activeTasks.length})</h2>
          {activeTasks.length > 0 && (
            <Badge variant="info" className="px-3 py-1">
              {activeTasks.length} in progress
            </Badge>
          )}
        </div>
        
        {activeTasks.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="py-16 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">No active tasks</h3>
                  <p className="text-slate-500 mt-1">
                    Check the errand feed to find new opportunities!
                  </p>
                </div>
                <Button asChild>
                  <a href="/runner/feed">Browse Errands</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {activeTasks.map((task, index) => (
              <Card 
                key={task._id} 
                className="border-l-4 border-l-blue-500 shadow-soft hover:shadow-medium transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl font-semibold">{task.title}</CardTitle>
                      <CardDescription className="text-slate-600">{task.description}</CardDescription>
                    </div>
                    <Badge variant={getStatusColor(task.status)} className="font-medium">
                      In Progress
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{task.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>For {task.postedBy.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Accepted {formatDate(task.createdAt)}</span>
                    </div>
                    {task.priceOffer > 0 && (
                      <div className="flex items-center gap-2">
                        <NairaIcon className="h-4 w-4" />
                        <span className="font-semibold text-green-600">
                          ₦{task.priceOffer.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center">
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">Contact:</span> {task.postedBy.email}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => rejectTask(task._id, task.title)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Reject Task
                      </Button>
                      <Button 
                        onClick={() => completeTask(task._id)}
                        className="flex items-center gap-2 shadow-soft hover:shadow-medium transition-all duration-200"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Completed Tasks - Show Second */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Completed Tasks ({completedTasks.length})</h2>
          {completedTasks.length > 0 && (
            <Badge variant="success" className="px-3 py-1">
              {completedTasks.length} completed
            </Badge>
          )}
        </div>
        
        {completedTasks.length === 0 ? (
          <Card className="shadow-soft">
            <CardContent className="py-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">No completed tasks yet</h3>
                  <p className="text-slate-500 mt-1">Complete your first task to see it here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {completedTasks.map((task, index) => (
              <Card 
                key={task._id} 
                className="border-l-4 border-l-green-500 opacity-80 hover:opacity-100 shadow-soft hover:shadow-medium transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
                      <CardDescription className="text-sm text-slate-600">{task.description}</CardDescription>
                    </div>
                    <Badge variant="success" className="font-medium">
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{task.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>For {task.postedBy.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Completed {formatDate(task.updatedAt || task.createdAt)}</span>
                    </div>
                    {task.priceOffer > 0 && (
                      <div className="flex items-center gap-2">
                        <NairaIcon className="h-4 w-4" />
                        <span className="font-semibold text-green-600">
                          ₦{task.priceOffer.toFixed(2)} earned
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}