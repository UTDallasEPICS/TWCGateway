<!---# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Server Scripts

In the server directory, you can run:

### `npm run dev`

should run the server.js file and connect to locolhost:5001

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) --->


## Conceptual Overview

Not important for this commit

## Project Setup
<style>
  details > summary {
    font-size: 1.2em;
    font-weight: bold;
  }
</style>
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
10. After you choose the .sql file, click the `execute` button. In the next page you should see some number of entries and only a green row. There shouldn't be any red rows. If you see any errors, go back to the page where you clicked the import button and try to drop any tables you see there.
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