import clientPromise from "./mongoDb";

export default async function getPost() {
  try {
    const client = await clientPromise;
    const db = client.db("stock"); 
    const ProductCollection = db.collection("stockProduct"); 

    const posts = await ProductCollection.find().toArray();

    return JSON.parse(JSON.stringify(posts)); 
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
