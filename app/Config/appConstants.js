/**
 * Created by Ishan Garg on 30/3/17.
 */


const SERVER = {
    APP_NAME: 'Helpo App',
    PORTS: {
        HAPI: 8081
    },
    JWT_SECRET_KEY: 'MaEHqzXzdWrCS6TS',
    MAX_DISTANCE_RADIUS_TO_SEARCH : 1000000000,
    THUMB_WIDTH : 50,
    paymentCount : 100,
    THUMB_HEIGHT : 50,
    TAX:0.18
};


const DATABASE = {
    PROFILE_PIC_PREFIX : {
        ORIGINAL : 'profilePic_',
        THUMB : 'profileThumb_'
    },
    DEVICE_TYPES: {
        IOS: 'Ios',
        ANDROID: 'Android'
    },
    GENDER: {
        male: 'Male',
        female: 'Female'
    },
    USER_TYPE:{
        user:"user",
        admin:"admin",
        assistant:"assistant"
    },
    NOTIFICATION_TYPES:{
        SHARE_DETAILS:"SHARE_DETAILS",
        ADDED_IN_GROUP:"ADDED_IN_GROUP"
    }
};



const STATUS_MSG = {
    ERROR: {
        USER_NOT_FOUND:{
            statusCode:404,
            customMessage : 'User is not registered with us',
            type : 'USER_NOT_FOUND'
        },
         ADMIN_NOT_FOUND:{
            statusCode:404,
            customMessage : 'Admin is not registered with us',
            type : 'ADMIN_NOT_FOUND'
        },
        NOT_VERIFIED:{
            statusCode:400,
            customMessage : 'Please contact admin to get verified',
            type : 'NOT_VERIFIED'
        },
        DB_ERROR: {
            statusCode:400,
            customMessage : 'DB Error : ',
            type : 'DB_ERROR'
        },
        CATEGORY_NOT_FOUND: {
            statusCode:400,
            customMessage : 'No such CATEGORY found',
            type : 'CATEGORY_NOT_FOUND'
        },
        DUPLICATE_EMAIL: {
            statusCode:400,
            customMessage : 'Email already exists',
            type : 'DUPLICATE_EMAIL'
        },
        DUPLICATE_PHONE_NUMBER :{
            statusCode:400,
            customMessage : 'Phone Number already exists',
            type : 'DUPLICATE_PHONE_NUMBER'
        },
        DUPLICATE_GROUP_NAME :{
            statusCode:400,
            customMessage : 'Group Name already exists',
            type : 'DUPLICATE_GROUP_NAME'
        },
        INVALID_TOKEN: {
            statusCode:401,
            customMessage : 'Your session have been expired. Please login again!',
            type : 'INVALID_TOKEN'
        },
        INVALID_NEW_PASSWORD: {
            statusCode:400,
            customMessage : 'Please provide the valid new password',
            type : 'INVALID_NEW_PASSWORD'
        },
        INVALID_ACCESS: {
            statusCode:400,
            customMessage : 'Invalid access',
            type : 'INVALID_ACCESS'
        },
        APP_ERROR: {
            statusCode:400,
            customMessage : 'Application Error',
            type : 'APP_ERROR'
        },
        INVALID_ID: {
            statusCode:400,
            customMessage : 'Invalid value Provided',
            type : 'INVALID_ID'
        },
        INVALID_PASSWORD: {
            statusCode:400,
            customMessage : 'Incorrect password ',
            type : 'INVALID_PASSWORD'
        },
        USER_BLOCKED: {
            statusCode:400,
            customMessage : 'Your account have been blocked by the admin',
            type : 'USER_BLOCKED'
        },
        PERMISSION_DENIED: {
            statusCode:400,
            customMessage : 'PERMISSION DENIED',
            type : 'PERMISSION_DENIED'
        },

        INVALID_ASSISTANT_PASS: {
            statusCode:400,
            customMessage : 'Incorrect email or password',
            type : 'INVALID_ASSISTANT_PASS'
        },
        INVALID_USER_PASS: {
            statusCode:400,
            customMessage : 'Incorrect phone number or password',
            type : 'INVALID_USER_PASS'
        },
        INVALID_PHONE_NUMBER: {
            statusCode:400,
            customMessage : 'Invalid phone number provided',
            type : 'INVALID_PHONE_NUMBER'
        },
        IMP_ERROR: {
            statusCode:500,
            customMessage : 'Implementation error',
            type : 'IMP_ERROR'
        },
        INVALID_EMAIL: {
            statusCode:400,
            customMessage : 'Invalid Email Address',
            type : 'INVALID_EMAIL'
        },
        ARRAY_LENGTH: {
            statusCode:400,
            customMessage : 'Array length greater than 5',
            type : 'ARRAY_LENGTH'
        },
        INVALID_EMAIL_SOCIAL_LOGIN: {
            statusCode:400,
            customMessage : 'Please login with your Facebook or Instagram account',
            type : 'INVALID_EMAIL_SOCIAL_LOGIN'
        },
        INVALID_RESET_TOKEN: {
            statusCode:400,
            customMessage : 'Invalid token provided',
            type : 'INVALID_RESET_TOKEN'
        },
        DELETE_POST: {
            statusCode:400,
            customMessage : 'This post is unavailable',
            type : 'DELETE_POST'
        },
        DELETE_USER: {
            statusCode:400,
            customMessage : 'This user is unavailable',
            type : 'DELETE_POST'
        },
        UNIQUE_CODE_LIMIT_REACHED:{
            statusCode:400,
            customMessage : 'Unique Code Limit Reached',
            type : 'UNIQUE_CODE_LIMIT_REACHED'
        },
        SOMETHING_WENT_WRONG:{
            statusCode:400,
            customMessage : 'Something Went Wrong',
            type : 'SOMETHING_WENT_WRONG'
        },
        ONE_TRIP_ALREADY_GOING:{
            statusCode:400,
            customMessage : 'One Trip Already Going',
            type : 'ONE_TRIP_ALREADY_GOING'
        },
        INVALID_CODE: {
            statusCode: 400,
            customMessage: 'Invalid verification code',
            type: 'INVALID_CODE'
        },
},
    SUCCESS : {
        CREATED: {
            statusCode:200,
            customMessage : 'Created Successfully',
            type : 'CREATED'
        },
        DEFAULT: {
            statusCode:200,
            customMessage : 'Success',
            type : 'DEFAULT'
        },
        UPDATED: {
            statusCode:200,
            customMessage : 'Updated Successfully',
            type : 'UPDATED'
        },
        LOGOUT: {
            statusCode:200,
            customMessage : 'Logged Out Successfully',
            type : 'LOGOUT'
        },
        DELETED: {
            statusCode:200,
            customMessage : 'Deleted Successfully',
            type : 'DELETED'
        },
        REGISTER: {
            statusCode:200,
            customMessage : 'Register Successfully',
            type : 'REGISTER'
        }
    }
};

const swaggerDefaultResponseMessages = {
    '200': {'description': 'Success'},
    '400': {'description': 'Bad Request'},
    '401': {'description': 'Unauthorized'},
    '404': {'description': 'Data Not Found'},
    '500': {'description': 'Internal Server Error'}
};



var APP_CONSTANTS = {
    SERVER: SERVER,
    DATABASE: DATABASE,
    STATUS_MSG: STATUS_MSG,
    swaggerDefaultResponseMessages: swaggerDefaultResponseMessages,
};



module.exports = APP_CONSTANTS;
