import clientPromise from "@/lib/connectiondb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("stock-z");
    const userCollection = db.collection("users");

    const { username, email, password, confirmPass } = await request.json();

    // Check if user already exists
    if (!username || !email || !password || !confirmPass) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const exist = await userCollection.findOne({ email });
    if (exist) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    const newUser = { username, email, password, confirmPass };
    const hashedPassword = bcrypt.hashSync(newUser.password, 14);
    const hashedConfirmPassword = bcrypt.hashSync(newUser.confirmPass, 14);

    const res = await userCollection.insertOne({
      ...newUser,
      password: hashedPassword,
      confirmPass: hashedConfirmPassword,
    });

    return new Response(
      JSON.stringify({ message: "User registered successfully", data: res }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "Error registering user", error },
      { status: 500 }
    );
  }
}
