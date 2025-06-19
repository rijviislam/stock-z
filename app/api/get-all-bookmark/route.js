import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const client = await connectDb();
    const userCollection = client.collection("users");
    const existUser = await userCollection.findOne({ email });

    if (!existUser) {
      return NextResponse.json({ bookmarks: [] }, { status: 404 });
    }

    return NextResponse.json({ bookmarks: existUser.bookMark || [] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
