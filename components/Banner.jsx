import BannerImg from "@/public/assets/stock-removebg-1.png";

import Image from "next/image";
import Aos from "./Aos";
export default function Banner() {
  return (
    <div className=" h-screen font-poppins flex items-center justify-center overflow-x-hidden relative z-30 ">
      <Aos />
      <div className=" max-w-[1200px] h-full flex items-center lg:px-8 px-10  flex-col lg:flex-row justify-center gap-10 xl:px-0">
        <div
          className="lg:w-1/2 select-none"
          data-aos="fade-up-right"
          data-aos-duration="3000"
        >
          <h1 className="text-[80px] font-bold leading-[86px]">
            <span className=" text-shadow-lg span1">Fresh</span> Kicks, Hottest
            <span className=" text-shadow-lg span2"> Drops</span>
          </h1>
          <p className="text-lg mt-5 leading-8">
            Stay ahead of the game with the newest and most hyped sneakers in
            the market.
          </p>
        </div>
        <div className="lg:w-1/2 img2 select-none">
          <Image
            src={BannerImg}
            quality={100}
            placeholder="blur"
            alt="Banner Img"
            className="object-content w-full h-full"
            data-aos="fade-up-left"
            data-aos-duration="3000"
          />
        </div>
      </div>
    </div>
  );
}
