import React, { useState } from 'react'

export default function Navbar() {

    let [dropdown, setDropdown] = useState(false)

  return (
    <>
        <div className='bg-blue-600 p-3 text-white sticky top-0 z-10 flex gap-5 justify-between items-center drop-shadow-xl shadow-black'>
            <div className='flex gap-10 items-center'>
                <div className='mr-auto flex items-center justify-center gap-3'>
                    <button  className='block sm:hidden bg-blue-700 rounded-md w-12 h-12 active:scale-90 transition-transform active:bg-blue-800'
                        onClick={() => {
                            document.getElementById('nav-dropdown').classList.toggle('-translate-y-52')
                            setDropdown(!dropdown)
                        }}
                    >=</button>
                    <h1 className='font-bold text-lg'><i className='fa-brands fa-github'></i> RajaswaRai</h1>
                </div>
            </div>

                <ul className='sm:flex gap-5 hidden justify-center items-center [&>li>*]:underline'>
                    <li><a href="/">Beranda</a></li>
                    <li><a href="/rekapitulasi">Rekapitulasi</a></li>
                </ul>

            <div className='relative flex items-center gap-2'>
                <img src="" alt="profile" className='w-12 h-12 bg-contain bg-blue-700 rounded-full' />
                <p className='hidden sm:block'>Nama Akun</p>
                <i className='fa-solid fa-arrow-circle-down text-xl'></i>
            </div>
        </div>
        <Dropdown />
        {dropdown && <Backdrop backdrop={() => {
            document.getElementById('nav-dropdown').classList.toggle('-translate-y-52')
            setDropdown(false)
        }} />}
    </>
  )
}

const Dropdown = () => {
    return (
        <div>
            <div id='nav-dropdown' className='text-white text-center fixed w-screen transition-transform duration-200 -translate-y-52 z-[1]'>
                <ul className='flex flex-col [&>li]:border-b [&>li]:border-b-blue-700 [&>li]:p-3 '>
                    <li className='even:bg-blue-600 odd:bg-blue-700 hover:bg-blue-800 transition-colors'><a href="/">Beranda</a></li>
                    <li className='even:bg-blue-600 odd:bg-blue-700 hover:bg-blue-800 transition-colors'><a href="/rekapitulasi">Rekapitulasi</a></li>
                </ul>
            </div>
        </div>
    )
}

const Backdrop = (props) => {
    return (
        <div className='h-screen w-screen bg-black opacity-50 fixed transition-all duration-500' onClick={props.backdrop} />
    )
}
