import React from 'react'
import { Link } from 'react-router-dom'
import Back from '../../images/back-button.svg'
// import './header.css'

function Header() {
    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <img src={Back} style={{width: '50px'}} alt="back-button"/>
                </Link>
            </div>
        </header>
    )
}

export default Header