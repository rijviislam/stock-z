import clientPromise from "./mongoDb";

export default async function relatedProducts(productBrand) {
  try {
    const client = await clientPromise;
    const db = client.db("stock");
    const ProductCollection = db.collection("stockProduct");

    // Find all products that match the given brand
    const productDetails = await ProductCollection.find({ brand: productBrand }).toArray();

    if (!productDetails.length) {
      return null;
    }

    return productDetails; 

  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
