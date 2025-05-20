import Image from "next/image";
import Link from "next/link";

export default async function Recommended() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    // Fetch the data from the API route
    const res = await fetch(`${BASE_URL}/api/getPost`);
    console.log("Fetching data from:", res);

    // Check if the response is successful (status 200)
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    // Try to parse the response as JSON
    const data = await res.json();

    // Handle case when data is not an array or is empty
    if (!Array.isArray(data)) {
      return (
        <div className="w-full mx-auto flex items-center justify-center pb-10">
          <p>
            Error fetching recommended products. Data is not in expected format.
          </p>
        </div>
      );
    }

    return (
      <div className="w-full  mx-auto flex items-center justify-center pb-10">
        <div className="w-[1200px]  min-h-[50vh]">
          <h1 className="text-2xl  font-semibold text-gray-700 text-shadow-lg bg-transparent text-center lg:text-start">
            Recommended For You
          </h1>
          <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start lg:items-start lg:gap-10 gap-5 ">
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
                    <h3 className="text-[12px] font-normal mt-2">
                      {d.subTitle}
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
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="w-full mx-auto flex items-center justify-center pb-10">
        <p>Error fetching recommended products. Please try again later.</p>
      </div>
    );
  }
}
