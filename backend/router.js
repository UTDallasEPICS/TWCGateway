const { strict } = require('assert');
const express = require('express');
const fs = require('fs');
const path = require('path');
const newRouter = express.Router()

fs.readdirSync(path.join(__dirname,'./server')).forEach( function (moduleName) {
    const modulePath = path.join(__dirname, './server', moduleName, 'subRouter.js');
    if (fs.existsSync(modulePath)) {
        const module = require(modulePath);
        if (module && typeof module.addRoutes === 'function'){
            module.addRoutes(newRouter);
        }
        
    }
    
})

module.exports = newRouter;