import { ObjectId } from "mongodb";
import clientPromise from "./mongoDb";

export default async function recommendedSinglePostDetails(productId) {
  try {
    const client = await clientPromise;
    const db = client.db("stock");
    const ProductCollection = db.collection("stockProduct");

    // Convert productId to ObjectId
    const productDetails = await ProductCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!productDetails) {
      return null;
    }

    return productDetails; 

  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
