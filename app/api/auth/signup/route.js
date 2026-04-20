import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import RunnerProfile from "@/models/RunnerProfile";

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();
    
    await dbConnect();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    
    if (role === "runner") {
      await RunnerProfile.create({
        userId: user._id,
        isAvailable: true,
        rating: 5.0,
        completedCount: 0,
        acceptRate: 100,
      });
    }
    
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
