"use client"

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { Context } from "@/component/Client";
import { redirect, useRouter } from "next/navigation";


const AddTodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user, reloadName } = useContext(Context);
  const router = useRouter()


  const handleTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (!data.success) return toast.error(data.message)
      toast.success(data.message)
      router.refresh();
      setTitle('')
      setDescription('')
    } catch (err) {
      return toast.error(err.message)
    }
  };

  if(!user._id) return redirect('/login');

  return (
    <>
      <div  className="login w-auto h-auto items-start pt-10 justify-center flex">
        <section>
          <form
            onSubmit={handleTask}
            className="flex bg-white rounded-md p-5 flex-col items-center justify-start border w-[500px]"
          >
            <h2 className="my-4 text-black  font-bold text-[22px] flex  ">
              Add Your Work Task<span className="font-bold">, {reloadName ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : user.name?.split(' ')[0] }</span>
            </h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="w-[95%]"
              type="text"
              placeholder="Write Task"
              name="task"
              id="task"
              value={title}
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              className="w-[95%]"
              type="text"
              name="desc"
              id="desc"
              value={description}
              placeholder="Enter Description"
            />
            <button
              className="px-5 py-2 bg-gray-800 hover:bg-gray-900 text-white  rounded-md mb-3"
              type="submit"
            >
              Add Task
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default AddTodoForm;
