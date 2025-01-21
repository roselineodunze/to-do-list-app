import React from 'react'
import { TaskSquare } from 'iconsax-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='md:w-[80vw] md:h-[20vh] w-[90vw] h-[15vh] mx-auto flex items-center bg-transparent '>
    <Link href={"/"} className='flex gap-2 items-center'>
        <TaskSquare size="44" color="#ffffff"/>
        <h1 className='text-white text-4xl'>TODO</h1>
    </Link>
    </div>
  )
}

export default Navbar