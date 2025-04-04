// import clientPromise from "@/lib/connectiondb";

// export default async function recommendedSinglePostDetails(productId) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("stock-z");
//     const ProductCollection = db.collection("stockProduct");

//     // Convert productId to ObjectId
//     console.log("ProductId", productId)
//     const productDetails = await ProductCollection.findOne({
//       _id: productId, 
//     });

//     if (!productDetails) {
//       return null;
//     }

//     return productDetails; 

//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return null;
//   }
// }


import clientPromise from "@/lib/connectiondb";

export  async function recommendedSinglePostDetails(productId) {
  try {
    const client = await clientPromise;
    const db = client.db("stock-z");
    const ProductCollection = db.collection("stockProduct");

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

