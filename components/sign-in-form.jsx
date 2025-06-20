"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SocialSignin from "./SocialSignin";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SigninForm({ className, ...props }) {
  const router = useRouter();

  const [imageFile, setImageFile] = useState(null);
  // const [uploadedUrl, setUploadedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");

  const imgbbAPIKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;

  const handleSignup = async (e) => {
    e.preventDefault();

    // if (password !== confirmPass) {
    //   return null;
    // }
    if (!imageFile) return alert("Please select an image!");
    const formData = new FormData();
    formData.append("image", imageFile);
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!data.success) {
        alert("Image upload failed.");
        setLoading(false);
        return;
      }
      const imageUrl = data.data.url;
      const bookMark = [];
      const newUser = {
        imgUrl: imageUrl,
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirmPass: e.target.confirmPass.value,
        bookMark: bookMark,
        role: role,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        e.target.reset();
        router.push("/login");
      } else {
        return null;
      }
    } catch (error) {
      return alert("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-28">
      <div
        className={cn(
          "flex flex-col gap-6 rounded-xl max-w-[600px] ",
          className
        )}
        {...props}
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome to Stock-Z</CardTitle>
            {/* <CardDescription>Login with your or Google account</CardDescription> */}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4"></div>

                <div className="grid gap-6">
                  <div className="flex gap-5">
                    <div className="grid gap-2 w-1/2">
                      <Label htmlFor="image">Image</Label>
                      <Input
                        id="image"
                        placeholder="Image"
                        required
                        type="file"
                        className="cursor-pointer"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="grid gap-2 w-1/2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" type="name" placeholder="xyz" required />
                    </div>
                  </div>
                  <div className="flex gap-5 items-center justify-center">
                    <div className="grid gap-2 w-1/2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2 w-1/2">
                      <Label htmlFor="email">Select Role</Label>
                      <Select
                        onValueChange={(value) => setRole(value)}
                        required
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Select your role</SelectLabel>
                            <SelectItem value="seller">Seller</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="123456"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPass">confirmPass</Label>
                    <Input
                      id="confirmPass"
                      type="password"
                      placeholder="confirmPass"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Sign up
                  </Button>
                </div>
                <div>
                  <SocialSignin />
                </div>
                <div className="text-center text-sm">
                  Have an account?{" "}
                  <a href="/login" className="underline underline-offset-4">
                    Log in
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
