import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import recommendedSinglePostDetails from "@/lib/recommendedSinglePost";
import Image from "next/image";

export default async function RecommendedSingleProduct({ params }) {
  const { id } = params;
  const product = await recommendedSinglePostDetails(id);

  console.log(product);
  return (
    <div className=" flex flex-col items-center w-full min-h-screen">
      <div className=" w-[1200px] mt-10">
        {product ? (
          <div>
            <h2 className="text-2xl font-medium text-black">{product.title}</h2>
            <p className="text-lg text-black font-medium">
              {product.description}
            </p>
            <div className="flex justify-center lg:mt-10 ">
              <div className="">
                <Image
                  src={product.image}
                  width={500}
                  height={400}
                  quality={100}
                  alt={product.title}
                  className="bg-[#FAFAFA] rounded-xl shadow-sm"
                />
              </div>
              <div className="w-1/3 mx-10">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline">Size</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex gap-3">
                      <Badge variant="outline" className="bg-[#FAFAFA]">US M</Badge>
                      <Badge variant="outline" className="bg-[#FAFAFA]">US W</Badge>
                      <Badge variant="outline" className="bg-[#FAFAFA]">UK</Badge>
                      <Badge variant="outline" className="bg-[#FAFAFA]">CM</Badge>
                      <Badge variant="outline" className="bg-[#FAFAFA]">KR</Badge>
                      <Badge variant="outline" className="bg-[#FAFAFA]">EU</Badge>

                      </div>
                      <div className="mt-5 text-center">
                      <Button variant="outline" className="w-full mb-5">All Bid</Button>

                      <strong >No Bid Avaiable right now</strong>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </div>
  );
}
