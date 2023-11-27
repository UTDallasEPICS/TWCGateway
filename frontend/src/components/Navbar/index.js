import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Departments from '../../pages/departments';
import Users from '../../pages/users';
import Archive from '../../pages/archive';
import LoginButton from '../LogIn';

const Navbar = () => {
	return (
		<Tabs isLazy>
			<TabList>
				<Tab>Users</Tab>
				<Tab>Departments</Tab>
				<Tab>Archive</Tab>
				<Tab><LoginButton /></Tab>
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



			</TabPanels>
		</Tabs>
	);
};

export default Navbar;