"use client"

import Link from "next/link";
import { LogoutBtn } from "@/component/Client";
import { useState } from "react";


const Headers = () => {

  const [hoverboxs, setHoverboxs] = useState(false);
  const hoverbox = () => {
    setHoverboxs(!hoverboxs)
  }

  return (
    <div style={{ backgroundColor: '#0a1025' }} className=" h-[80px]  relative flex items-center justify-between w-[full]">
      <div className=" w-[90%] relative mx-auto flex items-center justify-between">
        <div className="">
          <h2 className="text-white text-[30px]  font-bold">Todo.</h2>
        </div>
        <div className="nav relative">
          <Link className='links' href={`/about`}>About</Link>
          <span onClick={hoverbox} className="links cursor-pointer">Profile</span>
          <LogoutBtn hoverboxs={hoverboxs} hoverbox={hoverbox} className='' />
        </div>
      </div>
    </div>
  )
}

export default Headers