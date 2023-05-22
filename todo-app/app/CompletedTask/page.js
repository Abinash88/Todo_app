"use client";

import TaskItem from "@/component/TaskItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from '../../component/Loader'

const page = () => {
  const router = useRouter()

  const [data, setData] = useState();

  const GetData = async () => {
    try {
      const res = await fetch('api/sidebartask', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await res.json();
      if (!data.success) return [];
      console.log(data)
      setData(data.todos);
      router.refresh();
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    GetData()
  }, [])

  const refreshFunc = () => {
    router.refresh();
  }

  return (
    <>
      <div className="w-full ">
        <div className="w-full flex flex-col items-center">
          {data ?
            data?.map((item) => {
              return (
                <TaskItem  key={item._id} {...item} />
              )
            }) : <Loader /> 
          }
        </div>
      </div>
    </>
  );
};

export default page;
