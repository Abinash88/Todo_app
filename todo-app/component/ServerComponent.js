"use client";

import { TodoButton } from "./Client";

export const TodoItem = ({ title, description, _id, completed }) => {
  return (
    <>
      <div
        style={{ margin: "10px 0" }}
        className="  w-auto h-[200px] flex  items-center justify-center"
      >
        <div
          style={{
            padding: "10px",
            backgroundColor: "#e9ebec",
            boxShadow: "2px 4px 10px #c0c0c0",
          }}
          className=" m-auto w-[500px] px-5 rounded-md   flex items-center  justify-between "
        >
          <div className=" m-auto text-black ">
            <h4 className="text-[17px] font-bold"> {title}</h4>
            <p className="text-[16px] mb-4 text-gray-600">{description}</p>
            <h6></h6>
          </div>

          <div className="">
            <TodoButton id={_id} completed={completed} />
          </div>
        </div>
      </div>
    </>
  );
};
