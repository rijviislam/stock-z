import clientPromise from "@/lib/connectiondb";
import bcrypt from "bcryptjs";

const setCorsHeaders = (headers = {}) => ({
  "Access-Control-Allow-Origin": "http://localhost:3000", 
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  ...headers,
});

// Handle preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: setCorsHeaders(),
  });
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("stock-z");
    const userCollection = db.collection("users");

    const { username, email, password, confirmPass } = await request.json();

    if (!username || !email || !password || !confirmPass) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        {
          status: 400,
          headers: setCorsHeaders(),
        }
      );
    }

    const exist = await userCollection.findOne({ email });
    if (exist) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        {
          status: 400,
          headers: setCorsHeaders(),
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPass, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      confirmPass: hashedConfirmPassword,
    };

    const res = await userCollection.insertOne(newUser);

    return new Response(
      JSON.stringify({ message: "User registered successfully", data: res }),
      {
        status: 201,
        headers: setCorsHeaders(),
      }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return new Response(
      JSON.stringify({ message: "Error registering user", error: error.message }),
      {
        status: 500,
        headers: setCorsHeaders(),
      }
    );
  }
}

