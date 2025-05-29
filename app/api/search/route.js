import clientPromise from "@/lib/connectDb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("stock-z");
    const ProductCollection = db.collection("stockProduct");

    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("q"); // Example: /api/products?q=iphone

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
