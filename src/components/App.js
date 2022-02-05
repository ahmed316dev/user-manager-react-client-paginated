import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header'
import UsersList from './UsersList'
import CreateUser from './CreateUser'
import EditUser from './EditUser'

const App = () => {
  return (
    <div className="text-white ">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<UsersList />} />
          <Route path="/create" exact element={<CreateUser />} />
          <Route path="/edit/:id" exact element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
