import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Errand from "@/models/Errand";
import RunnerProfile from "@/models/RunnerProfile";

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const updates = await req.json();
    
    await dbConnect();
    
    const errand = await Errand.findByIdAndUpdate(id, updates, { returnDocument: 'after' })
      .populate("postedBy", "name email")
      .populate("assignedTo", "name email");
    
    if (updates.status === "completed" && errand.assignedTo) {
      await RunnerProfile.findOneAndUpdate(
        { userId: errand.assignedTo._id },
        { $inc: { completedCount: 1 } },
        { returnDocument: 'after' }
      );
    }
    
    return NextResponse.json(errand);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    
    await dbConnect();
    
    // Find the errand first to check ownership
    const errand = await Errand.findById(id);
    if (!errand) {
      return NextResponse.json({ error: "Errand not found" }, { status: 404 });
    }

    // Check if the user owns this errand
    if (errand.postedBy.toString() !== session.user.id) {
      return NextResponse.json({ error: "You can only delete your own errands" }, { status: 403 });
    }

    // Only allow deletion if errand is still pending
    if (errand.status !== "pending") {
      return NextResponse.json({ error: "Cannot delete errand that has been accepted or completed" }, { status: 400 });
    }

    await Errand.findByIdAndDelete(id);
    
    return NextResponse.json({ message: "Errand deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
