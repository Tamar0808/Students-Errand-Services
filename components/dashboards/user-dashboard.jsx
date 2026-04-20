"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MapPin, Clock, Sparkles, TrendingUp, CheckCircle, AlertCircle, User, Calendar, Trash2 } from "lucide-react";
import { NairaIcon } from "@/components/ui/naira-icon";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";
import AnimatedCard from "@/components/ui/animated-card";
import SimpleCountUp from "@/components/ui/simple-count-up";

export default function UserDashboard() {
    const { data: session } = useSession();
    const [errands, setErrands] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        urgency: "medium",
        priceOffer: "",
    });

    // Animation hook for staggered errands
    const errandsContainerRef = useStaggerAnimation([errands], 0.2);

    useEffect(() => {
        fetchErrands();
    }, [session]);

    const fetchErrands = async () => {
        if (!session?.user?.id) return;

        const res = await fetch(`/api/errands?userId=${session.user.id}`);
        const data = await res.json();
        setErrands(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/errands", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    priceOffer: parseFloat(formData.priceOffer) || 0,
                }),
            });

            if (res.ok) {
                setFormData({
                    title: "",
                    description: "",
                    location: "",
                    urgency: "medium",
                    priceOffer: "",
                });
                setShowForm(false);
                fetchErrands();
            }
        } catch (error) {
            console.error("Error creating errand:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteErrand = async (errandId) => {
        toast("Are you sure you want to delete this errand?", {
            description: "This action cannot be undone.",
            action: {
                label: "Delete",
                onClick: async () => {
                    try {
                        const res = await fetch(`/api/errands/${errandId}`, {
                            method: "DELETE",
                        });

                        if (res.ok) {
                            toast.success("Errand deleted successfully");
                            fetchErrands();
                        } else {
                            const error = await res.json();
                            toast.error(error.error || "Failed to delete errand");
                        }
                    } catch (error) {
                        console.error("Error deleting errand:", error);
                        toast.error("An error occurred while deleting the errand");
                    }
                }
            },
            cancel: {
                label: "Cancel",
                onClick: () => {
                    // Do nothing, just dismiss the toast
                }
            }
        });
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case "high": return "destructive";
            case "medium": return "warning";
            case "low": return "info";
            default: return "secondary";
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed": return "success";
            case "accepted": return "info";
            case "pending": return "secondary";
            default: return "secondary";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed": return <CheckCircle className="h-4 w-4" />;
            case "accepted": return <Clock className="h-4 w-4" />;
            case "pending": return <AlertCircle className="h-4 w-4" />;
            default: return <AlertCircle className="h-4 w-4" />;
        }
    };

    const stats = {
        total: errands.length,
        pending: errands.filter(e => e.status === 'pending').length,
        accepted: errands.filter(e => e.status === 'accepted').length,
        completed: errands.filter(e => e.status === 'completed').length,
        totalSpent: errands.filter(e => e.status === 'completed').reduce((sum, e) => sum + (e.priceOffer || 0), 0)
    };

    return (
        <div className="space-y-8 animate-fade-in min-w-0 overflow-x-hidden">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-primary-solid">My Errands</h1>
                            <p className="text-slate-600">Manage and track your posted errands</p>
                        </div>
                    </div>
                </div>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    size="lg"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-medium hover:shadow-strong transition-all duration-300 group"
                >
                    <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    Post New Errand
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 min-w-0">
                <Card className="hover-lift border-2 border-transparent hover:border-indigo-200">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">
                                    <SimpleCountUp end={stats.total} duration={2} />
                                </div>
                                <div className="text-xs text-slate-600">Total Errands</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover-lift border-2 border-transparent hover:border-amber-200">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center">
                                <Clock className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">
                                    <SimpleCountUp end={stats.pending} duration={1.8} />
                                </div>
                                <div className="text-xs text-slate-600">Pending</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover-lift border-2 border-transparent hover:border-blue-200">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">
                                    <SimpleCountUp end={stats.accepted} duration={2.2} />
                                </div>
                                <div className="text-xs text-slate-600">In Progress</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover-lift border-2 border-transparent hover:border-green-200">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">
                                    <SimpleCountUp end={stats.completed} duration={2.5} />
                                </div>
                                <div className="text-xs text-slate-600">Completed</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover-lift border-2 border-transparent hover:border-emerald-200">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                                <NairaIcon className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-slate-900">
                                    ₦<SimpleCountUp end={Math.round(stats.totalSpent)} duration={3} />
                                </div>
                                <div className="text-xs text-slate-600">Total Spent</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {showForm && (
                <Card className="glass border-2 border-indigo-200 animate-scale-in">
                    <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <Plus className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl text-primary-solid">Post a New Errand</CardTitle>
                                <CardDescription className="text-base">Fill in the details for your errand and connect with student runners</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-semibold text-slate-700">Errand Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Pick up textbook from library"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    className="border-2 border-slate-200 focus:border-indigo-400 transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-semibold text-slate-700">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Provide detailed information about what needs to be done..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={4}
                                    className="border-2 border-slate-200 focus:border-indigo-400 transition-colors resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-sm font-semibold text-slate-700">Location</Label>
                                    <Input
                                        id="location"
                                        placeholder="e.g., Main Library, Faculty of Engineering, Ebitimi Banigo Hall"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        required
                                        className="border-2 border-slate-200 focus:border-indigo-400 transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="priceOffer" className="text-sm font-semibold text-slate-700">Price Offer (₦)</Label>
                                    <Input
                                        id="priceOffer"
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={formData.priceOffer}
                                        onChange={(e) => setFormData({ ...formData, priceOffer: e.target.value })}
                                        className="border-2 border-slate-200 focus:border-indigo-400 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="urgency" className="text-sm font-semibold text-slate-700">Urgency Level</Label>
                                <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                                    <SelectTrigger className="border-2 border-slate-200 focus:border-indigo-400">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">🟢 Low - Can wait a few days</SelectItem>
                                        <SelectItem value="medium">🟡 Medium - Need it soon</SelectItem>
                                        <SelectItem value="high">🔴 High - Urgent, need ASAP</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-medium hover:shadow-strong transition-all duration-300"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <LoadingSpinner size="sm" />
                                            <span>Posting...</span>
                                        </div>
                                    ) : (
                                        "Post Errand"
                                    )}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowForm(false)}
                                    className="border-2 border-slate-200 hover:border-slate-300"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-indigo-600" />
                    Your Errands
                </h2>

                {errands.length === 0 ? (
                    <Card className="hover-lift">
                        <CardContent className="py-16 text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="h-10 w-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">No errands yet</h3>
                            <p className="text-slate-500 mb-6">Create your first errand to get started with our community!</p>
                            <Button
                                onClick={() => setShowForm(true)}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Post Your First Errand
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div ref={errandsContainerRef} className="grid gap-4">
                        {errands
                            .sort((a, b) => {
                                // Sort by status: pending first, then accepted, then completed
                                const statusOrder = { pending: 0, accepted: 1, completed: 2 };
                                if (statusOrder[a.status] !== statusOrder[b.status]) {
                                    return statusOrder[a.status] - statusOrder[b.status];
                                }
                                // Within same status, sort by creation date (newest first)
                                return new Date(b.createdAt) - new Date(a.createdAt);
                            })
                            .map((errand, index) => (
                                <Card key={errand._id} className="hover-lift interactive-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="space-y-2 flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <CardTitle className="text-xl text-slate-900 break-words">{errand.title}</CardTitle>
                                                    <Badge variant={getStatusColor(errand.status)} className="flex items-center gap-1 shrink-0">
                                                        {getStatusIcon(errand.status)}
                                                        {errand.status.charAt(0).toUpperCase() + errand.status.slice(1)}
                                                    </Badge>
                                                </div>
                                                <CardDescription className="text-slate-600 leading-relaxed break-words">{errand.description}</CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {errand.status === "pending" && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => deleteErrand(errand._id)}
                                                        className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4 min-w-0">
                                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full">
                                                <MapPin className="h-4 w-4 text-slate-500" />
                                                <span>{errand.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full">
                                                <Clock className="h-4 w-4 text-slate-500" />
                                                <Badge variant={getUrgencyColor(errand.urgency)} className="text-xs">
                                                    {errand.urgency} priority
                                                </Badge>
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
                                        {errand.assignedTo && (
                                            <div className="mt-4 pt-4 border-t border-slate-200">
                                                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                                                        <User className="h-4 w-4 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-900">
                                                            Assigned to: {errand.assignedTo.name}
                                                        </p>
                                                        <p className="text-xs text-indigo-600">Runner is working on your errand</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
