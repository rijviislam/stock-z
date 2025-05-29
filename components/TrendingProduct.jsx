"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import CaroImg3 from "@/public/assets/stock-10.jpg";
import CaroImg4 from "@/public/assets/stock-11.jpg";
import CaroImg6 from "@/public/assets/stock-6.jpg";
import CaroImg5 from "@/public/assets/stock-7.jpg";
import CaroImg1 from "@/public/assets/stock-8.jpg";
import CaroImg2 from "@/public/assets/stock-9.jpg";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/image";

export default function TrendingProduct() {
  return (
    <div className=" flex items-center justify-center my-10">
      <div className="lg:w-[1200px]">
        <h1 className="text-2xl  font-semibold text-gray-700 text-shadow-lg bg-transparent lg:text-center text-center">
          Trending Product
        </h1>

        <div className="my-10 ">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              <CarouselItem className="basis-1/3">
                <Image
                  src={CaroImg1}
                  alt="Carousle Img"
                  className="rounded-xl"
                  placeholder="blur"
                  quality={100}
                />
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Image
                  src={CaroImg2}
                  alt="Carousle Img"
                  className="rounded-xl"
                  placeholder="blur"
                  quality={100}
                />
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Image
                  src={CaroImg3}
                  alt="Carousle Img"
                  className="rounded-xl"
                  placeholder="blur"
                  quality={100}
                />
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Image
                  src={CaroImg4}
                  alt="Carousle Img"
                  className="rounded-xl"
                  placeholder="blur"
                  quality={100}
                />
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Image
                  src={CaroImg5}
                  alt="Carousle Img"
                  className="rounded-xl"
                  placeholder="blur"
                  quality={100}
                />
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Image
                  src={CaroImg6}
                  alt="Carousle Img"
                  className="rounded-xl"
                  placeholder="blur"
                  quality={100}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-[#ecf6ff] border border-gray-200 shadow-lg  xxl:flex items-center justify-center hidden" />
            <CarouselNext className="bg-[#ecf6ff] border border-gray-200 shadow-lg xxl:flex items-center justify-center hidden" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
