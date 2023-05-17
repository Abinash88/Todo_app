"use client"

import { TodoItem } from "@/component/ServerComponent";
import AddTodoForm from "./AddTodoForm";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const page = () => {

  const [data, setData] = useState();
  const GetnewTask = async () => {
    try {
      const res = await fetch("/api/mytask", {
        method: "GET",
        header: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      console.log(data)
      setData(data.todos)
    } catch (err) {
      return toast.error(data.message);
    }
  };

  useEffect(() => {
    GetnewTask()
  },[data])

  return (
    <>
      <div className="bg-gray-100 w-screen h-screen">
        <div className="">
          <AddTodoForm />
        </div>

        <div className=" mt-8  ">
          {data?.map((item) => {
            return (
              <TodoItem
                key={item._id}
                {...item}
                ids={"sampliId"}
                completed={item.isCompleted}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
