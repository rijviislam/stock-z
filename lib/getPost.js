// import clientPromise from "@/lib/connectiondb";

// export default async function getPost() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("stock-z"); 
//     const ProductCollection = db.collection("products"); 

//     const posts = await ProductCollection.find().toArray();

//     return JSON.parse(JSON.stringify(posts)); 
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return [];
//   }
// }

// app/api/getPost/route.js

import { dbConnect } from "@/lib/connectiondb";

export async function GET() {
  try {
    const client = await dbConnect();
    const db = client.db("stock-z");
    const ProductCollection = db.collection("stockProduct");

    // Get all products (you can modify this query as needed)
    const products = await ProductCollection.find().toArray();
    
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response("Error fetching products", {
      status: 500
    });
  }
}
