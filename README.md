## Conceptual Overview

Not important for this commit

## Project Setup

<details open>
<summary>Prerequisites</summary>

Before you can run this project, you'll need to have the following software installed on your computer:

- Visual Studio Code
- Docker
- Node.js (LTS)

If you haven't yet installed VS Code, Docker, and Node.js, you can download them by following the steps listed in the links below  :

- Visual Studio Code for [Windows](https://code.visualstudio.com/docs/setup/windows) or [Mac](https://code.visualstudio.com/docs/setup/mac)
- Docker for [Windows](https://docs.docker.com/docker-for-windows/install/) or [Mac](https://docs.docker.com/docker-for-mac/install/)
- Node.js (LTS) for [Windows](https://nodejs.org/en/download/) or [Mac](https://nodejs.org/en/download/)
</details>
<details open>
<summary>Running the Project for the First Time</summary>

Once you have VS Code, Docker, and Node.js installed, you can setup the project by following these steps:

1. Open Visual Studio Code and click on the "Clone Repository" button in the welcome screen.
2. Enter the URL of the repository and choose a local directory to clone it to.
3. Open a terminal window in Visual Studio Code and navigate to the project directory.
4. Run the command `npm install` in the terminal, in the `frontend/` and the `backend/` folder to install the project dependencies. It is normal for this command to take a significant amount of time.
5. Run the command `docker compose up` in the project's root directory to start the docker container. If you don't see anything along the lines of `database system is ready to accept connections`, kill the terminal and try the command again. 
6. Now, in your browser go to `http://localhost:8080/`and you will see Adminer start.
   1. Change `System` dropdown to `PostgreSQL`
   2. Change `Server` textfield to `warren-db`
   3. Enter `Username` as `postgres`
   4. Enter `Password` as `postgres`
   5. Leave `Database` empty
   6. Click login
7. Now you should see a table, click the top entry called `postgres`.
8. Now, click the `import` button. It should be in the top left pane.
9. Now, browse to the project repository and choose the file called `defaultDBSetup.sql`.
10. After you choose the .sql file, click the `execute` button. In the next page you should see some number of entries and only a green row. There shouldn't be any red rows.
    1.  If you see any red rows:
        1.  On the top of the page, the navigation bar, click on `public`
        2.  Then click on the check box for default_tasks and task_list tables and click the drop button in the box below.
        3. Then click on the check box for the `employee` table and click the drop button in the box below.
        4. Then scroll down, find `a_sequence`, and click on it.
        5. Click on the drop button.
        6. Re-do steps 8 to 10
11. Now, you can close the browser tab and go back to VS Code.
12. In another terminal go to the `backend/` folder and run `npm run dev` to start the backend.
13. Open a third terminal and go to the `frontend/` folder and run `npm run start` to start the frontend. This step may take an upwards of ten minutes to spin up.
</details>
<details open>
<summary>Running the Project Subsequently</summary>

1. Open the repository in VS Code
2. In three different terminals
   1. Run `docker compose up` in the root of the project
   2. Run `npm run dev` in the backend/ folder
   3. Run `npm run start` in the frontend/ folder (this can take a significant amount of time to execute)
</details>

If any part of the setup does not make sense or is yielding errors, you could paste the steps in ChatGPT or Bing Chat. These tools will be a great first step in debugging the problem.

## Functional Requirements

### Users

Not important for this commit

### Pages

Not important for this commit

### Stack

Not important for this commit

### Research Questions

Not important for this commit

### Third party integrations

- Auth0 for authentication

### Deployment

Not deployed yet