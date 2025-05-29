import Brands1 from "@/public/assets/brand1.webp";
import Brands2 from "@/public/assets/brand2.webp";
import Brands3 from "@/public/assets/brand3.webp";
import Brands4 from "@/public/assets/brand4.webp";
import Brands5 from "@/public/assets/brand5.webp";

import Image from "next/image";
import Link from "next/link";

export default function Brands() {
  const nike = "Nike";
  const adidas = "adidas";
  const corcs = "corcs";
  const newbalance = "newbalance";
  const asics = "asics";

  return (
    <div className=" flex items-center justify-center ">
      <div className="max-w-[1200px] my-10">
        <h1 className="text-2xl font-semibold text-gray-700 text-shadow-lg bg-transparent lg:text-center text-center">
          Browse More Brands
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
          <Link href={`/brands/${nike}`}>
            <Image
              src={Brands5}
              alt="Brand Product"
              className="rounded-lg shadow-md w-[220px]"
            />
          </Link>
          <Link href={`/brands/${adidas}`}>
            <Image
              src={Brands1}
              alt="Brand Product"
              className="rounded-lg shadow-md w-[220px]"
            />
          </Link>
          <Link href={`/brands/${corcs}`}>
            <Image
              src={Brands2}
              alt="Brand Product"
              className="rounded-lg shadow-md w-[220px]"
            />
          </Link>
          <Link href={`/brands/${newbalance}`}>
            <Image
              src={Brands3}
              alt="Brand Product"
              className="rounded-lg shadow-md w-[220px]"
            />
          </Link>
          <Link href={`/brands/${asics}`}>
            <Image
              src={Brands4}
              alt="Brand Product"
              className="rounded-lg shadow-md w-[220px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
