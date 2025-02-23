import clientPromise from "./mongoDb";

export default async function recommendedSinglePostDetails(productId) {
  try {
    const client = await clientPromise;
    const db = client.db("stock-z");
    const ProductCollection = db.collection("products");

    // Convert productId to ObjectId
    console.log("ProductId", productId)
    const productDetails = await ProductCollection.findOne({
      _id: productId, 
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


// import { ObjectId } from "mongodb";
// import clientPromise from "./mongoDb";

// export default async function recommendedSinglePostDetails(productId) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("stock");
//     const ProductCollection = db.collection("products");

//     // Validate ObjectId
//     if (!ObjectId.isValid(productId)) {
//       console.error(" Invalid ObjectId format:", productId);
//       return null;
//     }

//     const productDetails = await ProductCollection.findOne({
//       _id: new ObjectId(productId),
//     });

//     if (!productDetails) {
//       console.error(" Product not found for ID:", productId);
//       return null;
//     }

//     return productDetails;

//   } catch (error) {
//     console.error(" Error fetching product:", error);
//     return null;
//   }
// }
