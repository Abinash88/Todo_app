import { TodoItem } from "@/component/ServerComponent";
import React from "react";
import { cookies } from "next/headers";

let reloader = true;
const CatchData = async (token) => {
  reloader = true;
  try {
    const res = await fetch(`${process.env.GET_METHOD}/api/mytask`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
        "Content-Type": "application/json",
      },
    });

    const task = await res.json();
    if (!task.success) return [];
    return task.todos;
  } catch (err) {
    return [];
  }
};

const Todos = async () => {
  const token = cookies().get("token")?.value;
  const task = await CatchData(token);
  reloader = false;
  console.log(task);
  return (
    <>
      <div className=" mt-8  w-auto bg-gray-100 ">
        {task ? (
          task?.map((item) => {
            return (
              <TodoItem key={item._id} {...item} completed={item.isCompleted} />
            );
          })
        ) : (
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Todos;
