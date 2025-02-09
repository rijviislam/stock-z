import getPost from "@/lib/getPost";
import Image from "next/image";
import Link from "next/link";
export default async function Recommended() {
  const data = await getPost();
  return (
    <div className="w-full  mx-auto flex items-center justify-center pb-10">
      <div className="w-[1200px]  min-h-[50vh]">
        <h1 className="text-2xl  font-semibold text-gray-700 text-shadow-lg bg-transparent">
          Recommended For You
        </h1>
        <div className="mt-10 flex flex-wrap items-start lg:gap-10 ">
          {data?.map((d) => (
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
                  <h3 className="text-[12px] font-normal mt-2">{d.subTitle}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
