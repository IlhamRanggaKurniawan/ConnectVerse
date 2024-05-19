"use client"

/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import React from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {

  const router = useRouter()

  const handleSubmit = async (e : any) => {
    e.preventDefault()
    try {
      const result = await signIn("credentials", {
        username: e.target.username.value,
        password: e.target.password.value,
        redirect: false,
        callbackUrl: "/"
      })

      if(result?.error) {
        console.log(result.error)
      }

      router.push("/")

    } catch (error) {
      console.log(error)
    }
    
  }


  return (
    <div className="flex  justify-center items-center h-screen">
      <div className="w-full p-6 rounded-lg shadow-m max-w-[26rem]">
        <div className="mb-3 ">
          <h1 className="text-center font-bold"> SpaceShip Social media</h1>
        </div>
        <Separator className="my-2" />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">username</label>
            <Input id="username" type="text" required placeholder="username" name="username"/>
          </div>
          <div>
            <label htmlFor="password">password</label>
            <Input id="password" type="password" required placeholder="password" name="password" />
          </div>
          <div className="flex justify-center">
            <Button className="w-full font-bold" type="submit">
              login
            </Button>
          </div>
        </form>
        <div>
          <Link href="/register"><span> don't have account? </span></Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
