// import Image from "next/image";
// import Link from "next/link";
// export default async function Recommended() {
//   // Fetch the data from the API route
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getPost`);
//   const data = await res.json();
//   console.log("My Data", data);
//   return;
//   return (
//     <div className="w-full  mx-auto flex items-center justify-center pb-10">
//       <div className="w-[1200px]  min-h-[50vh]">
//         <h1 className="text-2xl  font-semibold text-gray-700 text-shadow-lg bg-transparent">
//           Recommended For You
//         </h1>
//         <div className="mt-10 flex flex-wrap items-start lg:gap-10 ">
//           {data?.map((d) => (
//             <Link
//               href={`/recommended/${d._id}`}
//               key={d._id}
//               className="max-w-[200px] h-[250px] px-2 py-3 bg-[#ecf6ff] shadow-md rounded-2xl group"
//             >
//               <div>
//                 <Image
//                   src={d.image}
//                   alt="product image"
//                   quality={100}
//                   width={200}
//                   height={140}
//                   className="rounded-xl h-[140px] object-contain transition-transform transform group-hover:scale-150  duration-500"
//                 />

//                 <div className="px-3">
//                   <h1 className="text-base font-medium mt-4">{d.title}</h1>
//                   <h3 className="text-[12px] font-normal mt-2">{d.subTitle}</h3>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";

export default async function Recommended() {
  try {
    // Fetch the data from the API route
    const res = await fetch(`/api/getPost`);
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
                    <h3 className="text-[12px] font-normal mt-2">
                      {d.subTitle}
                    </h3>
                  </div>
                </div>
              </Link>
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
