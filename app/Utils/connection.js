
let  mysql = require('mysql'),
     config = require('../Config'),
     util = require('util');

/*
@getall variable from development file
*/


let db_config;

if(process.env.NODE_ENV       === "test"){
    console.log("===========test===============");
    db_config = config.dbConfig.test;
}else if(process.env.NODE_ENV === "live"){
    console.log("===========live===============");
    db_config = config.dbConfig.live;
}else if(process.env.NODE_ENV === "client"){
    console.log("===========client===============");
    db_config = config.dbConfig.client;
}else{
    db_config = config.dbConfig.dev;
}



// defination

 function handleDisconnect() {
    connection = mysql.createConnection(db_config);

    connection.query = util.promisify(connection.query);

    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
        else {
            console.log("connection variable created ");
            // add default admins
            return addAdmins();

        }
    });

    // connection.on('error', function(err) {
    //     console.log('db error', err);
    //     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    //         handleDisconnect();
    //     }
    //     else {
    //         throw err;
    //     }
    // });
}


async function addAdmins() {

let admins=[
    {
        email     : 'ishan@helpo.com',
        password  :'1e7eebb19ca71233686f26a43bbc18a9',
    },
    {
        email     : 'test@helpo.com',
        password  :'1e7eebb19ca71233686f26a43bbc18a9',
    },
    {
        email     : 'live@helpo.com',
        password  :'1e7eebb19ca71233686f26a43bbc18a9',
    },
    {
        email     : 'dev@helpo.com',
        password  :'1e7eebb19ca71233686f26a43bbc18a9',
    }
];

let sql,data;
for(let i= 0 ; i< admins.length; i++ )
{
    sql  = "INSERT INTO `admins` (email,password) VALUES (?, ?) ON DUPLICATE KEY UPDATE email=?, password=? ";
   data  = connection.query(sql,[admins[i].email,admins[i].password,admins[i].email,admins[i].password]);
}
    return data;

}
















// declaration
handleDisconnect();


