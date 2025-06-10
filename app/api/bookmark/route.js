import connectDb from "@/lib/connectDb";

export const POST = async (req) => {
  const id = await req.json();
  try {
    const db = await connectDb();
    const productCollection = await db.collection("bookmarks");
    const existProduct = await productCollection.findOne({ _id: id });
    if (existProduct) {
      return NextResponse.json(
        { message: "Product Already Exist" },
        { status: 304 }
      );
    }
     const response = await userCollection.insertOne({...id})
  } catch (error) {
    console.log(error);
  }
};
