// require my sql package before use
var mysql=require('mysql');
//DB Connection
var config={
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node',
    port: 3306
};
var connection=mysql.createConnection(config);
connection.connect((error)=>
{
    if(error)
    {
        console.log(error.message);
    }
    else{
        console.log("database connected");
    }
});
module.exports=connection;