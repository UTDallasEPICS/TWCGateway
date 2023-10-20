const { Client } =  require("pg")
const client = new Client({
    user: "postgres",       //Use this
    password: "postgres",    //pgAdmin password
    host: "localhost",      //Use this
    port: "5005",           //Default only change if you changed the port number on set up
    database: "postgres"    //Try this first, change if not wokring to a database name you have setup in PGAdmin or text me
})

client.connect();

module.exports = client;