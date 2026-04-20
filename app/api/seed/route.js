import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import RunnerProfile from "@/models/RunnerProfile";
import Errand from "@/models/Errand";

export async function POST() {
  try {
    await dbConnect();
    
    // Clear existing data
    await User.deleteMany({});
    await RunnerProfile.deleteMany({});
    await Errand.deleteMany({});
    
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    const user1 = await User.create({
      name: "Udeme Johnson",
      email: "udeme@student.edu",
      password: hashedPassword,
      role: "user",
    });
    
    const runner1 = await User.create({
      name: "Tamar Smith",
      email: "tamar@student.edu",
      password: hashedPassword,
      role: "runner",
    });
    
    const runner2 = await User.create({
      name: "Carol Davis",
      email: "carol@student.edu",
      password: hashedPassword,
      role: "runner",
    });
    
    const runner3 = await User.create({
      name: "David Lee",
      email: "david@student.edu",
      password: hashedPassword,
      role: "runner",
    });
    
    await RunnerProfile.create({
      userId: runner1._id,
      isAvailable: true,
      rating: 4.8,
      completedCount: 23,
      acceptRate: 95,
    });
    
    await RunnerProfile.create({
      userId: runner2._id,
      isAvailable: true,
      rating: 4.9,
      completedCount: 31,
      acceptRate: 98,
    });
    
    await RunnerProfile.create({
      userId: runner3._id,
      isAvailable: false,
      rating: 4.7,
      completedCount: 18,
      acceptRate: 92,
    });
    
    await Errand.create({
      title: "Pick up textbook from library",
      description: "Need someone to grab my reserved textbook from the main library. It's under my name at the front desk.",
      location: "Main Library",
      urgency: "medium",
      priceOffer: 5,
      postedBy: user1._id,
      status: "pending",
    });
    
    await Errand.create({
      title: "Deliver coffee to study room",
      description: "I'm stuck in a group study session. Can someone bring me a large latte from the campus café?",
      location: "Student Center - Room 204",
      urgency: "high",
      priceOffer: 8,
      postedBy: user1._id,
      status: "pending",
    });
    
    await Errand.create({
      title: "Return books to bookstore",
      description: "Have 3 books that need to be returned to the campus bookstore before 5 PM today.",
      location: "Campus Bookstore",
      urgency: "low",
      priceOffer: 10,
      postedBy: user1._id,
      status: "pending",
    });
    
    await Errand.create({
      title: "Print documents at computer lab",
      description: "Need 20 pages printed for tomorrow's presentation. Files are ready to go.",
      location: "Engineering Building - Computer Lab",
      urgency: "medium",
      priceOffer: 7,
      postedBy: user1._id,
      status: "accepted",
      assignedTo: runner1._id,
    });
    
    return NextResponse.json({ 
      message: "Database seeded successfully",
      credentials: {
        user: { email: "udeme@student.edu", password: "password123" },
        runners: [
          { email: "tamar@student.edu", password: "password123" },
          { email: "carol@student.edu", password: "password123" },
          { email: "david@student.edu", password: "password123" },
        ]
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
