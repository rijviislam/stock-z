import clientPromise from "@/lib/mongoDb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("stock");
    const userCollection = db.collection("users");

    const { username, email, password, confirmPass } = await request.json();

    if (!username || !email || !password || !confirmPass) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    const exist = await userCollection.findOne({ email });
    if (exist) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    const newUser = { username, email, password, confirmPass };
    const hashedPassword = bcrypt.hashSync(newUser.password, 14);
    const hashedConfirmPassword = bcrypt.hashSync(newUser.confirmPass, 14);

    const res = await userCollection.insertOne({...newUser, password:hashedPassword , confirmPass:hashedConfirmPassword});

    return new Response(JSON.stringify({ message: "User created", data: res }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
