import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { ActionIcon, Modal, Tooltip, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserIcon from '../../assets/icons/UserIcon';

export default function SupervisorHomepage() {
  const { user, logout } = useAuth0();
  const [localUser, setLocalUser] = useState(null);
  const [opened, { open, close }] = useDisclosure();

  useEffect(() => {
    const getSupervisor = async () => {
      try {
        const res = await axios.post(
          `${
            import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/supervisor/getUserByEmail`,
          {
            email: user.email,
          }
        );
        console.log('res.data: ', res.data);
        setLocalUser(res.data);
      } catch (error) {
        console.error(error);
        console.error('Errored out in SupervisorHomepage -> getSupervisor');
      }
    };
    if (user) {
      getSupervisor();
    }
  }, [user]);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Profile"
        centered
        size="auto"
      >
        <div className="mt-4 flex justify-center">
          {user && (
            <img
              className="h-20 w-20 rounded-full"
              src={user.picture}
              alt={'Profile Picture'}
            />
          )}
        </div>
        <div className="mt-4 flex-col">
          <div>
            <span className="font-bold">Name</span>
            <span className="ml-1 font-bold">-</span>
            <span className="ml-2">{localUser && localUser.name}</span>
          </div>
          <div>
            <span className="font-bold">Email</span>
            <span className="ml-2 font-bold">-</span>
            <span className="ml-2">{localUser && localUser.email}</span>
          </div>
          <div>
            <span className="font-bold">Role</span>
            <span className="ml-4 font-bold">-</span>
            <span className="ml-2">
              {localUser &&
                localUser.role.substring(0, 1) +
                  localUser.role.substring(1).toLowerCase()}
            </span>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="filled" color="red" onClick={logout}>
            Logout
          </Button>
        </div>
      </Modal>
      <div className="flex bg-white bg-opacity-50 rounded-lg p-3 m-3">
        <Tooltip label="Profile" openDelay={700}>
          <ActionIcon size="xl" onClick={open}>
            <UserIcon />
          </ActionIcon>
        </Tooltip>
      </div>
      <div className="flex p-3 m-3 bg-white bg-opacity-50 rounded-lg">
        <details className="flex bg-white p-2 m-2 rounded-lg">
          <summary className="">Supervisor Homepage</summary>
          <p className="text-lg">adfadf</p>
        </details>
      </div>
    </div>
  );
}
