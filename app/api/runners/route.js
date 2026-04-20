import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import RunnerProfile from "@/models/RunnerProfile";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    
    const runners = await RunnerProfile.find()
      .populate("userId", "name email");
    
    return NextResponse.json(runners);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
