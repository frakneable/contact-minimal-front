import React, { useState } from 'react';
import Header from '../../components/Header/Header'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'
import './contact.css'

const validateContact = yup.object({
    type: yup.string().required("Contact type is required"),
    value: yup.string().required("Value is required")
})

function postContact(data, id, navigate){
    const request = { type: parseInt(data.type), value: data.value }
    axios.post(`https://minimalcontactmanager.azurewebsites.net/person/${id}/contact`, request).then(() => {
        navigate('/', { replace: true })
    })
    .catch((e) => {
        console.error(e)
    })
}

function Contact() {
    const { personId } = useParams()
    let navigate = useNavigate()

    const [ contactType, setContactType ] = useState(0)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validateContact)
    })

    const addContact = data => postContact(data, personId, navigate)

    return(
        <div>
            <Header/>

            <main>
                <div className='card-contact'>
                    <h1>Create contact</h1>
                    <div className='line-contact'></div>
                    <div className='card-body-contact'>
                        <form onSubmit={handleSubmit(addContact)}>
                            <div className='fields'>
                                <label>Type</label>
                                <select
                                    name='type'
                                    {...register('type')}
                                    value={contactType}
                                    onChange={(e) => {
                                        const selectedValue = e.target.value;
                                        setContactType(selectedValue)
                                }}>
                                    <option value={0}>Email</option>
                                    <option value={1}>WhatsApp</option>
                                    <option value={2}>Phone</option>
                                </select>
                                <p className='error-message'>{ errors.name?.message }</p>
                            </div>
                            <div className='fields'>
                                <label>Value</label>
                                <input type='text' name='value' {...register('value')} ></input>
                                <p className='error-message'>{ errors.value?.message }</p>
                            </div>

                            <div className='btn-contact'>
                                <button type='submit'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Contact