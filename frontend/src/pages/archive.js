import { React } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ArchivedUsers from './archivedUsers';
import ArchivedDepartments from './archivedDepartments';
import ArchivedTasks from './archivedTasks';

function Archive({ userRole }) {
    return (
        <Tabs isLazy>
			<TabList>
				<Tab>Archived Users</Tab>
				<Tab>Archived Departments</Tab>
				<Tab>Archived Tasks</Tab>
			</TabList>
		
			<TabPanels>


				<TabPanel>
					<ArchivedUsers userRole={userRole}/>
				</TabPanel>

				
				<TabPanel>
                    <ArchivedDepartments userRole={userRole}/>
				</TabPanel>


				<TabPanel>
					<ArchivedTasks userRole={userRole}/>
				</TabPanel>

			</TabPanels>
		</Tabs>
    );
}

export default Archive;