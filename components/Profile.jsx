"use client";

import { useSession } from "next-auth/react";
import { Input } from "./ui/input";

export default function Profile() {
  const session = useSession();

  return (
    <div className="flex items-center justify-center gap-5">
      <div className=" ">
        <img
          src={
            session?.data?.user?.imgUrl || "https://i.ibb.co/HGCGmV3/OIP.jpg"
          }
          width={200}
          height={50}
          alt="Profile"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-5 items-start">
        <Input
          type="email"
          placeholder={session?.data?.user?.name}
          className="outline-none w-[400px]"
        />
        <Input
          type="email"
          placeholder={session?.data?.user?.email}
          className="outline-none w-[400px]"
        />
        <p>{session?.data?.user?.role}</p>
      </div>
    </div>
  );
}
