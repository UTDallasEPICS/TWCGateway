import React from 'react'
import Navbar from '../components/Navbar'

const AdminPage = () => {
  return (
    <div className="flex">
      <div className="">
        <Navbar />
      </div>
      <div className="flex-grow bg-gray-100 p-4">
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Replace with your data */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  John Doe
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  Admin
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  john.doe@example.com
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminPage