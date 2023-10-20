const client = require("../../clientConnection.js");
module.exports = {
    getAllEmployees: async (req, res) => {
        
        const results = await client.query("select * from public.employee");
        client.end;
        res.json(results);
    
    },
    getEmployee: async (req, res) => {
            
        const results = await client.query("select * from public.employee where name = $1", [req.params.id]);
        client.end;
        res.json(results.rows[0]);

    },
    deleteEmployee: async (req, res) => {
            
        res.send("delete employee");

    }
}
