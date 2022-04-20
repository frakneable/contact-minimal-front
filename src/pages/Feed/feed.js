import React, { useState, useEffect } from 'react'
import HeaderMain from '../../components/HeaderMain/HeaderMain'
import More from '../../images/more.svg'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './feed.css'

function Feed() {

    const [ people, setPeople ] = useState([])

    useEffect(() => {
        axios.get('https://localhost:7298/people')
        .then((response) => {
            setPeople(response.data)
        })
        .catch(() => {
            console.log('error')
        })
    }, [])

    function deletePerson(id) {
        axios.delete(`https://localhost:7298/person/${id}`)

        setPeople(people.filter(person => person.id !== id))
    }

    return(
        <div>
            <HeaderMain type="person"/>

            <main>
                <div className='cards'>
                    { people.map((person, key) => {
                        return(
                            <div key={key} className='card'>
                                <header>
                                    <h2>{person.name}</h2>
                                    <img src={More} alt="more"/>
                                </header>
                                <div className='line'></div>
                                <div className='btns'>
                                    <div className='btn-edit'>
                                        <Link to={{ pathname: `/edit/${person.id}` }}>
                                            <button>Edit</button>
                                        </Link>
                                    </div>
                                    <div className='btn-contacts'>
                                        <Link to={{ pathname: `person/${person.id}/contacts` }}>
                                            <button>Contacts</button>
                                        </Link>
                                    </div>
                                    <div className='btn-delete'>
                                        <button onClick={() => deletePerson(person.id)}>Delete</button>
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

export default Feed