import { useEffect, useState } from 'react';
import { Tooltip, ActionIcon, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import UserIcon from '@/assets/icons/UserIcon';

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth0();
  const [loggedinUser, setLoggedinUser] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_APP_EXPRESS_BASE_URL}/auth`,
            { email: user.email }
          );
          setLoggedinUser(response.data);
        } catch (error) {
          console.error(error);
          console.error('Errored out in LoginRedirect -> fetchUser');
        }
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Tooltip
        label="Profile"
        openDelay="700"
      >
        <ActionIcon
          variant="filled"
          size="xl"
          onClick={open}
        >
          <UserIcon />
        </ActionIcon>
      </Tooltip>
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
            <span className="ml-2">{loggedinUser.name}</span>
          </div>
          <div>
            <span className="font-bold">Email</span>
            <span className="ml-2 font-bold">-</span>
            <span className="ml-2">{loggedinUser.email}</span>
          </div>
          <div>
            <span className="font-bold">Role</span>
            <span className="ml-4 font-bold">-</span>
            <span className="ml-2">
              {loggedinUser.role &&
                loggedinUser.role.substring(0, 1) +
                  loggedinUser.role.substring(1).toLowerCase()}
            </span>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            variant="filled"
            color="red"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </Modal>
    </>
  );
}
