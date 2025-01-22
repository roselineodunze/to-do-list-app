import Image from "next/image";
import Navbar from "./[components]/Navbar";
import TaskManager from "./[components]/TaskManager";

export default function Home() {
  return (
    <div className=" h-dvh min-h-dvh">
      <Navbar/>
      <div className="flex justify-center items-center">
      <TaskManager/>
      </div>
    </div>
  );
}
