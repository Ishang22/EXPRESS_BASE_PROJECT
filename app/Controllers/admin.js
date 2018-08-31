const UniversalFunctions = require('../Utils/UniversalFunction'),
      Config             = require('../Config'),
      TokenManager       = require('../Lib/TokenManager');



//////////////////////////////////// adminLogin ///////////////
async function adminLogin(req,res) {
    let step1 =   await checkUserExists(req.query);
    let step2 =   await setTokenInDb( step1);

    res.status(200).send({
        id           : step1[0].id,
        email        : step1[0].email,
        accessToken  : step2.token
    });

}

function checkUserExists(data)
{
let sql = "select * from admins where email=? AND password=?";
let arr = [data.email,UniversalFunctions.CryptData(data.password)];
return    connection.query(sql,arr);
}

function setTokenInDb(data)
{
   return  new Promise((resolve, reject)=> {
        let tokenData={
            id  : data[0].id  ,
            type: Config.APP_CONSTANTS.DATABASE.USER_TYPE.admin
        };

        TokenManager.setToken(tokenData, function (err, output) {
            if (err) {
                reject(err);
            } else {
                resolve(output);
            }
        });
    });
}









module.exports = {
    adminLogin : adminLogin
};
