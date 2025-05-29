import connectDb from "@/lib/connectDb";

export const recommendedSinglePostDetails = async (productId) => {
  try {
    const client = await connectDb();
    const ProductCollection = client.collection("stockProduct");
    // Convert productId to ObjectId
    console.log("ProductId", productId);
    const productDetails = await ProductCollection.findOne({
      _id: productId,
    });
    if (!productDetails) {
      return null;
    }
    return productDetails;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
