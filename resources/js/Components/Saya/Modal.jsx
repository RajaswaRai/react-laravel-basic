import axios from 'axios'
import React from 'react'

const Modal = (props) => {
  return (
    <div className='fixed z-10 flex justify-center items-center top-0 transition-opacity opacity-100'>
        <div className='bg-black w-screen h-screen opacity-30' onClick={props.backdrop} />
        <div className='bg-white border absolute p-3 rounded-md flex flex-col gap-5'>
            {props.body}
        </div>
    </div>
  )
}

export default Modal
