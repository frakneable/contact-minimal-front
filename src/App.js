import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Person from './pages/Person/person'
import Edit from './pages/Edit/edit'
import Feed from './pages/Feed/feed'
import Contacts from './pages/Contacts/contacts'
import EditContact from './pages/Contacts/editContact'
import Contact from './pages/Contacts/contact'

function App() {
  return(
    <Router>
      <Routes>
        <Route path='/person' element={<Person/>} />
        <Route path='/person/:personId/contact' element={<Contact/>} />
        <Route path='/edit/:id' element={<Edit/>} />
        <Route path='/person/:id/contacts' element={<Contacts/>} />
        <Route path='/editContact/:id' element={<EditContact/>} />
        <Route path='/' element={<Feed/>} />
      </Routes>
    </Router>
  )
}

export default App;
