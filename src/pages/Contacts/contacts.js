import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HeaderMain from '../../components/HeaderMain/HeaderMain'
import More from '../../images/more.svg'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Contacts() {
    const { id } = useParams()
    const [ contacts, setContacts ] = useState([])

    useEffect(() => {
        axios.get(`https://localhost:7298/person/${id}`)
        .then((response) => {
            setContacts(response.data.contacts)
        })
        .catch(() => {
            console.log('error')
        })
    }, [id])

    function deleteContact(id) {
        axios.delete(`https://localhost:7298/contact/${id}`)

        setContacts(contacts.filter(contact => contact.id !== id))
    }

    function getType(typeNumber) {
        switch (typeNumber) {
            case 0: 
                return "Email"
            case 1:
                return "WhatsApp"
            case 2:
                return "Phone"
            default:
                return "None"
        }
    }

    return (
        <div>
        <HeaderMain type="contact" personId={id}/>

            <main>
                <div className='cards'>
                    { contacts.map((contact, key) => {
                        return(
                            <div key={key} className='card'>
                                <header>
                                    <h2>{getType(contact.type)}</h2>
                                    <img src={More} alt="more"/>
                                </header>
                                <div className='line'></div>
                                <p>{contact.value}</p>
                                <div className='btns'>
                                    <div className='btn-edit'>
                                        <Link to={{ pathname: `/editContact/${contact.id}` }}>
                                            <button>Edit</button>
                                        </Link>
                                    </div>
                                    <div className='btn-delete'>
                                        <button onClick={() => deleteContact(contact.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}

export default Contacts