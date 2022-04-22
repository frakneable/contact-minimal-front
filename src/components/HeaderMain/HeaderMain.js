import React from 'react'
import { Link } from 'react-router-dom'
import '../HeaderMain/headerMain.css'

function HeaderMain(props) {
    console.log(props)
    return (
        <header>
            <div className='container'>
                <Link to={`/`}>
                    <div className='logo'>
                        <h1>Contact Manager</h1>
                    </div>
                </Link>
                <div className='btn-new'>
                    {props.type !== 'contact'
                    ? <Link to={`/${props.type}`}>
                        <button>Add new {props.type}</button>
                    </Link>
                    : <Link to={`/person/${props.personId}/${props.type}`}>
                        <button>Add new {props.type}</button>
                    </Link>}
                </div>
            </div>
        </header>
    )
}

export default HeaderMain