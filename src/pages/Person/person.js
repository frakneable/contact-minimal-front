import React from 'react';
import Header from '../../components/Header/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate  } from 'react-router-dom'
import * as yup from 'yup'
import api from '../../api/index';
import './person.css'

const validatePerson = yup.object({
    name: yup.string().required("Name is required")
});

function postPerson(data, navigate){
    const request = { name: data.name, contacts: [{ type: data.contactType, value: data.contactValue }] }
    api.post(`/person`, request).then(() => {
        navigate('/', { replace: true })
    })
    .catch((e) => {
        console.error(e)
    })
}

function Person() {
    let navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validatePerson)
    })

    const addPerson = data => postPerson(data, navigate)

    return(
        <div>
            <Header/>

            <main>
                <div className='card-person'>
                    <h1>Create person</h1>
                    <div className='line-person'></div>
                    <div className='card-body-person'>
                        <form onSubmit={handleSubmit(addPerson)}>
                            <div className='fields'>
                                <label>Name</label>
                                <input type='text' name='name' {...register('name')} ></input>
                                <p className='error-message'>{ errors.name?.message }</p>
                            </div>

                            <div className='btn-person'>
                                <button type='submit'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Person