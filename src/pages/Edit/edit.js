import React, { useEffect } from 'react';
import Header from '../../components/Header/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import * as yup from 'yup'

const validatePerson = yup.object({
    name: yup.string().required("Name is required")
})

function putPerson(data, id, navigate){
    const request = { name: data.name, contacts: [{ type: data.contactType, value: data.contactValue }] }
    axios.put(`https://localhost:7298/person/${id}`, request).then(() => {
        navigate('/', { replace: true })
    })
    .catch((e) => {
        console.log(e)
    })
}

function Edit() {
    const { id } = useParams()
    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validatePerson)
    })

    const addPerson = data => putPerson(data, id, navigate)

    useEffect(() => {
        axios.get(`https://localhost:7298/person/${id}`)
        .then((response) => {
            reset(response.data)
        })
    }, [id, reset])

    return(
        <div>
            <Header/>
            <main>
                <div className='card-person'>
                    <h1>Edit person</h1>
                    <div className='line-person'></div>
                    <div className='card-body-person'>
                        <form onSubmit={handleSubmit(addPerson)}>
                            <div className='fields'>
                                <label>Name</label>
                                <input type='text' name='name' {...register('name')} ></input>
                                <p className='error-message'>{ errors.name?.message }</p>
                            </div>

                            <div className='btn-person'>
                                <button type='submit'>Edit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Edit