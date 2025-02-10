"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";
const getRecentProductFromLocalStroage = () => {
  if (typeof window !== undefined) {
    const data = localStorage.getItem("recentlyViewed");
    return data ? JSON.parse(data) : [];
  }
  return [];
};
export default function RecentlyViewed({ recentlyViewed }) {
  const recentProduct = recentlyViewed;

  useEffect(() => {
    if (recentProduct) {
      // Get existing data from localStorage
      let storedProducts =
        JSON.parse(localStorage.getItem("recentlyViewed")) || [];

      // Remove duplicate entries
      storedProducts = storedProducts.filter(
        (item) => item._id !== recentProduct._id
      );

      // Add the new product at the beginning
      storedProducts.unshift(recentProduct);

      // Save updated list in localStorage
      localStorage.setItem("recentlyViewed", JSON.stringify(storedProducts));
    }
  }, []);

  const { data: recentDatat, mutate } = useSWR(
    "recentlyViewed",
    getRecentProductFromLocalStroage,
    { fallbackData: [] }
  );
  if (recentDatat.length == 0) {
    return;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-[1200px] mb-10">
        <h1 className="text-2xl  font-semibold text-gray-700 text-shadow-lg bg-transparent">
          Recently Viewed
        </h1>
        <div className="mt-5 flex flex-wrap items-start lg:gap-10 ">
          {recentDatat.length > 0 ? (
            recentDatat?.map((d) => (
              <Link
                href={`/recommended/${d._id}`}
                key={d._id}
                className="max-w-[200px] h-[250px] px-2 py-3 bg-[#ecf6ff] shadow-md rounded-2xl group"
              >
                <div>
                  <Image
                    src={d.image}
                    alt="product image"
                    quality={100}
                    width={200}
                    height={140}
                    className="rounded-xl h-[140px] object-contain transition-transform transform group-hover:scale-150  duration-500"
                  />

                  <div className="px-3">
                    <h1 className="text-base font-medium mt-4">{d.title}</h1>
                    <h3 className="text-[12px] font-normal mt-2">
                      {d.subTitle}
                    </h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No recently viewed products.</p>
          )}
        </div>
      </div>
    </div>
  );
}
