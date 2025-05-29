// import connectDb from "@/lib/connectDb";

// export const getPostApi = async () => {
//   try {
//     const client = await connectDb();
//     const ProductCollection = client.collection("stockProduct");
//     const posts = await ProductCollection.find().toArray();
//     return posts;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// };


const { MongoClient, ServerApiVersion } = require("mongodb");

let db;
const connectDb = async () => {
  if (db) return db;
  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    db = client.db("stock-z");
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to DB");
  }
};

export default connectDb;
