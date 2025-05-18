import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserInfoBtn() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  //   console.log(session.user.name, "data");
  return (
    <div>
      {userName ? (
        <button className="w-[40px] h-[40px]">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </button>
      ) : (
        <div className="flex gap-5">
          <Link
            href="/sign-in"
            className="bg-[#0D769B] px-3 py-2 text-[15px] rounded-lg text-white font-medium cursor-pointer"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-[#0D769B] px-3 py-2 text-[15px] rounded-lg text-white font-medium cursor-pointer"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
