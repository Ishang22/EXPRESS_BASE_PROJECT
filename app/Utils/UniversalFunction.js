/**
 * Created by Shumi Gupta on 29/3/17.
 */
const Boom = require('boom');
const CONFIG = require('../Config');
const MD5 = require('md5');
// const randomString = require("randomstring");



const CryptData = function (stringToCrypt) {
    return MD5(MD5(stringToCrypt));
};





const generateRandomString = function () {
    return randomString.generate(7);
};

const getFileNameWithUserId = function (thumbFlag, fullFileName, userId) {
    var prefix = CONFIG.APP_CONSTANTS.DATABASE.PROFILE_PIC_PREFIX.ORIGINAL;
    var ext = fullFileName && fullFileName.length > 0 && fullFileName.substr(fullFileName.lastIndexOf('.') || 0, fullFileName.length);
    console.log("===============ext=================",ext)
    
    if (thumbFlag) {
        prefix = CONFIG.APP_CONSTANTS.DATABASE.PROFILE_PIC_PREFIX.THUMB;
    }
    return prefix + userId + ext;
};

module.exports = {
    CryptData:CryptData,
    generateRandomString:generateRandomString,
    getFileNameWithUserId:getFileNameWithUserId
}