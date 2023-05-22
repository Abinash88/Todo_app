"use client";

import { Context } from "@/component/Client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);

  const RegisterHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please enter a field");
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user)
      console.log(data);
      toast.success(data.message);
    } catch (err) {
      return toast.error(data.message);
    }
  };
  if (user._id) return redirect('/login')
  return (
    <>
      <div className="login w-[100%] h-[100vh] items-start mt-10 justify-center flex">
        <section>
          <form
            onSubmit={RegisterHandler}
            className="flex flex-col items-center justify-start border w-[400px]"
          >
            <h2 className="my-4 text-black  font-bold text-[22px]">Signup</h2>
            <input
              onChange={(e) => setName(e.target.value)}
              type="name"
              placeholder="User Name"
              name="name"
              id="name"
              value={name}
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              name="email"
              id="email"
              value={email}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
            />
            <button
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white  rounded-md mb-3"
              type="submit"
            >
              Signup
            </button>
            <p>OR</p>

            <Link
              className="text-[17px] p-3 hover:underline
                    "
              href={`/login`}
            >
              Login
            </Link>
          </form>
        </section>
      </div>
    </>
  );
};

export const metadata = {
  title: "Signup",
  description: "signup of todo app",
};

export default Page;
