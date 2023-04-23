import Modal from '@/Components/Modal'
import Navbar from '@/Components/Saya/Navbar'
import { Head } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Rekapitulasi(props) {
  let [dataUsers, setDataUsers] = useState([])
  let [searchNama, setSearchNama] = useState('')

  useEffect(() => {
    getUsers()
  },[])

  const getUsers = async (param = '') => {
    return await axios.get(`http://localhost:8000/api/get/users?${param}`)
      .then(res => {
        console.log("get res: ", res);
        setDataUsers(res.data)
        setEditName(res.data.name)
        seteditJK(res.data.jenis_kelamin)
        setEditKelas(res.data.kelas_id)
      })
      .catch(err => console.log('err: ', err))
  }

  let [showTambahModal, setShowTambahModal] = useState(false)

    let [postName, setPostName] = useState('')
    let [postJK, setPostJK] = useState('')
    let [postKelas, setPostKelas] = useState('')
  return (
    <div className='bg-slate-200 min-h-screen'>
        <Head title={props.title} />
        <Navbar />


        <div className='p-5'>
            <h3 className='text-2xl font-bold text-center'>Daftar Murid</h3>
            <hr className='border-t border-slate-500' />
        </div>
      
        <div className='lg:px-52 px-5 pb-5'>
            <div className='flex gap-5'>
                <p className='font-bold text-2xl'>Kelas: </p>
                <button className='p-1 bg-green-500 rounded-md text-white' onClick={() => {
                    setShowTambahModal(!showTambahModal)
                }}>Tambah +</button>
                {createPortal( <Modal show={showTambahModal}
                    backdrop={() => {
                        setShowTambahModal(false)
                    }}
                    children={() => {
                        return(
                            <>
                                <div className='p-3'>
                                    <h2>Form Tambah</h2>
                                    <hr />

                                    <div className='flex flex-col gap-5'>
                                        <div>
                                            <label htmlFor="name">Nama Lengkap</label>
                                            <input className='w-full rounded-md' type="text" id="name" onChange={(e) => {
                                                setPostName(e.target.value)
                                            }} />
                                        </div>
                                        <div>
                                            <label htmlFor="jk">Jenis Kelamin</label>
                                            <select className='w-full rounded-md' id="jk" onChange={(e) =>{
                                                setPostJK(e.target.value)
                                            }}>
                                                <option value="">- PILIH -</option>
                                                <option value="lk">Laki-laki</option>
                                                <option value="pr">Perempuan</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="kelas">Kelas</label>
                                            <select className='w-full rounded-md' id="kelas" onChange={(e) =>{
                                                setPostKelas(e.target.value)
                                            }}>
                                                <option value="">- PILIH -</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                            </select>
                                        </div>
                                        <div className='flex gap-3 justify-end'>
                                            <button className='w-16 py-1 p  x-3 bg-red-500 text-white rounded-md' onClick={() => {
                                                setShowTambahModal(false)
                                            }}>Tidak</button>
                                            <button className='w-16 py-1 px-3 bg-green-500 text-white rounded-md' onClick={async () => {
                                                const data = {
                                                    postName,
                                                    postJK,
                                                    postKelas
                                                }

                                                 console.log(data);

                                                return await axios.post(`http://127.0.0.1:8000/api/post/users`, data)
                                                .then(res => {
                                                    console.log('res post: ', res)
                                                    setShowTambahModal(false)
                                                    getUsers()
                                                })
                                                .catch(err => console.log(err))
                                            }}>Ya</button>
                                        </div>     
                                    </div>

                                </div>
                            </>
                        )
                    }}
                    
                />, document.body )}
            </div>
            <div className='my-2 flex gap-2'>
                <input type="text" value={searchNama} onKeyUp={() => {
                        document.getElementById('btnSearch').click()
                }} onChange={(e) => {
                    console.log(searchNama)
                    setSearchNama(e.target.value)
                }} placeholder='Search...' className='rounded-md w-full' />

                <button id='btnSearch' onClick={() => {
                    getUsers(`nama=${searchNama}`)                    
                }} className='bg-emerald-500 rounded-md text-white w-10 h-10 hover:bg-emerald-600 active:scale-75'><i className='fa-solid fa-magnifying-glass'></i></button>
            </div>

            <TabelSiswa getUser={getUsers} kelas={'RPL1'} data={dataUsers} />        
        </div>


        
    </div>
  )
}

const TabelSiswa = (props) => {
  const dataUsers = props.data
  return (
    <table className='table-fixed bg-white border w-full [&>*]:border-2 [&>*]:border-slate-500'>
        <thead className='hidden sm:table-header-group bg-slate-500 text-white [&>*]:p-2'>
        <tr>
            <th className='w-3'>No</th>
            <th className='w-20'>Nama</th>
            <th className='w-6'>Jenis Kelamin</th>
            <th className='w-5'>Kelas</th>
            <th className='w-5'>Aksi</th>
        </tr>
        </thead>

        <tbody className='[&>tr>td]:border-2 [&>tr>td]:border-slate-300 [&>tr>*]:p-2 text-center '>
        
        {
            dataUsers.map((user, index) => {
            return (
                <TableData getUser={props.getUser} key={index} index={index} data={user} />
            )
            })
        }
            
        </tbody>
    </table>
  )
}

const TableData = (props) => {
    const user = props.data
    let [showModal, setShowModal] = useState(false)

    function jk(jk){
        if (jk === 'lk') {
          return 'laki-laki' 
        }
        return 'perempuan'
      }

    return (
        <>
            <tr className='items-center even:bg-blue-100'>
                <td className='sm:table-cell hidden'>{props.index+1}</td>
                <td className='sm:table-cell hidden'><p className='text-left'>{user.name}</p></td>
                <td className='sm:table-cell hidden'><p>{jk(user.jenis_kelamin)}</p></td>
                <td className='sm:table-cell hidden'><p>{user.kelas_id}</p></td>
                <td className='sm:table-cell hidden'>
                    <div className='flex gap-3 justify-center'>
                    <a href={`rekapitulasi/detail/${user.id}`} className='bg-sky-500 text-white p-2 rounded-md w-10 h-10'><i className='fa-solid fa-info-circle'></i></a>
                    <button className='bg-red-500 text-white p-2 rounded-md w-10 h-10'
                    onClick={() => {
                        console.log('hapus data: ', user.name);
                        setShowModal(!showModal)
                    }}
                    ><i className='fa-solid fa-trash-can'></i></button>
                    </div>
                </td>

                {/* Mobile */}
                <td colSpan={5} className='border border-slate-500 table-cell sm:hidden'>
                    <div className='flex items-center justify-around'>
                    <p className='bg-gray-500 rounded-full text-white w-10 p-2'>{props.index+1}</p>
                    <div>
                    <table className='table-fixed [&>tbody>tr>td]:text-left [&>tbody>tr>td]:align-top' >
                        <tbody>
                        <tr className='w-5 p-0 m-0 [&>td]:p-1'>
                            <td>Nama</td>
                            <td>:</td>
                            <td><p className='w-40 break-words'>{user.name}</p></td>
                        </tr>
                        <tr>
                            <td>JK</td>
                            <td>:</td>
                            <td><p>{jk(user.jenis_kelamin)}</p></td>
                        </tr>
                        <tr>
                            <td>Kelas</td>
                            <td>:</td>
                            <td><p>{user.kelas_id}</p></td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                    <div className='flex flex-col gap-1 items-center'>
                        <button className='bg-sky-500 text-white p-2 rounded-md w-10 h-10'><i className='fa-solid fa-info-circle'></i></button>
                        <button className='bg-red-500 text-white p-2 rounded-md w-10 h-10' 
                            onClick={() => {
                                console.log('hapus data: ', user.name);
                                setShowModal(!showModal)
                            }}
                        ><i className='fa-solid fa-trash-can'></i></button>
                    </div>
                    </div>
                </td>
            </tr>


            {createPortal(
            <Modal show={showModal}
                backdrop={() => {
                    setShowModal(false)
                }}
                
                children={() => {
                    return(
                        <div className='p-3'>
                            <p>Anda yakin ingin menghapus data:<br/> <b>{user.name}</b>?</p>
            
                            <div className='flex gap-3 justify-end'>
                                <button className='w-16 py-1 p  x-3 bg-red-500 text-white rounded-md' onClick={() => {
                                    setShowModal(false)
                                }}>Tidak</button>
                                <button className='w-16 py-1 px-3 bg-green-500 text-white rounded-md' onClick={async () => {
                                    return await axios.delete(`http://127.0.0.1:8000/api/delete/users/${user.id}`)
                                    .then(res => {
                                        console.log('Berhasil delete: ', res)
                                        setShowModal(false)
                                        props.getUser()
                                    })
                                    .catch(err => console.log(err))
                                }}>Ya</button>
                            </div>     
                        </div>
                    )
                }}

                /> , document.body)}
        </>
    )
}