import connectDb from "@/lib/connectDb";
import { ObjectId } from "mongodb";

export const relatedProducts = async (productBrand, formattedId) => {
  try {
    const client = await connectDb();
    const ProductCollection = client.collection("stockProduct");
     // Convert formattedId to an ObjectIdgi
    const excludeId = new ObjectId(formattedId);

    // Find all products that match the brand but exclude the given _id
    const productDetails = await ProductCollection
      .find({ brand: productBrand, _id: { $ne: excludeId } })
      .toArray();

    if (!productDetails.length) {
      return null;
    }

    return productDetails;
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




