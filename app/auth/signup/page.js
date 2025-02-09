import { SigninForm } from "@/components/sign-in-form";

export default  function SignUp() {
// const handleSignupForm = async(e) => {
//   e.preventDefault();
//   const newUser = {
//     username: e.target.name.value,
//     email: e.target.email.value,
//     password: e.target.password.value,
//     confirmPass: e.target.confirmPass.value
//   };
//   console.log("click", newUser)

//   try {
//     const resp = await fetch("/api/register-user", {
//       method: "POST",
//       body: JSON.stringify(newUser),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (resp.ok) {
//      console.log("Register Done")
//     } else {
//       console.log("Register error");
//     }
//   } catch (error) {
//     console.error("Error during registration:", error);
//   }
// }
  return (
    <div>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
          <div className="flex w-full max-w-sm flex-col gap-6">
           
            <SigninForm />
          </div>
        </div>
      </div>
  );
}
