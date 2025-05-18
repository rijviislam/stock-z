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
        <div className="flex fixed w-full items-center z-50 bg-[#F3F9FF] justify-center gap-10 shadow-md py-2">
          <div>
            <a href="/">
              <Image src={Logo} width={50} height={50} alt="Logo" />
            </a>
          </div>
          <div>
            <Input
              type="text"
              placeholder="Search for brand, color, etc."
              className="w-[550px] outline-none border-none"
            />
          </div>
          <ul className="flex items-center justify-center gap-10  text-[#0D769B] font-medium">
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
