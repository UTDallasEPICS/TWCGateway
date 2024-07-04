import { ActionIcon, Tooltip } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import UsersIcon from '@/assets/icons/UsersIcon';
import DepartmentsIcon from '@/assets/icons/DepartmentsIcon';
import ArchiveIcon from '@/assets/icons/ArchiveIcon';
import Profile from '@/components/Profile';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const buttonClass = routes =>
    routes.includes(location.pathname) ? 'violet' : 'blue';
  return (
    <div className="flex p-2 m-5 bg-white bg-opacity-70 rounded-lg justify-between ">
      <Profile />
      <div className="space-x-3">
        <Tooltip label="Users Page" openDelay="700">
          <ActionIcon
            variant="filled"
            size="xl"
            color={buttonClass(['/admin/users', '/admin/user'])}
            onClick={() => {
              navigate('/admin/users');
            }}
          >
            <UsersIcon />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Departments Page" openDelay="700">
          <ActionIcon
            variant="filled"
            size="xl"
            color={buttonClass(['/admin/departments', '/admin/department'])}
            onClick={() => {
              navigate('/admin/departments');
            }}
          >
            <DepartmentsIcon />
          </ActionIcon>
        </Tooltip>
      </div>
      <Tooltip
        // label="Archive"
        label="Archive feature under construction"
        openDelay="700"
      >
        <ActionIcon
          disabled={true}
          variant="filled"
          size="xl"
          color={buttonClass('/admin/archive')}
          onClick={() => {
            navigate('/admin/archive');
          }}
        >
          <ArchiveIcon />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}
