import Image from "next/image";
import Link from "next/link";

export default function RelatedProduct({ relatedProduct }) {
  const product = relatedProduct;

  return (
    <div>
      <div className=" w-[1200px] py-16 ">
        <h1 className="text-2xl font-semibold text-gray-700 text-shadow-lg bg-transparent">
          Related Product
        </h1>
        <div className=" flex flex-wrap  gap-5 my-5">
          {product?.length > 0 ? (
            product.map((relatedItem) => (
              <Link
                href={`/recommended/${relatedItem._id}`}
                key={relatedItem._id}
                className="max-w-[200px] h-[250px] px-2 py-3 bg-[#ecf6ff] shadow-md rounded-2xl group"
              >
                <div>
                  <Image
                    src={relatedItem.image}
                    alt="product image"
                    quality={100}
                    width={200}
                    height={140}
                    className="rounded-xl h-[140px] object-contain transition-transform transform group-hover:scale-150  duration-500"
                  />

                  <div className="px-3">
                    <h1 className="text-base font-medium mt-4">
                      {relatedItem.title}
                    </h1>
                    <h3 className="text-[12px] font-normal mt-2">
                      {relatedItem.subTitle}
                    </h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p> Related Product not found</p>
          )}
        </div>
      </div>
    </div>
  );
}
