// Will use .env in the future. For now using this.

const { Client } =  require("pg")

const client = new Client({
    user: "postgres",      
    password: "postgres",   
    host: "localhost",    
    port: "5005",          
    database: "postgres"    
})

client.connect();

module.exports = client;