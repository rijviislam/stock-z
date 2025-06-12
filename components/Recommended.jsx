import { getPostApi } from "@/app/api/getPost/route";
import Image from "next/image";
import Link from "next/link";

export default async function Recommended() {
  const data = await getPostApi();

  return (
    <div>
      <h1 className="text-2xl  font-semibold text-gray-700 text-shadow-lg bg-transparent text-center lg:text-center">
        Recommended For You
      </h1>
      <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-center lg:items-center lg:gap-10 gap-5 ">
        {data?.map((d) => (
          <div
            key={d._id}
            className="max-w-[200px] h-[250px] px-2 py-3 bg-[#ecf6ff] shadow-md rounded-2xl group relative"
          >
            <div>
              <Image
                src={d.image}
                alt="product image"
                quality={100}
                width={200}
                height={140}
                className="rounded-xl h-[140px] object-contain transition-transform transform group-hover:scale-110  duration-500"
              />
              <div className="px-3 ">
                <Link
                  href={`/recommended/${d._id}`}
                  className="text-base font-medium mt-4 hover:text-[#B35929]"
                >
                  {d.title}
                </Link>
                <h3 className="text-[12px] font-normal mt-2">{d.subTitle}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
