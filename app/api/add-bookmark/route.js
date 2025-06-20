import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { email, product } = await req.json();

  if (!email || !product || !product._id) {
    return NextResponse.json({ message: "Email and valid Product required" }, { status: 400 });
  }

  try {
    const db = await connectDb();
    const userCollection = db.collection("users");

    // ইউজার বের কর
    const existUser = await userCollection.findOne({ email });

    if (!existUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if product._id is already bookmarked
    const alreadyBookmarked = existUser.bookMark?.some(
      (p) => p._id === product._id
    );

    if (alreadyBookmarked) {
      return NextResponse.json({ message: "Product already bookmarked" }, { status: 200 });
    }

    // Push the full product
    await userCollection.updateOne(
      { email },
      { $push: { bookMark: product } }
    );

    return NextResponse.json({ message: "Product bookmarked successfully" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
