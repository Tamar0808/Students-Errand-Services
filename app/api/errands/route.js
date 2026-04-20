import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Errand from "@/models/Errand";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const userId = searchParams.get("userId");
    const assignedTo = searchParams.get("assignedTo");
    
    let query = {};
    if (status) query.status = status;
    if (userId) query.postedBy = userId;
    if (assignedTo) query.assignedTo = assignedTo;
    
    const errands = await Errand.find(query)
      .populate("postedBy", "name email")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });
    
    return NextResponse.json(errands);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, location, urgency, priceOffer } = await req.json();
    
    await dbConnect();
    
    const errand = await Errand.create({
      title,
      description,
      location,
      urgency,
      priceOffer,
      postedBy: session.user.id,
    });
    
    return NextResponse.json(errand, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
