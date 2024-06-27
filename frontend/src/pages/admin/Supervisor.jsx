import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import PropTypes from 'prop-types';
import {
  Table,
  Loader,
  ActionIcon,
  Tooltip,
  Modal,
  TextInput,
  Checkbox,
  Select,
  CheckIcon,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import LeftAngle from '../../assets/icons/LeftAngle';
import RightAngle from '../../assets/icons/RightAngle';
import EditIcon from '../../assets/icons/EditIcon';

// EditAssignment.propTypes = {
//   superId: PropTypes.number,
// };

// export function EditAssignment({ superId }) {
//   const [opened, { open, close }] = useDisclosure();
//   const [allTasks, setAllTasks] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
//   const [page, setPage] = useState(1);
//   const [allSupervisors, setAllSupervisors] = useState(null);

//   useEffect(() => {
//     getAllDepTasks();
//     getAllSupervisors();
//   }, [page, searchTerm]);

//   useEffect(() => {
//     setPage(1);
//   }, [searchTerm]);

//   const getAllDepTasks = async () => {
//     try {
//       const fetchAllTasks = await axios.post(
//         `${
//           import.meta.env.VITE_APP_EXPRESS_BASE_URL
//         }/getAllTasksForAllDepartments?page=${page}&pageSize=5`,
//         {
//           searchTerm: searchTerm,
//           superId: superId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setAllTasks(fetchAllTasks.data);
//       console.log('all tasks', fetchAllTasks.data);
//     } catch (error) {
//       console.error('fetch all tasks error', error);
//     }
//   };

//   const getAllSupervisors = async () => {
//     try {
//       const fetchAllSupervisors = await axios.get(
//         `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getAllSupervisors`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAllSupervisors(fetchAllSupervisors.data);
//       console.log('all supervisors', fetchAllSupervisors.data);
//     } catch (error) {
//       console.error('fetch all supervisors error', error);
//     }
//   };

//   const taskArray = allTasks
//     ? Object.values(allTasks).filter(
//         item =>
//           typeof item === 'object' && item !== null && !Array.isArray(item)
//       )
//     : null;

//   const totalPages = allTasks ? allTasks.totalPages : 0;

//   const rows = taskArray ? (
//     taskArray.map(task => (
//       <Table.Tr key={task && task.id}>
//         <Table.Td className="w-1/2">{task && task.task.desc}</Table.Td>
//         <Table.Td>{task && task.department.name}</Table.Td>
//         <Table.Td>{task && task.task.tag}</Table.Td>
//         <Table.Td>
//           {task && task.assigned === true ? (
//             // <Checkbox  />
//             <CheckIcon width="25" color="blue" />
//           ) : (
//             task && task.task.SupervisorTaskMapping[0].user.name
//           )}
//           {/* <Select
//             value={task.task.SupervisorTaskMapping[0].user.name}
//             data={allSupervisors.name}
//             placeholder="Select Supervisor"
//           /> */}
//         </Table.Td>
//       </Table.Tr>
//     ))
//   ) : (
//     <Table.Tr>
//       <Table.Td colSpan={4} className="text-center">
//         No tasks found
//       </Table.Td>
//     </Table.Tr>
//   );

//   return (
//     <>
//       <Tooltip label="Change Task Assignment" openDelay="700">
//         <ActionIcon color="green" size="xl" onClick={open}>
//           <EditIcon />
//         </ActionIcon>
//       </Tooltip>
//       <Modal
//         opened={opened}
//         onClose={close}
//         size="xl"
//         title="Change Task Assignment"
//         centered
//       >
//         <div className="flex flex-col justify-center rounded-lg ">
//           <div className="flex justify-between items-center space-x-20 mb-10">
//             <div className=" flex-grow">
//               <TextInput
//                 size="md"
//                 placeholder="Search"
//                 onChange={event => setSearchTerm(event.target.value)}
//               />
//             </div>
//             <div className="flex flex-grow justify-center items-center bg-gray-100 p-2 rounded-lg">
//               <ActionIcon
//                 onClick={() => (page - 1 !== 0 ? setPage(page - 1) : null)}
//                 disabled={page - 1 === 0}
//               >
//                 <LeftAngle />
//               </ActionIcon>
//               <span className="font-mono mr-2 ml-2">
//                 {page}/{totalPages}
//               </span>
//               <ActionIcon
//                 onClick={() => (page !== totalPages ? setPage(page + 1) : null)}
//                 disabled={page === totalPages}
//               >
//                 <RightAngle />
//               </ActionIcon>
//             </div>
//           </div>

//           <Table withTableBorder withColumnBorders>
//             <Table.Thead>
//               <Table.Tr>
//                 <Table.Th>Description</Table.Th>
//                 <Table.Th>Department</Table.Th>
//                 <Table.Th>Tag</Table.Th>
//                 <Table.Th className="w-1/12">Assign</Table.Th>
//               </Table.Tr>
//             </Table.Thead>
//             <Table.Tbody>{rows}</Table.Tbody>
//           </Table>
//         </div>
//       </Modal>
//     </>
//   );
// }

TaskTable.propTypes = {
  tasks: PropTypes.array,
  searchTerm: PropTypes.string,
};

export function TaskTable({ tasks, searchTerm }) {
  console.log('tasks in tastable', tasks);
  const rows = tasks ? (
    tasks.map(task => (
      <Table.Tr key={task.task.id}>
        <Table.Td>{task.task.desc}</Table.Td>
        <Table.Td>{task.department.name}</Table.Td>
        <Table.Td>{task.task.tag}</Table.Td>
      </Table.Tr>
    ))
  ) : (
    <Table.Tr>
      <Table.Td colSpan={3} className="text-center">
        No tasks found
      </Table.Td>
    </Table.Tr>
  );
  return (
    <div className="bg-white">
      <Table withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ textAlign: 'center' }}>Description</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Department</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Tag</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default function Supervisor() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState(null);
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, [searchTerm, page]);
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const fetchUser = await axios.get(
        `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/getUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchPaginatedTasks = await axios.post(
        `${
          import.meta.env.VITE_APP_EXPRESS_BASE_URL
        }/getAllTasksForSupervisor/${id}?page=${page}&pageSize=2`,
        {
          searchTerm: searchTerm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(fetchUser.data);
      setTotalPages(fetchPaginatedTasks.data.totalPages);
      setTasks(
        Object.values(fetchPaginatedTasks.data).filter(
          item => typeof item === 'object' && item !== null
        )
      );
      document.title = `${fetchUser.data.name}'s Tasks | TWCGateway`;
      console.log('supervisor', fetchUser.data);
      console.log('tasks', fetchPaginatedTasks.data);
    } catch (error) {
      console.error('fetch user error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {/* ----------- */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex justify-center bg-white bg-opacity-50 rounded-lg border-2 border-gray-100 p-2 ml-5 m-5">
          <div className="md:flex md:items-center md:space-x-5 md:space-y-1">
            <div className="text-2xl font-bold text-white">
              {user && user.name}
            </div>
            <div>{user && user.email}</div>
          </div>
        </div>
        <div>
          <SearchBar
            setSearchTerm={setSearchTerm}
            // leftComp1={<EditAssignment superId={user && user.id} />}
          />
        </div>
      </div>
      {/* ----------- */}
      <div className="flex-col bg-white bg-opacity-50 rounded-lg border-2 border-gray-100 p-2 ml-5 m-5 md:flex">
        <div className="md:flex md:justify-center">
          <div className="md:w-3/4 border-white border-2 rounded-lg p-2 bg-blue-100 font-mono ">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <TaskTable tasks={tasks} searchTerm={searchTerm} />
            )}
          </div>
        </div>
        <div className="flex justify-center mt-3  items-center bg-white bg-opacity-50 p-2 ">
          <ActionIcon
            onClick={() => (page - 1 !== 0 ? setPage(page - 1) : null)}
            disabled={page - 1 === 0}
          >
            <LeftAngle />
          </ActionIcon>
          <span className="font-mono mr-2 ml-2">
            {page}/{totalPages}
          </span>
          <ActionIcon
            onClick={() => (page !== totalPages ? setPage(page + 1) : null)}
            disabled={page === totalPages}
          >
            <RightAngle />
          </ActionIcon>
        </div>
      </div>
    </>
  );
}
