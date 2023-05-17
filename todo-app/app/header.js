import Link from "next/link";
import { LogoutBtn } from "@/component/Client";


const header = () => {



  return (
  <div style={{backgroundColor:'#0a1025'}} className=" h-[60px]  relative flex items-center justify-between w-[full]">
      <div className=" w-[90%] relative mx-auto flex items-center justify-between">
        <div className="">
          <h2 className="text-white text-[30px]  font-bold">Todo.</h2>
        </div>
        <div className="nav relative">
          <Link className='links' href={`/`}>Home</Link>
          <Link className='links' href={`/About`}>About</Link>
          <LogoutBtn className=''/>
        </div>
      </div>
    </div>
  )
}

export default header