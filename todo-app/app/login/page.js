"use client";

import { Context } from "@/component/Client";
import Link from "next/link";
import { useContext, useState } from "react";
import {redirect} from 'next/navigation'
import { toast } from "react-hot-toast";


const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please enter a field");
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
        setUser(data.user);
        toast.success(data.message)
      console.log(data);
    } catch (err) {
      return toast.error(data.message);
    }
  };

  if(user._id) return redirect('/') 

  return (
    <>
      <div className="login w-[100%] h-[100vh] items-start mt-10 justify-center flex">
        <section>
          <form
            onSubmit={loginHandler}
            className="flex flex-col items-center justify-start border w-[400px]"
          >
            <h2 className="my-4 text-black  font-bold text-[22px]">Login</h2>
            <input
              onChange={(value) => setEmail(value.target.value)}
              value={email}
              type="email"
              placeholder="Email address"
              name="email"
              id="email"
            />
            <input
              onChange={(value) => setPassword(value.target.value)}
              value={password}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
            />
            <button
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white  rounded-md mb-3"
              type="submit"
            >
              Login
            </button>
            <p>OR</p>

            <Link
              className="text-[17px] p-3 hover:underline
                    "
              href={`/register`}
            >
              Sign in
            </Link>
          </form>
        </section>
      </div>
    </>
  );
};

export const metadata = {
  title: "Login",
  description: "login page of todo app",
};

export default page;
