// import { MongoClient } from "mongodb";
// console.log("MONGO_URI:", process.env.MONGO_URI); 
// const client = new MongoClient(process.env.MONGO_URI); // Ensure MONGO_URI is set in .env.local
// let clientPromise;

// if (process.env.NODE_ENV === "development") {
//   // In development, use a global variable to prevent creating a new connection each time
//   if (global._mongoClientPromise) {
//     clientPromise = global._mongoClientPromise;
//   } else {
//     global._mongoClientPromise = client.connect();
//     clientPromise = global._mongoClientPromise;
//   }
// } else {
//   // In production, it's okay to create a new connection for each request
//   clientPromise = client.connect();
// }

// export default clientPromise;


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
    db =  client.db("stock-z");
    return db;
  } catch (error) {
    console.log(error, "Error message");
  }
};
export default connectDb;
