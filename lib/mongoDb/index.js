import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;


// import { MongoClient } from 'mongodb';

// const uri = process.env.MONGODB_URI;
// const options = {};

// let client;
// let clientPromise;

// if (!uri) {
//   throw new Error("Please add your MongoDB URI to .env");
// }

// if (process.env.NODE_ENV === 'development') {
//   // ডেভেলপমেন্ট মোডে ক্লায়েন্ট কানেকশন ক্যাশ করুন
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   // প্রডাকশন মোডে নতুন ক্লায়েন্ট তৈরি করুন
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect();
// }

// export default clientPromise;