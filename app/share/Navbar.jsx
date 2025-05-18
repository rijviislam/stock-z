"use client";
import { Input } from "@/components/ui/input";
import UserInfoBtn from "@/components/UserInfoBtn";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Logo from "../../public/assets/stock-z-logo-50x50.png";

export default function Navbar() {
  return (
    <SessionProvider>
      <div className="relative">
        <div className="flex fixed w-full items-center z-50 bg-[#F3F9FF]  justify-between lg:justify-center gap-5 lg:gap-10 shadow-md py-2 px-5 md:px-0">
          <div>
            <a href="/">
              <Image src={Logo} width={50} height={50} alt="Logo" />
            </a>
          </div>
          <div>
            <Input
              type="text"
              placeholder="Search for brand, color, etc."
              className="xl:w-[500px] outline-none border-none md:flex hidden"
            />
          </div>
          <ul className="md:flex items-center justify-center gap-5 xl:gap-10  text-[#0D769B] font-medium hidden ">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/product">Product</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
          </ul>

          <UserInfoBtn />
        </div>
      </div>
    </SessionProvider>
  );
}
