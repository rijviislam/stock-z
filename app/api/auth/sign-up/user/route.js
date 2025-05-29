import connectDb from "@/lib/connectDb";

export const POST = async (req) => {
  try {
    const db = await connectDb();
    const userCollection = await db.collection("users");
    const newUser = await req.json();
    const response = await userCollection.insertOne(newUser);
    return Response.json({ message: "New User created" });
  } catch (error) {
    return Response.json({ message: "Something went Wrong" });
  }
};
