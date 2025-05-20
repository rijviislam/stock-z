"use client";
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { searchTerm } = useSearch();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/search-item");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  console.log(products, "Pro");
  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    const filteredProducts = products.filter((product) =>
      [
        product.title,
        product.subTitle,
        product.description,
        product.color,
        product.brand,
        product.models,
      ].some((field) => field?.toLowerCase().includes(lower))
    );
    setFiltered(filteredProducts);
  }, [searchTerm, products]);

  return (
    <div className="mt-24 p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-2"
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>{product.subTitle}</p>
            <p>{product.description}</p>
            <p className="text-sm text-gray-500">Color: {product.color}</p>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500">Model: {product.models}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
          </div>
        ))}
        {filtered.length === 0 && <p>No products match your search.</p>}
      </div>
    </div>
  );
}
