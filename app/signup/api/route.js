import connectDb from "@/lib/connectDb";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  const newUser = await req.json();

  try {
    const db = await connectDb();
    const userCollection = await db.collection("users");
    const existUser = await userCollection.findOne({ email: newUser.email });
    if (existUser) {
      return Response.json({ message: "User Already Exist" }, { status: 304 });
    }
    const hashPass = bcrypt.hashSync(newUser.password, 14)
    const confHashPass = bcrypt.hashSync(newUser.confirmPass, 14)

    const response = await userCollection.insertOne({...newUser, password:hashPass, confirmPass:confHashPass});
    return Response.json({ message: "New User created" });
  } catch (error) {
    return Response.json({ message: "Something went Wrong" }, { status: 500 });
  }
};
