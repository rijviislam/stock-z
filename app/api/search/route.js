import connectDb from "@/lib/connectDb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const db = await connectDb();
    // const db = await client.db("stock-z");
    const ProductCollection = db.collection("stockProduct");

    // Extract query parameters from the request URL
    const searchParams = req.nextUrl.searchParams;
    const searchQuery = searchParams.get("q"); // Example: /api/products?q=iphone

    console.log("Search query:", searchQuery);

    let query = {};

    if (searchQuery) {
      query = {
        $or: [
          { brand: { $regex: searchQuery, $options: "i" } },
          { color: { $regex: searchQuery, $options: "i" } },
          { title: { $regex: searchQuery, $options: "i" } },
          { model: { $regex: searchQuery, $options: "i" } },
          { for: { $regex: searchQuery, $options: "i" } },
        ],
      };
    }

    const posts = await ProductCollection.find(query).toArray();

    return new NextResponse(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
