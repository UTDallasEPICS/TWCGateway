# Conceptual Overview

This is a web application to help onboard new employees designed specifically for [the Warren Center](https://thewarrencenter.org/). The objective is to improve and streamline their current manual onboarding process, aiming for enhanced user efficiency and overall ease of use. The application has three types of users: admins, supervisors, and employees. Admins control all the CRUD modifications on the app. Supervisors can perform only one update action, but they have the ability to view all the pages accessible to the admin. Employees can perform no modifications and can only see their page. Added to this project is the Inventory Management project. The objective is to properly manage devices that The Warren Center has knowing what employees has which device along with their dates and all other comprehensive information. Devices can be added deleted, checked in or out. All this information will be stored on the table along with an info page that gives comprehensive information specific to that device. This page will only be available to admin. 

# Project Setup

<!--
<details open>
<summary>Prerequisites</summary> -->

## Prerequisites

Before you can run this project, you'll need to have the following software installed on your computer:

- Node.js (LTS)
- Docker
- Visual Studio Code

If you haven't yet installed Node.js, Docker, and VS Code, you can download them by following the steps listed in the links below :

- Node.js (LTS) for [Windows](https://nodejs.org/en/download/) or [Mac](https://nodejs.org/en/download/)
- Docker for [Windows](https://docs.docker.com/docker-for-windows/install/) or [Mac](https://docs.docker.com/docker-for-mac/install/)
- Visual Studio Code for [Windows](https://code.visualstudio.com/docs/setup/windows) or [Mac](https://code.visualstudio.com/docs/setup/mac)

Note: for Windows users, dedicating time to set up Windows Subsystem for Linux (WSL) will prove to be a worthwhile investment. This is not required to run the project, but is recommended.

<!--
Note: for Windows users, dedicating time to set up Windows Subsystem for Linux (WSL) will prove to be a worthwhile investment. This is not required to run the project, but is recommended. Roughly you will need to follow these steps to set up WSL:
  - Install [WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (it is just `wsl --install` in PowerShell as admin but you should read the docs)
  - Install docker compose in WSL 2 by following [these steps](https://docs.docker.com/compose/install/) -->

<!--
</details>
<details open>
<summary>Running the Project for the First Time</summary> -->

## Running the Project for the First Time

Once you have VS Code, Docker, and Node.js installed, you can setup the project by following these steps:

1. Open Visual Studio Code and click on the `Clone Repository` button in the welcome screen

2. In [our GitHub repository](https://github.com/UTDallasEPICS/Warren-Automated-Onboard) click on the green `Code` button and copy the HTTPS repository URL

3. Enter the URL of the repository and choose a local directory to clone it to

4. Open a terminal window in VSCode and navigate to the project directory. If you do not know how to navigate in the terminal look at this [video](https://www.youtube.com/watch?v=j6vKLJxAKfw) or this [blog post](https://www.git-tower.com/learn/git/ebook/en/command-line/appendix/command-line-101)<!-- this is what copilot recommended!!! (https://www.youtube.com/watch?v=MBBWVgE0ewk).-->

5. From the root of the project, go to the `/frontend` folder and type `npm install` and hit the enter key (this may take a while)

6. Run the command `cd ../backend` to go to the backend folder, and run `npm install` (this may take a while)

7. Run the command `cd ..` to go to the root of the project and then run `docker compose up` in the project's root directory to start the docker container. If you don't see anything along the lines of "database system is ready to accept connections", close the terminal and try the command again.

8. Keep the docker terminal open and make a new terminal window

9. Go to the backend folder and run the command `npx prisma migrate reset` to create the database

<!-- 10. Run the command `npx prisma studio` to open the database in the browser

11. Click on the `User` table and then click on the `Add record` button to add a new user

- Do not change the `id #` field
- Put your name or any name in the `name` field
- The sign-in system (Auth0) currently has "Sign in with Google" and "Sign in with Microsoft" enabled. So, you can use either a Google or a Microsoft account in the `email` field.
- Click the green `Save changes` button -->

<!-- 12. Open a new tab and click on the `UserRoleMapping` table and then click on the `Add record` button to add a new user role mapping -->

<!-- - Do not change the `id #` field
- Put the `id #` of the user you just created in the `userId` field
- Put `1` in the `roleId` field
- Click the green `Save changes` button -->

10. Go back to the terminal and open a new terminal window in the backend folder

11. Now run `npm run dev` to start the backend

12. Open a fourth terminal and go to the frontend folder and run `npm run dev` to start the frontend

<!-- </details>
<details open>
<summary>Running the Project Subsequently</summary> -->

## Running the Project Subsequently

1. Open the folder where you initially cloned the repository in VS Code
2. In three different terminals:
   1. Run `docker compose up` in the root of the project
   2. Run `npm run dev` in the /backend folder
   3. Run `npm run dev` in the /frontend folder (this may take a while)
   <!-- </details> -->

**If any part of the setup does not make sense or is yielding errors, you can paste these steps in ChatGPT or Bing Chat. These tools are a great first step in debugging the problem.**

# Functional Requirements

## Roles and Permissions

### Admin

User with the most permissions. Can perform all CRUD operations on all pages.

### Supervisor

User with the second most permissions. Sees everything the admin can. However, can perform the action of completing a task for a user only if they are assigned to that specific task.

### Employee

User with the least permissions. Can only see their own page. Can't perform any CRUD operations.

## Pages

### Users

On this page the admins and supervisors will be able to see all the users currently in the system. The admin will have the ability to CRUD users on this page, whereas the supervisor will only be able to view the users. Upon clicking on a specific user, their task list will open up. The admin will be able to mark every task as completed. Whereas, the supervisor will only be able to mark the tasks they are assigned to.

### Departments

On this page the admins and supervisors will be able to see all the departments currently in the system. The admin will have the ability to CRUD departments on this page, whereas the supervisor will only be able to view the departments. Upon clicking on a specific department, the department's task list will open up. The admin will be able to perform CRUD on tasks. Whereas, the supervisor will only be able to view the tasks assigned to that deparment.

### Inventory

On this page the admins will be able to view a table view the inventory of all devices in the system. The admin will be able to register new devices, check in/out devices, export device data, view the checkout history of a device, download its QR code, and delete it if needed

### Device Information

An extension of the Inventory page, this page is specified based on the device and gives comprehensive information for that device, such as the Device Name, cost, status etc. It also shows the history of who has used this device when each employee borrowed them, if they returned them and if so the date it was returned. You have the ability to access the QR code of the device as well as archive that device.

### Archive

This page will have three tabs: Archived Users, Archived Departments, Archived Tasks. The admins and supervisors will be able to see all the archived users, departments, and tasks. The admin will have the ability to either permanently delete or restore users, departments, and tasks. Whereas the supervisor will only be able to view the archived users, departments, and tasks.

### Employee Specific Page (Not implemented yet)

Employees will not be able to see any other page except this one. They can't edit anything on this page. They can only interact with the profile button and the supervisor's name. The profile button will open a modal with their profile information. Upon clicking the supervisor's name, it will open a modal with the supervisor's profile information. The idea is that the employee can see their tasks and then be able to see their supervisor's information in case they need to contact them.

## Database Tables

| **Tables**                        | **Attributes**                                                                                                                         |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **User**                          | Name, <br>Email (unique) <br>Archived (boolean)                                                                                        |
| **Department**                    | Name <br>Archived (boolean)                                                                                                            |
| **Task**                          | Description <br>Archived (boolean)                                                                                                     |
| **Role**                          | roleName <br>Archived (boolean)                                                                                                        |
| **UserRoleMapping**               | Relates a user to a role - <br>(userId, roleId)                                                                                        |
| **DepartmentTaskMapping**         | Relates a department to a task - <br>(departmentId, taskId)                                                                            |
| **DepartmentUserMapping**         | Relates a user to a department - <br>(userId, departmentId)                                                                            |
| **ApproverTaskMapping**           | Relates a supervisor to a task - <br>(userId (needs supervisor role), taskId)                                                          |
| **OnboardingEmployeeTaskMapping** | Relates an employee to a task - <br>(userId (needs employee role), taskId)                                                             |
| **Device**                        | Relates to department and location - (departmentId, locationId), <br>SerialNumber (Unique), <br>Name, <br>Cost, <br>Archived (boolean) |
| **Location**                      | Relates to a device - (locationId), <br>locationName, <br>address, <br>Archived (Boolean)                                              |
| **Checkout**                      | Relates a user to a device - (userId, deviceId), <br>CheckoutDate, <br>CheckInDate, <br>Archived (boolean)                             |

## Stack

### Frontend

- React (framework)
- HeadlessUI (component library)
- TailwindCSS (styling)
- Javascript (language)

### Backend

- Node.js (runtime)
- Express.js (framework)
- Prisma (ORM)
- PostgreSQL (database)
- Javascript (language)

### VS Code Extensions

- Thunder Client (similar to Postman for testing API endpoints)
- Copilot and Copilot Chat (AI) (Student GitHub account recieve access for free)
- Prettier (code formatter)
- ESLint (code linter)
- GitLens (additional git features)

These are the most important extensions that everyone on the team should have. Other extensions are up to personal preference.

## Third party integrations

- Auth0 for authentication
  - Microsoft sign-in (The Warren Center uses Office 365, so we only need this to authenticate them)

## Deployment

[Not deployed yet]
