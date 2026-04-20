"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, User } from "lucide-react";
import { NairaIcon } from "@/components/ui/naira-icon";

export default function RunnerFeedPage() {
  const { data: session } = useSession();
  const [errands, setErrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchErrands();
  }, []);

  const fetchErrands = async () => {
    try {
      const res = await fetch("/api/errands?status=pending");
      const data = await res.json();
      setErrands(data);
    } catch (error) {
      console.error("Error fetching errands:", error);
    } finally {
      setLoading(false);
    }
  };

  const acceptErrand = async (errandId) => {
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
        fetchErrands();
      }
    } catch (error) {
      console.error("Error accepting errand:", error);
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

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just posted";
    if (diffInHours === 1) return "1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    return `${diffInDays} days ago`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Errand Feed</h1>
        <div className="text-center">Loading errands...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Errand Feed</h1>
        <p className="text-slate-600 mt-1">Browse and accept available errands</p>
      </div>

      <div className="grid gap-4">
        {errands.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-slate-500">No available errands at the moment</p>
              <p className="text-sm text-slate-400 mt-2">Check back later for new opportunities!</p>
            </CardContent>
          </Card>
        ) : (
          errands.map((errand) => (
            <Card key={errand._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{errand.title}</CardTitle>
                      <Badge variant={getUrgencyColor(errand.urgency)}>
                        {errand.urgency.toUpperCase()}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {errand.description}
                    </CardDescription>
                  </div>
                  {errand.priceOffer > 0 && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${errand.priceOffer.toFixed(2)}
                      </div>
                      <div className="text-sm text-slate-500">offered</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">{errand.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Posted by {errand.postedBy.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeAgo(errand.createdAt)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {errand.urgency} priority
                    </Badge>
                  </div>
                  <Button 
                    onClick={() => acceptErrand(errand._id)}
                    size="lg"
                  >
                    Accept Errand
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}