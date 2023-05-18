"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export const Context = createContext({ user: {} });

let reloadName = true;

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    reloadName = true;
    fetch("/api/auth/me")
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

export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
      });
      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      setUser({});
      router.refrehs();
    } catch (err) {
      return toast.error(data.message);
    }

    if (!user._id) return redirect("/login");
  };

  return (
    <>
      {user._id ? (
        <button onClick={logoutHandler} className="links">
          Logout
        </button>
      ) : (
        <Link className="links" href={`/login`}>
          Login
        </Link>
      )}
    </>
  );
};

export const TodoButton = ({ id, completed }) => {
const router = useRouter();

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

  return (
    <>
      <div className="flex ">
        <input
          type="checkbox"
          style={{ marginRight: "17px", width: "20px" }}
          checked={completed}
        />
        <button
          type="button"
          onClick={() => DeleteHanlder(id)}
          className="text-white font-semibold"
        >
          DELETE
        </button>
      </div>
    </>
  );
};
