const  TokenManager = require('../Lib/TokenManager');


const userAuth = function (req,res,next) {
    if(req.headers.authorization){
        TokenManager.verifyToken(req.headers.authorization,function (err,response) {
            if(err)
            {
                res.status(401).send({
                    message:'Missing authentication'
                });
            }
            else
            {
                req.body.userData = response;
                next();
            }
        });
    }else{
        res.status(401).send({
            message:'Missing authentication'
        });
    }
}



module.exports = {
    userAuth : userAuth
}
