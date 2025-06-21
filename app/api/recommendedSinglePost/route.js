import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";

export const recommendedSinglePostDetails = async (productId) => {
  try {
    const client = await connectDb();
    const ProductCollection = client.collection("stockProduct");
    // Convert productId to ObjectId
    const productDetails = await ProductCollection.findOne({
      _id: productId,
    });
    if (!productDetails) {
      return null;
    }
    return productDetails;
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
