import Modal from '@/Components/Modal'
import { Head } from '@inertiajs/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Detail(props) {
    let [dataUser, setDataUser] = useState([])
    let [modalEdit, setModalEdit] = useState(false)
    
    const detailUser = async () => {
        return await axios.get(`http://127.0.0.1:8000/api/get/users?id=${props.id}`)
        .then(res => {
            setDataUser(res.data)
            setEditName(res.data.name)
            seteditJK(res.data.jenis_kelamin)
            setEditKelas(res.data.kelas_id)
            
            console.log('res: ', res)
        })
        .catch(err => console.log('err: ', err))
    }

    useEffect(() => {
        detailUser()
    }, [])

    let [editName, setEditName] = useState('')
    let [editJK, seteditJK] = useState('')
    let [editKelas, setEditKelas] = useState('')
    
  return (
    <div className='bg-slate-200 min-h-screen'>
        <Head title={props.title} />
        {createPortal(<Modal backdrop={() => {setModalEdit(false)}} show={modalEdit}  children={() => {
            return(
                <>
                    <div className='bg-white p-3'>
                        <p>Form Edit</p>
                        <hr />
                        <div className='flex flex-col gap-5'>

                            <div>
                                <label htmlFor="name">Nama Lengkap</label>
                                <input className='rounded-md w-full' type="text" id="name" value={editName} onChange={(e) => {
                                    setEditName(e.target.value)
                                    console.log(e.target.value);
                                }} />
                            </div>
                            <div>
                                <label htmlFor="jk">Jenis Kelamin</label>
                                <select className='w-full rounded-md' id="jk" 
                                defaultValue={editJK}
                                onChange={(e) => {
                                    seteditJK(e.target.value)
                                    console.log(e.target.value);
                                }}>
                                    <option value="lk">Laki-laki</option>
                                    <option value="pr">Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="kelas">Kelas ID</label>
                                <select className='w-full rounded-md' id="kelas" 
                                defaultValue={editKelas}
                                onChange={(e) => {
                                    setEditKelas(e.target.value)
                                    console.log(e.target.value);
                                }}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>

                            <div className='flex gap-3 justify-end'>
                                <button className='bg-yellow-400 p-1 rounded-md' onClick={async () => {
                                    const data = {
                                            editName,
                                            editJK,
                                            editKelas
                                        }

                                        console.log('data input: ', data);

                                    // return console.log(data);
                                    return await axios.patch(`http://localhost:8000/api/patch/users/${dataUser.id}`, data)
                                    .then(res => {
                                        setEditName(editName)
                                        seteditJK(editJK)
                                        setEditKelas(editKelas)
                                        setModalEdit(false)
                                        console.log('res patch: ', res);
                                        detailUser()
                                    })
                                    .catch(err => console.log('err: ', err))
                                }}>Edit <i className='fa-solid fa-pen-to-square'></i></button>
                                <button className='bg-red-500 p-1 rounded-md' onClick={() => {
                                    setModalEdit(!modalEdit)
                                }}>Close</button>
                            </div>
                        </div>
                        
                    </div>
                </>
            )
        }} body={
            'a'
        } />, document.body)}

        <p className='text-3xl font-bold text-center p-5'>Detail Murid</p>
        <div className='bg-white rounded-md border p-3 m-5'>
            <div className='flex gap-5'>
                <button className='bg-cyan-700 text-white p-1 rounded-md' onClick={() => {
                    location.replace('/rekapitulasi')
                }}>{'<< Kembali'}</button>
                <button className='bg-yellow-400 p-1 rounded-md w-10' onClick={() => {
                    setModalEdit(true)
                }}><i className='fa-solid fa-pen-to-square'></i></button>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>Nama</td>
                        <td>:</td>
                        <td>{dataUser.name}</td>
                    </tr>
                    <tr>
                        <td>Jenis Kelamin</td>
                        <td>:</td>
                        <td>{dataUser.jenis_kelamin}</td>
                    </tr>
                    <tr>
                        <td>Kelas</td>
                        <td>:</td>
                        <td>{dataUser.kelas_id}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}
