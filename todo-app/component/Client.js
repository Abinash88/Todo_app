"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

export const Context = createContext({ user: {} });

let reloadName = true;

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    reloadName = true;
    fetch("http://localhost:3000/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          
        }
      });
    reloadName = false;
  }, []);
  return (
    <Context.Provider value={{ user, setUser, reloadName }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};

export const LogoutBtn = ({ hoverboxs, hoverbox }) => {
  const { user, setUser } = useContext(Context);
  const router = useRouter();
  const [image, setImage] = useState('');
  const box = useRef();

  const outClickClosed = (e) => {
    console.log(e.target)
  }


  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      setUser({});
      router.refresh();
    } catch (err) {
      return toast.error(data.message);
    }

    if (!user._id) return redirect("/login");
  };

  return (
    <>
      <div ref={box} style={hoverboxs ? { display: 'block' } : {}} className={`hoveritem`}>
        <div onClick={outClickClosed} className="w-[70px] p-1 h-[70px] mb-2 bg-white flex justify-center py-2 rounded-full">
          <img src={image ? `${image}` : `/next.svg`} className='rounded-full w-[100%] h-[100%]'/>
        </div>
    <br/>
        {user._id ? (
          <button onClick={logoutHandler} className={`mt-2  link py-2`}>
            <span onClick={hoverbox}>
              Logout
            </span>
          </button>
        ) : (
          <Link className={`link py-2`} onClick={hoverbox} href={`/login`}>
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export const TodoButton = ({ id, completed,  }) => {
  const router = useRouter();
  
      const pathname = usePathname();

  const DeleteHanlder = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (err) {
      return toast.error(err.message);
    }
  };

  const CheckedData = async (id) => {


    try {
      const res = await fetch(`http://localhost:3000/api/${'task'}/${id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message)
      router.refresh();
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <div className="flex ">
        <input
          type="checkbox"
          className="rounded-full shadow-sm"
          style={{ marginRight: "17px", width: "20px" }}
          onChange={() => CheckedData(id)}
          checked={completed}
        />
        <button
          type="button"
          onClick={() => DeleteHanlder(id)}
          className="text-gray-800 font-bold"
        >
          DELETE
        </button>
      </div>
    </>
  );
};
