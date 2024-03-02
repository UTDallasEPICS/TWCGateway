import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
// import Table from '../components/Table';
import Section from '../components/Section';
import TableRowSkeleton from '../components/TableRowSkeleton';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '../components/Table';


const AdminDepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5010/departments').then(response => {
      setDepartments(response.data);
    });
    setIsLoading(false);
  }, []);

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    (document.title = 'TWCGateway | Departments'),
    (
      <div>
        <div className="flex">
          <Navbar />
        </div>
        {/*Search Bar*/}
        <Section extraStyling="">
          <input
            className="w-full border-2 border-gray-300 focus:outline-none focus:border-warrenBlue rounded"
            type="text"
            placeholder=" Search Departments"
            onFocus={e => e.target.select()}
            onChange={handleSearchTermChange}
          />
        </Section>
        <Section title={''}>
          <div style={{ overflowX: 'auto' }}>
            <Table
              className="bg-white bg-opacity-50 rounded-lg"
            >
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Edit</TableHead>
                  <TableHead>Archive</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRowSkeleton columns={3} />
                ) : (
                  departments.map(department => (
                    <TableRow key={department.id}>
                      <TableCell>{department.name}</TableCell>
                      <TableCell>
                        <a href={`/admin/departments/edit/${department.id}`}>
                          Edit
                        </a>
                      </TableCell>
                      <TableCell>
                        <a href={`/admin/departments/archive/${department.id}`}>
                          Archive
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Section>
      </div>
    )
  );
};

export default AdminDepartmentsPage;
