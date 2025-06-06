"use client";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/context/SearchContext";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../../public/assets/logo-new.png";

export default function Navbar() {
  const { searchItem, setSearchItem } = useSearch();
  const [resule, setResult] = useState("");
  const session = useSession();
  console.log("Ses", session);
  useEffect(() => {
    const fetchSearchResult = async () => {
      if (!searchItem) {
        setResult([]);
        return;
      }
      try {
        const res = await fetch(`/api/search?q=${searchItem}`);
        const data = await res.json();
        setResult(data);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
    };

    const timeOut = setTimeout(() => {
      fetchSearchResult();
    }, 500);
    return () => clearTimeout(timeOut);
  }, [searchItem]);

  return (
    <SessionProvider>
      <div className="relative ">
        <div className="flex fixed w-full items-center z-50 bg-[#F3F9FF]  justify-between lg:justify-center gap-5 lg:gap-10 shadow-md py-2 px-5 md:px-0 top-0 ">
          <div>
            <a href="/">
              <Image src={Logo} width={70} height={30} alt="Logo" />
            </a>
          </div>
          <Input
            type="text"
            placeholder="Search for brand, color, etc."
            className="xl:w-[500px] outline-none border-none md:flex hidden"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value.toLowerCase())}
          />

          <ul className="md:flex items-center justify-center gap-5 xl:gap-10  text-[#0D769B] font-medium hidden ">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/all-products">All Products</Link>
            </li>
            <li>
              <Link href="/sell">Sell</Link>
            </li>
          </ul>
          <div className="flex items-center gap-5">
            <div>
              {session?.data ? (
                <button
                  className="bg-red-500 px-3 py-[6px] text-[15px] rounded-lg text-white font-medium cursor-pointer"
                  onClick={() => signOut()}
                >
                  Log out
                </button>
              ) : (
                <button>
                  <Link
                    href="/api/auth/signin"
                    className="bg-[#B35929] px-3 py-2 text-[15px] rounded-lg text-white font-medium cursor-pointer"
                  >
                    Login
                  </Link>
                </button>
              )}
            </div>
            <button>
              <Link
                href="/signup"
                className="bg-[#0D769B] px-3 py-2 text-[15px] rounded-lg text-white font-medium cursor-pointer"
              >
                Sign Up
              </Link>
            </button>
          </div>

          {/* <UserInfoBtn /> */}
        </div>
        {resule.length > 1 && (
          <div className=" bg-[#dfebf7] min-h-full w-full absolute z-40 top-[85px] flex flex-wrap items-center justify-center lg:justify-center lg:items-start lg:gap-10 gap-5 p-10">
            {resule?.map((res) => (
              <div
                key={res._id}
                className="max-w-[200px] h-[250px] px-2 py-3 bg-[#ecf6ff] shadow-md rounded-2xl group relative"
              >
                <div>
                  <Image
                    src={res.image}
                    alt="product image"
                    quality={100}
                    width={200}
                    height={140}
                    className="rounded-xl h-[140px] object-contain transition-transform transform group-hover:scale-110  duration-500"
                  />
                  <div className="px-3 ">
                    <Link
                      href={`/recommended/${res._id}`}
                      className="text-base font-medium mt-4 hover:text-[#B35929]"
                    >
                      {res.title}
                    </Link>
                    <h3 className="text-[12px] font-normal mt-2">
                      {res.subTitle}
                    </h3>
                  </div>
                  <button className="absolute bottom-3 right-3 cursor-default z-40 ">
                    <svg
                      fill="#000000"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                    >
                      <path d="M20.5,4.609A5.811,5.811,0,0,0,16,2.5a5.75,5.75,0,0,0-4,1.455A5.75,5.75,0,0,0,8,2.5,5.811,5.811,0,0,0,3.5,4.609c-.953,1.156-1.95,3.249-1.289,6.66,1.055,5.447,8.966,9.917,9.3,10.1a1,1,0,0,0,.974,0c.336-.187,8.247-4.657,9.3-10.1C22.45,7.858,21.453,5.765,20.5,4.609Zm-.674,6.28C19.08,14.74,13.658,18.322,12,19.34c-2.336-1.41-7.142-4.95-7.821-8.451-.513-2.646.189-4.183.869-5.007A3.819,3.819,0,0,1,8,4.5a3.493,3.493,0,0,1,3.115,1.469,1.005,1.005,0,0,0,1.76.011A3.489,3.489,0,0,1,16,4.5a3.819,3.819,0,0,1,2.959,1.382C19.637,6.706,20.339,8.243,19.826,10.889Z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SessionProvider>
  );
}
