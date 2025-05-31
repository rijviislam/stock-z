"use client"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter()
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const res = await signIn("credentials", { email, password, redirect: false });
    if(res.status === 200) {
        router.push("/")
    }
    console.log("res", res);
  };
  return (
    <div className="mt-20 text-center">
      <h1>Login</h1>
      <div>
        <form
          action=""
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center gap-5 mt-10"
        >
          <input
            type="text"
            name="email"
            placeholder="enter your email"
            className="border border-black px-3 py-4 w-[400px]"
          />

          <input
            type="password"
            name="password"
            placeholder="enter your password"
            className="border border-black px-3 py-4 w-[400px]"
          />

          <button className="p-4 bg-amber-200 cursor-pointer rounded-2xl">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
