import connectDb from "@/lib/connectDb";

export async function GET(request) {
  try {
    const client = await connectDb();
    const ProductCollection = client.collection("stockProduct");

    // Get the 'brand' from query string
    const { searchParams } = new URL(request.url);
    // console.log("SEARCH",searchParams)
    const brand = searchParams.get('brand');

    if (!brand) {
      return Response.json({ error: "Brand is required" }, { status: 400 });
    }

    const products = await ProductCollection.find({ brand }).toArray();

    return Response.json(products);
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

