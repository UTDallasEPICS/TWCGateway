For windows, we will use WSL2 to run the project. This is a little more complicated than the previous steps, but it is worth it. 

1. Install WSL2
    * [Follow this guide](https://learn.microsoft.com/en-us/windows/wsl/install) to install WSL2.

2. Install docker-compose in WSL2 (Ubuntu)
    * 

3. Install VS Code in Windows
    * [Follow this guide](https://code.visualstudio.com/docs/setup/windows) to install VS Code in Windows.

4. Install Node.js in WSL2 (Ubuntu)
    * 

5. Clone the repository in WSL2 (Ubuntu)
    * Open a terminal in WSL2 (Ubuntu) and run the following command: `git clone https://github.com/UTDallasEPICS/Warren-Automated-Onboard.git`

6. Install the project dependencies in WSL2 (Ubuntu)
    * Open a terminal in WSL2 (Ubuntu) and run the following commands:
        * `cd Warren-Automated-Onboard/frontend`
        * `npm install`
        * `cd ../backend`
        * `npm install`

7. Start the docker container in WSL2 (Ubuntu)
    * Open a terminal in WSL2 (Ubuntu) and run the following command: `docker compose up`

