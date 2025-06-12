// app/api/bookmark/route.js
import connectDb from "@/lib/connectDb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { productId, userEmail } = await request.json();
    console.log("PU", productId, userEmail);
    const db = await connectDb();
    const userCollection = db.collection("users");
    const productCollection = db.collection("stockProducts");

    const user = await userCollection.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const product = await productCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const isBookmarked = user.bookmark?.some(
      (item) => item._id.toString() === productId
    );

    if (isBookmarked) {
      return NextResponse.json(
        { message: "Already bookmarked" },
        { status: 200 }
      );
    }

    await userCollection.updateOne(
      { email: userEmail },
      { $push: { bookmark: product } }
    );

    return NextResponse.json(
      { message: "Bookmarked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Bookmark Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
