import Navbar from '@/Components/Saya/Navbar'
import { Head } from '@inertiajs/react'

export default function Home(props) {
  return(
      <div className='bg-slate-200 min-h-screen'>
        <Head title={props.title} /> 
        <Navbar />
        <p>Ini Beranda</p>
      </div>
  )
}