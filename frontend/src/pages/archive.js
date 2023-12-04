import { React } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ArchivedUsers from './archivedUsers';
import ArchivedDepartments from './archivedDepartments';
import ArchivedTasks from './archivedTasks';

function Archive() {
    return (
        <Tabs isLazy>
			<TabList>
				<Tab>Archived Users</Tab>
				<Tab>Archived Departments</Tab>
				<Tab>Archived Tasks</Tab>
			</TabList>
		
			<TabPanels>


				<TabPanel>
					<ArchivedUsers />
				</TabPanel>

				
				<TabPanel>
                    <ArchivedDepartments />
				</TabPanel>


				<TabPanel>
					<ArchivedTasks />
				</TabPanel>

			</TabPanels>
		</Tabs>
    );
}

export default Archive;