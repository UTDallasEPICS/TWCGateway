import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Departments from '../../pages/departments';
import Users from '../../pages/users';
import Archive from '../../pages/archive';
import LoginButton from '../LogIn';
import LogoutButton from '../Logout';
import Profile from '../Profile';

const Navbar = () => {
	return (
		<Tabs isLazy>
			<TabList>
				<Tab>Users</Tab>
				<Tab>Departments</Tab>
				<Tab>Archive</Tab>
				<Tab>LogIn</Tab>
				<Tab>LogOut</Tab>
				<Tab>Profile</Tab>
			</TabList>
		
			<TabPanels>

				<TabPanel>
					<Users />
				</TabPanel>

				<TabPanel>
					<Departments />
				</TabPanel>

				<TabPanel>
					<Archive />
				</TabPanel>

				<TabPanel>
					<LoginButton />
				</TabPanel>

				<TabPanel>
					<LogoutButton />
				</TabPanel>

				<TabPanel>
					<Profile />
				</TabPanel>

			</TabPanels>
		</Tabs>
	);
};

export default Navbar;