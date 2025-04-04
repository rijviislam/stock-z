import { dbConnect } from "@/lib/connectiondb";
import { NextResponse } from "next/server";

export async function GET() {
  const { db } = await dbConnect();
  const collections = await db.listCollections().toArray(); // Fetch collection names

  console.log("Collections:", collections.map(c => c.name));
  
  return new NextResponse("MongoDB connected and accessible!");
}