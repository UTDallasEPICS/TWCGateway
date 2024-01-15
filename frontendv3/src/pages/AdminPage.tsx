import React from 'react'
import Navbar from '../components/Navbar'

const AdminPage: React.FC = () => {
  return (
    <div className="flex">
      <div>
        <Navbar />
      </div>
      <div>
        <h1 className="text-2xl text-center">Admin Page</h1>
      </div>
    </div>
  )
}

export default AdminPage