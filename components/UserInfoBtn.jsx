import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserInfoBtn() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  //   console.log(session.user.name, "data");
  return (
    <div>
      {userName ? (
        <div className="flex items-center justify-center gap-5">
          <div className="flex flex-col items-center">
            <button className="w-[40px] h-[40px]  rounded-full overflow-hidden">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </button>
            <small className="font-bold">{userName}</small>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-[#ff2323] px-3 py-2 text-[15px] rounded-lg text-white font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-5">
          <Link
            href="/api/auth/signin"
            className="bg-[#B35929] px-3 py-2 text-[15px] rounded-lg text-white font-medium cursor-pointer"
          >
            Login
          </Link>
          <Link
            href="/api/auth/sign-up"
            className="bg-[#0D769B] px-3 py-2 text-[15px] rounded-lg text-white font-medium cursor-pointer"
          >
            Sign Up
          </Link>

          <button className="md:hidden block cursor-pointer border-2 border-black">
            <svg
              fill="#B35929"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              width="30px"
              height="30px"
              viewBox="0 0 20 20"
            >
              <path d="M19,5H1C0.4,5,0,4.6,0,4s0.4-1,1-1h18c0.6,0,1,0.4,1,1S19.6,5,19,5z" />
              <path d="M10,11H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h9c0.6,0,1,0.4,1,1S10.6,11,10,11z" />
              <path d="M19,17H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h18c0.6,0,1,0.4,1,1S19.6,17,19,17z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
