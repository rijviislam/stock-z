import connectDb from "@/lib/connectDb";

export const getPostApi = async () => {
  try {
    const client = await connectDb();
    const ProductCollection = client.collection("stockProduct");
    const posts = await ProductCollection.find().toArray();
    return posts;
  } catch (error) {
    // console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
