/**
 * Created by Ishan Garg on 30/3/17.
 */

"use strict";
const Jwt = require('jsonwebtoken');
const Config = require('../Config');



const setToken = function (tokenData, callback) {
    if (!tokenData.id || !tokenData.type) {
        callback(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_ID);
    } else {
        let tokenToSend = Jwt.sign(tokenData,Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY);
        setTokenInDB(tokenData.id,tokenData.type, tokenToSend, function (err, data) {
            callback(err, {token: tokenToSend})
        })
    }
};

const setTokenInDB = function (userId,userType, tokenToSave, cb) {
    let sql="";

    if (userType === Config.APP_CONSTANTS.DATABASE.USER_TYPE.user){
        sql = "update user set accessToken = ? where id=?";
    }
    else {
        sql = "update admins set accessToken = ? where id=?";
    }

    connection.query(sql,[tokenToSave,userId],function (err,result) {
        console.log(err);
        if(err)
            return cb(err);
        else
        {
            return cb(null,tokenToSave);
        }

    });



};

const verifyToken = function (token, callback) {
    Jwt.verify(token, Config.APP_CONSTANTS.SERVER.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
            callback(err)
        } else {
            getTokenFromDB(decoded.id, decoded.type,token, callback);
        }
    });
};

const getTokenFromDB = function (userId, userType,token, callback) {
    let  sql='';

    if (userType == Config.APP_CONSTANTS.DATABASE.USER_TYPE.user){
        sql= "select * from user where id =? and token = ?";

    }
    else if (userType == Config.APP_CONSTANTS.DATABASE.USER_TYPE.assistant){
        sql= "SELECT user.id ,user.firstName,user.lastName,user.phoneNumber,user.countryCode,user.fullPhone,user.thumbnailImage,user.originalImage,assistant.id AS assistantId,assistant.name AS name,assistant.email AS email,assistant.token AS token FROM `assistant` INNER JOIN user ON assistant.createdBy = user.id where assistant.id =? and assistant.token = ?";

    }
    else {
        return callback(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
    }

    connection.query(sql,[userId,token],function (err,result) {
        console.log("===============result=======================",err);
        if(err)
        {
            return callback(err);
        }
        if(result && result.length)
        {
            let dataToSend=result[0];
            dataToSend.type=userType;
            return callback(null,dataToSend);
        }
        else
        {
            return callback(Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN);
        }

    });
};


module.exports = {
    setToken     : setToken,
    verifyToken  : verifyToken,
};