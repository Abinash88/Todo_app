"use client";

import { TodoButton } from "./Client";


export const TodoItem = ({ title, description, _id,  completed }) => {
  return (
    <>
      <div style={{margin:'10px 0'}} className="  w-screen h-[200px] bg-red-600 flex  items-center justify-center">
        <div style={{padding:'10px', backgroundColor:'#0a1025',boxShadow:'2px 4px 10px #c0c0c0'}} className=" m-auto w-[500px] px-5 rounded-md   flex items-center  justify-between ">
          <div className=" m-auto text-white ">
            <h4 className="text-[17px] font-bold"> {title}</h4>
            <p className="text-[16px] mb-4 text-gray-500">{description}</p>
            <h6></h6>
          </div>

          <div className="">
            <TodoButton id={_id} completed={completed}/>
          </div>
        </div>
      </div>
    </>
  );
};




export const sideBar = () => {
  return <>
        <div className="">
          
        </div>
  </>
}