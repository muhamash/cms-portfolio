import Image from "next/image"
import Link from "next/link"

export default function notFoundPage() {
  return (
    <div className=" w-screen h-screen flex flex-col justify-center items-center py-30">
      
          <Image src={"/newNotfound.svg"} alt="newNotfound??" height={500} width={300}></Image>
          <Link href={"/"} className="bg-cyan-700 text-white px-5 py-3 my-10 rounded-md text-md shadow-md hover:scale-105 duration-200 transition-all ease-in-out">Back to home</Link>
    </div>
  )
}
