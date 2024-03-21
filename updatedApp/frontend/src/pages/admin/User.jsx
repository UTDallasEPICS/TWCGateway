import Navbar from '@/components/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Checkbox } from '@mantine/core';


export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getUser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        setTasks(response.data.OnboardingEmployeeTaskMapping)
        console.log('response', response.data);
        console.log('tasks', response.data.OnboardingEmployeeTaskMapping)
      } catch (error) {
        console.error('Error in fetching user in User page', error);
      }
    };
    getUser();
  }, [id]);

  // const rows =
  //   tasks.length > 0 ? (
  //     tasks
  //       .map((emp) => (
  //         <Table.
  //       ))
  //   ) : (
  //     <Table.Tr>
  //       <Table.Td
  //         colSpan={3}
  //         className="text-center"
  //       >
  //         No Tasks found
  //       </Table.Td>
  //     </Table.Tr>
  //   );

  return (
    <div>
      <Navbar />
    </div>
  );
}
