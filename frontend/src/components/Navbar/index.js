// import React from 'react';
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
// import Departments from '../../pages/departments';
// import Users from '../../pages/users';
// import Archive from '../../pages/archive';
// import LoginButton from '../LogIn';
// import LogoutButton from '../Logout';
// import Profile from '../Profile';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
// 	return (
// 		<Tabs isLazy>
// 			{/* <TabList>
// 				<Tab>Users</Tab>
// 				<Tab>Departments</Tab>
// 				<Tab>Archive</Tab>
// 				<Tab>LogIn</Tab>
// 				<Tab>LogOut</Tab>
// 				<Tab>Profile</Tab>
// 			</TabList> */}

// 			<TabList>
// 				<Tab><Link to="/users">Users</Link></Tab>
// 				<Tab><Link to="/departments">Departments</Link></Tab>
// 				<Tab><Link to="/archive">Archive</Link></Tab>
// 				{/* <Tab><Link to="/login">LogIn</Link></Tab> */}
// 				{/* <Tab><Link to="/logout">Log Out</Link></Tab> */}
// 				<Tab><Link to="/profile">Profile</Link></Tab>
// 			</TabList>

// 			{/* <TabPanels>

// 				<TabPanel>
// 					<Users />
// 				</TabPanel>

// 				<TabPanel>
// 					<Departments />
// 				</TabPanel>

// 				<TabPanel>
// 					<Archive />
// 				</TabPanel>

// 				<TabPanel>
// 					<LoginButton />
// 				</TabPanel>

// 				<TabPanel>
// 					<LogoutButton />
// 				</TabPanel>

// 				<TabPanel>
// 					<Profile />
// 				</TabPanel>

// 			</TabPanels> */}
// 		</Tabs>
// 	);
// };

// export default Navbar;

import React from 'react'
import { Tabs, TabList, Tab, Button, useDisclosure } from '@chakra-ui/react'
import Profile from '../Profile'
import { Link } from 'react-router-dom'

const Navbar = ({ userRole }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        // <Tabs isLazy>
        // 	<TabList>
        // 		<Tab><Link to="/users">Users</Link></Tab>
        // 		<Tab><Link to="/departments">Departments</Link></Tab>
        // 		<Tab><Link to="/archive">Archive</Link></Tab>
        // 		<Button onClick={onOpen}>Profile</Button>
        // 	</TabList>

        // 	<Profile isOpen={isOpen} onClose={onClose} />
        // </Tabs>

        <Tabs isLazy>
            <TabList>
                <Link to="/users">
                    <Tab>Users</Tab>
                </Link>
                <Link to="/departments">
                    <Tab>Departments</Tab>
                </Link>
                <Link to="/archive">
                    <Tab>Archive</Tab>
                </Link>
                <Button onClick={onOpen}>Profile</Button>
            </TabList>

            <Profile
                isOpen={isOpen}
                onClose={onClose}
                userRole={userRole}
            />
        </Tabs>
    )
}

export default Navbar
