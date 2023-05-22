import AddTodoForm from "./AddTodoForm";
import Loader from "@/component/Loader";
import Todos from "./Todos";
import { Suspense } from "react";



const Page = () => {

  return (
    <>
      <div className="w-[70%]  flex justify-center   h-screen">
        
        <div className="flex flex-col justify-start">
          <div className="">
            <AddTodoForm />
          </div>
          <div className="">
            <Suspense fallback={<Loader />}>
              <Todos />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
