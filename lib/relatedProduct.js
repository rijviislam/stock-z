import { ObjectId } from "mongodb";
import clientPromise from "./mongoDb";

export default async function relatedProducts(productBrand, formattedId) {
  try {
    const client = await clientPromise;
    const db = client.db("stock");
    const ProductCollection = db.collection("stockProduct");

    // Convert formattedId to an ObjectId
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
    console.error("Error fetching related products:", error);
    return null;
  }
}
