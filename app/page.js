import Image from "next/image";
import Navbar from "./[components]/Navbar";
import TaskManager from "./[components]/TaskManager";

export default function Home() {
  return (
    <div className="bg-gray-950 w-screen h-screen">
      <Navbar/>
      <div className="flex justify-center items-center">
      <TaskManager/>
      </div>
    </div>
  );
}
