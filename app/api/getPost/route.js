import clientPromise from "@/lib/connectDb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("stock-z");
    const ProductCollection = db.collection("stockProduct");

    const posts = await ProductCollection.find().toArray();

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
