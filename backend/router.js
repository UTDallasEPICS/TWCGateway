// Link to the wiki on GitHub: https://github.com/UTDallasEPICS/Warren-Automated-Onboard/wiki/Backend/_edit#routerjs

const express = require('express')

// allows to read files and directories from the file system
const fs = require('fs')

// allows to modify file paths
const path = require('path')

// To know more about the Router object, you can go to the wiki and look at index.js -> What is a router? section
const newRouter = express.Router()

// To know more about the body-parser module, you can go to the wiki and look at router.js -> What is body-parser? section
const bodyParser = require('body-parser')
newRouter.use(bodyParser.json())
newRouter.use(bodyParser.urlencoded({ extended: true }))

// Look at What is readdirSync? section in the wiki

// __dirname returns the current directory
// path.joins appends /server to the current directory and...
fs.readdirSync(path.join(__dirname, './server')).forEach(
    //  ...for each file in the /server directory, it will run the following function
    // moduleName represents the name of each file or directory in the './server' directory.
    function (moduleName) {
        // path.join appends /server/moduleName/subRouter.js to the current directory
        const modulePath = path.join(__dirname, './server', moduleName, 'subRouter.js')
        // sample modulePath: /home/Warren-Automated-Onboard/backend/server/user/subRouter.js

        //TODO: continue documentation here
        if (fs.existsSync(modulePath)) {
            const module = require(modulePath)
            if (module && typeof module.addRoutes === 'function') {
                module.addRoutes(newRouter)
            }
        }
    }
)

module.exports = newRouter
