"use client";
import Link from "next/link";

export default function SignUpPage() {
  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      type: e.target.type.value,
    };
    const res = await fetch("http://localhost:3000/api/auth/sign-up/user", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
    });
    // console.log("Ress", res);
  };
  return (
    <div className="text-center mt-32">
      <h1>SignUpPage</h1>
      <div>
        <form
          action=""
          onSubmit={handleRegister}
          className="flex flex-col items-center justify-center gap-5 mt-10"
        >
          <input
            type="text"
            name="name"
            placeholder="enter your name"
            className="border border-black px-3 py-4 w-[400px]"
          />
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
          <select name="type" placeholder="user type">
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="boot">Boot</option>
          </select>
          <button className="p-4 bg-amber-200 cursor-pointer rounded-2xl">
            Register
          </button>
          <Link href="/api/auth/signin">Sign In</Link>
        </form>
      </div>
    </div>
  );
}




