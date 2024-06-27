import { Button, Avatar, Table, Tabs } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployeeHomepage() {
  const { user, logout } = useAuth0();
  const [localUser, setLocalUser] = useState(null);
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;
  const [userTasks, setUserTasks] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/onboardingEmployee/getUserByEmail`,
          {
            email: user.email,
          }
        );
        console.log('response.data', response.data);
        console.log(
          'response.data.OnboardingEmployeeTaskMapping',
          response.data.OnboardingEmployeeTaskMapping
        );
        setLocalUser(response.data);
        setUserTasks(response.data.OnboardingEmployeeTaskMapping);
      } catch (error) {
        console.error(error);
        console.error('Errored out in EmployeeHomepage -> getUser');
      }
    };
    if (user) {
      getUser();
    }
  }, [user]);

  const tags = [...new Set(userTasks && userTasks.map(task => task.task.tag))];
  // console.log('tags', tags);

  const getFormattedDate = date => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // timeZoneName: 'short',
    });
    console.log('formattedDate', formattedDate);
    return formattedDate;
  };

  return (
    <div>
      <div className="flex flex-col m-3 p-3 rounded-lg bg-white bg-opacity-50 relative">
        <div className="flex">
          <Avatar
            src={user && user.picture}
            alt={localUser && localUser.name}
            size="lg"
          />
          <div className="absolute right-10 mt-3">
            <Button color="red" onClick={() => logout()}>
              Log out
            </Button>
          </div>
          <div className="ml-3 overflow-auto">
            <h1 className="text-2xl font-bold">
              {localUser && localUser.name}
            </h1>
            <p className="text-gray-500">{localUser && localUser.email}</p>
          </div>
        </div>
      </div>
      <div className="flex bg-white bg-opacity-50 m-3 p-3 rounded-lg justify-center items-center">
        <div className="hidden md:block text-white p-2">Search</div>
        <input
          className="w-full md:w-1/2 rounded-lg p-1 border-2 hover:border-pink-300 focus:border-pink-500 focus:outline-none "
          onChange={e => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
      <div className="flex flex-col m-3 p-3 rounded-lg bg-white bg-opacity-50">
        <div className="text-2xl text-white font-mono">
          {localUser && localUser.DepartmentUserMapping.department.name}
        </div>
        <div className="bg-white bg-opacity-0  p-2 rounded-lg md:flex md:justify-center">
          <div className="md:w-3/4 border-white border-2 rounded-lg p-2 bg-blue-100 font-mono">
            <Tabs
              defaultValue={tags && tags.length > 0 ? `${tags[0]}` : ''}
              variant="pills"
              color="violet"
              radius="xl"
            >
              <Tabs.List grow>
                {tags &&
                  tags.length > 0 &&
                  tags.map(tag => <Tabs.Tab value={tag}>{tag}</Tabs.Tab>)}
              </Tabs.List>
              {tags &&
                tags.length > 0 &&
                tags.map(tag => (
                  <>
                    {/* <Tabs.Tab value={tag}>{tag}</Tabs.Tab> */}
                    <Tabs.Panel value={tag}>
                      <div className="bg-white mt-3">
                        <Table withColumnBorders withRowBorders>
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th>Completed?</Table.Th>
                              <Table.Th>Date Completed</Table.Th>
                              <Table.Th>Description</Table.Th>
                              <Table.Th>Supervisor</Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody className="text-center">
                            {userTasks &&
                              userTasks
                                .filter(task => task.task.tag === tag)
                                .map(task => (
                                  <Table.Tr>
                                    <Table.Td>
                                      {task.taskCompleted ? 'Yes' : 'No'}
                                    </Table.Td>
                                    <Table.Td>
                                      {task.dateCompleted
                                        ? getFormattedDate(task.dateCompleted)
                                        : 'N/A'}
                                    </Table.Td>
                                    <Table.Td className="text-left">
                                      {task.task.desc}
                                    </Table.Td>
                                    <Table.Td>
                                      {
                                        task.task.SupervisorTaskMapping[0].user
                                          .name
                                      }
                                    </Table.Td>
                                  </Table.Tr>
                                ))}
                          </Table.Tbody>
                        </Table>
                      </div>
                    </Tabs.Panel>
                  </>
                ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
