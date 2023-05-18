import { TodoItem } from "@/component/ServerComponent";
import AddTodoForm from "./AddTodoForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const CatchData = async (token) => {
  try {
    const res = await fetch(`${process.env.GET_METHOD}/api/mytask`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });

    const task =await res.json();
    if (!task.success) return [];
    return task.todos;
  } catch (err) {
    console.log(err.message,'error occuring')
    return [];
  }
};

const page = async () => {
  const token = cookies().get("token")?.value;
  if (!token) return redirect("/login");
  const task = await CatchData(token);
  console.log(task, "blank task");

  return (
    <>
      <div className="bg-gray-100 w-screen h-screen">
        <div className="">
          <AddTodoForm />
        </div>

        <div className=" mt-8  w-screen bg-gray-100 ">
          {task ? (
            task.map((item) => {
              return (
                <TodoItem
                  key={item._id}
                  {...item}
                  completed={item.isCompleted}
                />
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
      </div>
    </>
  );
};

export default page;
