import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActionIcon, Tooltip, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import RestoreIcon from '@/assets/icons/RestoreIcon';
import axios from 'axios';
import OnboardingEmployees from '../../components/OnboardingEmployees';
import Supervisors from '../../components/Supervisors';
import Admins from '../../components/Admins';
import SearchBar from '@/components/SearchBar';

UnArchiveSelectedUsers.propTypes = {
  allSelectedRows: PropTypes.array.isRequired,
  setAllSelectedRows: PropTypes.func,
  setReloadData: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export function UnArchiveSelectedUsers({
  allSelectedRows,
  setAllSelectedRows,
  setReloadData,
  token,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure();

  const handleClick = async () => {
    for (let i = 0; i < allSelectedRows.length; i++) {
      try {
        setIsLoading(true);
        await axios.patch(
          `${
            import.meta.env.VITE_APP_EXPRESS_BASE_URL
          }/unArchiveUsers/`,
          {allSelectedUsers: allSelectedRows},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLoading(false);
        setReloadData(true);
      } catch (error) {
        console.error('errored archiving users', error);
      }
      setAllSelectedRows([]);
      close();
    }
  };

  return (
    <div>
      <Tooltip
        label={allSelectedRows.length === 0 ? 'Select Rows' : 'Restore'}
        openDelay="700"
      >
        <ActionIcon
          variant="filled"
          size="xl"
          color="green"
          disabled={allSelectedRows.length === 0 ? true : false}
          loading={isLoading}
          onClick={open}
        >
          <RestoreIcon />
        </ActionIcon>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={close}
        title="Confirmation"
        centered
        size="auto"
        padding="md"
      >
        <span>Are you sure you want to </span>
        <span className="font-bold">un-archive </span>
        <span>all selected users?</span>
        <div className="flex mt-3 justify-between">
          <Button
            onClick={handleClick}
            color="green"
          >
            Yes
          </Button>
          <Button onClick={close}>No</Button>
        </div>
      </Modal>
    </div>
  );
}

export default function Archive() {
  const [selectedAdms, setSelectedAdms] = useState([]);
  const [selectedSups, setSelectedSups] = useState([]);
  const [selectedEmps, setSelectedEmps] = useState([]);
  const [allSelectedRows, setAllSelectedRows] = useState([
    ...selectedAdms,
    ...selectedSups,
    ...selectedEmps,
  ]);
  const [reloadData, setReloadData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const token = JSON.parse(localStorage.getItem(localStorage.key(1))).id_token;

  useEffect(() => {
    setAllSelectedRows([...selectedAdms, ...selectedSups, ...selectedEmps]);
  }, [selectedAdms, selectedSups, selectedEmps]);

  useEffect(() => {
    console.log('allSelectedRows', allSelectedRows);
  }, [allSelectedRows]);

  return (
    <div>
      {/* ----------------------------------------------------- */}
      <Navbar />
      {/* ----------------------------------------------------- */}
      <SearchBar
        setSearchTerm={setSearchTerm}
        leftComp1={
          <UnArchiveSelectedUsers
            allSelectedRows={allSelectedRows}
            setAllSelectedRows={setAllSelectedRows}
            setReloadData={setReloadData}
            token={token}
          />
        }
      />
      {/* ----------------------------------------------------- */}
      <div className="md:flex">
        <div className="md:w-1/3">
          <OnboardingEmployees
            selectedEmps={selectedEmps}
            setSelectedEmps={setSelectedEmps}
            reloadData={reloadData}
            setReloadData={setReloadData}
            token={token}
            searchTerm={searchTerm}
            archived={true}
          />
        </div>
        <div className="md:w-1/3">
          <Supervisors
            selectedSups={selectedSups}
            setSelectedSups={setSelectedSups}
            reloadData={reloadData}
            setReloadData={setReloadData}
            token={token}
            searchTerm={searchTerm}
            archived={true}
          />
        </div>
        <div className="md:w-1/3">
          <Admins
            selectedAdms={selectedAdms}
            setSelectedAdms={setSelectedAdms}
            reloadData={reloadData}
            setReloadData={setReloadData}
            token={token}
            searchTerm={searchTerm}
            archived={true}
          />
        </div>
      </div>
    </div>
  );
}
