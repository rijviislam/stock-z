"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BrandPage() {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getBrandsProducts?brand=${brand}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [brand]);

  if (loading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 mt-32">
      <h1 className="text-3xl font-bold mb-6">
        {brand?.toUpperCase()}
      </h1>

      {products.length === 0 ? (
        <h2 className="text-lg text-[#000]">No products available right now.</h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              href={`/recommended/${product._id}`}
              key={product._id}
              className="max-w-[200px] h-[250px] px-2 py-3 bg-[#ecf6ff] shadow-md rounded-2xl group transition-transform"
            >
              <div>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={140}
                  quality={100}
                  className="rounded-xl h-[140px] object-contain transition-transform transform group-hover:scale-110 duration-500"
                />
                <div className="px-3">
                  <h1 className="text-base font-medium mt-4">{product.title}</h1>
                  <h3 className="text-[12px] font-normal mt-2">{product.subTitle}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
