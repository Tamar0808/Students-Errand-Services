"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, CheckCircle, TrendingUp, Clock, User } from "lucide-react";

export default function RunnerProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`/api/runners/${session.user.id}`);
      const data = await res.json();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async () => {
    if (!profile) return;
    
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
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Runner Profile</h1>
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Runner Profile</h1>
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-slate-500">Profile not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Runner Profile</h1>
        <p className="text-slate-600 mt-1">Manage your runner profile and availability</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {getInitials(profile.userId.name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <CardTitle className="text-2xl">{profile.userId.name}</CardTitle>
              <CardDescription className="text-base">{profile.userId.email}</CardDescription>
              <Badge 
                variant={profile.isAvailable ? "success" : "secondary"}
                className="text-sm"
              >
                {profile.isAvailable ? "Available for Errands" : "Currently Unavailable"}
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-2xl font-bold">{profile.rating.toFixed(1)}</span>
              <span className="text-slate-500">/ 5.0</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Completed Errands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-2xl font-bold">{profile.completedCount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Accept Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <span className="text-2xl font-bold">{profile.acceptRate}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Member Since</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-slate-500" />
              <span className="text-lg font-semibold">
                {new Date(profile.userId.createdAt || Date.now()).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric"
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Availability Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Availability Settings</CardTitle>
          <CardDescription>
            Control when you appear in the runner listings and can accept new errands
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="availability" className="text-base font-medium">
                Available for Errands
              </Label>
              <p className="text-sm text-slate-600">
                When enabled, you'll appear in runner listings and can accept new errands
              </p>
            </div>
            <Switch
              id="availability"
              checked={profile.isAvailable}
              onCheckedChange={toggleAvailability}
            />
          </div>
          
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${profile.isAvailable ? 'bg-green-500' : 'bg-slate-400'}`} />
              <span className="text-sm font-medium">
                Status: {profile.isAvailable ? "Available" : "Unavailable"}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              {profile.isAvailable 
                ? "You're currently visible to users looking for runners"
                : "You're currently hidden from runner listings"
              }
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Your runner statistics and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600">Total Errands Completed</span>
              <span className="font-semibold">{profile.completedCount}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600">Average Rating</span>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">{profile.rating.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-600">Accept Rate</span>
              <span className="font-semibold">{profile.acceptRate}%</span>
            </div>
            
            {profile.completedCount >= 10 && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">Experienced Runner</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  You've completed {profile.completedCount} errands! Keep up the great work.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}