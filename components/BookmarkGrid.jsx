"use client";

import { Link } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BookmarkGrid() {
  const { data: session } = useSession();
  const email = session?.user?.email;

  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (email) {
      const fetchBookmarks = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-all-bookmark`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const data = await res.json();
        setBookmarks(data.bookmarks || []);
      };

      fetchBookmarks();
    }
  }, [email]);

  return (
    <div className="flex items-center mt-28 flex-col">
      <h1 className="text-2xl  font-semibold text-gray-700 text-shadow-lg bg-transparent text-center lg:text-center">
        Bookmarks
      </h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks found</p>
      ) : (
        <div className=" w-full flex items-center justify-center flex-wrap gap-5 mt-10">
          {bookmarks.map((item) => (
            <div
              key={item._id}
              className="max-w-[200px] h-[250px] px-2 py-3 bg-[#ecf6ff] shadow-md rounded-2xl group relative"
            >
              <div>
                <Image
                  src={item.image}
                  alt="product image"
                  quality={100}
                  width={200}
                  height={140}
                  className="rounded-xl h-[140px] object-contain transition-transform transform group-hover:scale-110  duration-500"
                />
                <div className="px-3 ">
                  <Link
                    href={`/recommended/${item._id}`}
                    className="text-base font-medium mt-4 hover:text-[#B35929]"
                  >
                    {item.title}
                  </Link>
                  <h3 className="text-[12px] font-normal mt-2">
                    {item.subTitle}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
