import React from 'react'

const Navbar = () => {
  return (
    <header className='w-screen h-[70px] bg-black'>
        <nav className='w-full h-full flex items-center justify-around text-lg font-medium'>
            <div>
                <p className='font-bold shadow-red-700 cursor-pointer hover:text-[#645f5f]'>Next Generative AI</p>
            </div>
            <div className='navOptions'>
                <p>Home</p>
                <p>Recent Prompts</p>
                <p>About</p>
                <p>Settings</p>
            </div>
        </nav>
    </header>
  )
}

export default Navbar
