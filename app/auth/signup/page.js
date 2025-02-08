"use client"

import CustomButton from "@/app/components/ui/CustomButton";

export default  function SignUp() {
const handleSignupForm = async(e) => {
  e.preventDefault();
  const newUser = {
    username: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
    confirmPass: e.target.confirmPass.value
  };
  console.log("click", newUser)

  try {
    const resp = await fetch("/api/register-user", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (resp.ok) {
     console.log("Register Done")
    } else {
      console.log("Register error");
    }
  } catch (error) {
    console.error("Error during registration:", error);
  }
}
  return (
    <div className="flex items-center justify-center">
      <fro className=" w-full flex items-center flex-col justify-center mt-10 ">
        <h1 className="text-center font-bold text-5xl mb-5">Sign Up</h1>
        <form onSubmit={handleSignupForm} className="flex flex-col  gap-2  w-[600px]">
          <input placeholder="name" name="name" className="p-3 rounded-md text-black outline-none shadow-lg" />
          <input placeholder="email" name="email" className="p-3 rounded-md text-black outline-none shadow-lg" />
          <input placeholder="pass" name="password" className="p-3 rounded-md text-black outline-none shadow-lg" />
          <input placeholder="confrmPass" name="confirmPass" className="p-3 rounded-md text-black outline-none shadow-lg" />
          <CustomButton className="p-3 mt-5 w-1/4 rounded-md bg-red-400 text-white font-semibold shadow-lg " btn="Continue"/>
       
        </form>

 
      </fro>
    </div>
  );
}
