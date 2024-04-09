import connect from "@/dbconfig/db";

import User from "@/models/Userdata";
import { NextRequest, NextResponse } from "next/server";


// Connect to the database

connect();
export async function POST(request) {
  try {
    const requestBody = await request.text();
    const { name, email,PhoneNumber, Hobbies } = JSON.parse(requestBody);

    // Validate the request body
    if (!name|| !email || !PhoneNumber || !Hobbies) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      PhoneNumber,
      Hobbies
    });

    await newUser.save();
    return NextResponse.json({ message: "User created" }, { status: 201 });
   
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}



