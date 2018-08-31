/**
 * Created by Shumi on 4/7/17.
 */
var Config = require('../Config');
var UniversalFunctions = require('../Utils/UniversalFunction');
var async = require('async');
var Path = require('path');
var knox = require('knox');
var fsExtra = require('fs-extra');

/*
 1) Save Local Files
 2) Create Thumbnails
 3) Upload Files to S3
 4) Delete Local files
 */

//Set Base URL for Images
//var baseFolder = Config.awsS3Config.s3BucketCredentials.folder.profilePicture + '/';
//var baseURL = Config.awsS3Config.s3BucketCredentials.s3URL + '/' + baseFolder;

function uploadFileToS3WithThumbnail(fileData, userId, callbackParent) {
    //Verify File Data
    var profilePicURL = {
        original: null,
        thumbnail: null
    };
    var originalPath = null;
    var thumbnailPath = null;
    var dataToUpload = [];
    var dimensions;

    async.series([
        function (cb) {
            //Validate fileData && userId
            console.log("=================uploadFileToS3WithThumbnail============================")
            if (!userId || !fileData || !fileData.name) {
                console.log('in upload file to s3',userId,fileData);
                cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            } else {
                // TODO Validate file extensions
                cb();
            }
        },
        function (cb) {
            var sizeOf = require('image-size');
            sizeOf(fileData.path, function (err, dimen) {
                // console.log("++++++++++++++++++++dimen",dimen)
                dimensions=dimen;
                cb();
            });
        },
        function (cb) {
            //Set File Names
            profilePicURL.original = UniversalFunctions.getFileNameWithUserId(false, fileData.name, userId);
            profilePicURL.thumbnail = UniversalFunctions.getFileNameWithUserId(true, fileData.name, userId);
            cb();
        },
        function (cb) {
            //Save File
            var path = Path.resolve(".") + "/uploads/" + profilePicURL.original;
            saveFile(fileData.path, path, function (err, data) {
                cb(err, data)
            })
        },
        function (cb) {
            //Create Thumbnail
            originalPath = Path.resolve(".") + "/uploads/" + profilePicURL.original;
            thumbnailPath = Path.resolve(".") + "/uploads/" + profilePicURL.thumbnail;

        //    console.log("=========fileData==============",fileData.path,dimensions)
            createThumbnailImage(fileData.path, thumbnailPath,dimensions,function (err, data) {
                dataToUpload.push({
                    originalPath: originalPath,
                    nameToSave: profilePicURL.original
                });
                dataToUpload.push({
                    originalPath: thumbnailPath,
                    nameToSave: profilePicURL.thumbnail
                });
                cb(err, data)
            })
        },
        function (cb) {
            //Upload both images on S3
            console.log("=========a===============",dataToUpload)
            parallelUploadTOS3(dataToUpload, cb);
        }
    ], function (err, result) {
        callbackParent(err, profilePicURL)
    });
}



function uploadFileToS3WithoutThumbnail(fileData, userId, callbackParent) {
    //Verify File Data
    var profilePicURL = {
        original: null,
        thumbnail: null
    };
    var originalPath = null;
    var thumbnailPath = null;
    var dataToUpload = [];
    var dimensions;

    async.series([
        function (cb) {
            //Validate fileData && userId
            console.log("+++++++++++++++++++++++++++++++++++++===================================")
            if (!userId || !fileData || !fileData.filename) {
                console.log('in upload file to s3',userId,fileData);
                cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
            } else {
                // TODO Validate file extensions
                cb();
            }
        },
        function (cb) {
            var sizeOf = require('image-size');
            sizeOf(fileData.path, function (err, dimen) {
                // console.log("++++++++++++++++++++dimen",dimen)
                dimensions=dimen;
                cb();
            });
        },
        function (cb) {
            //Set File Names
            profilePicURL.original = UniversalFunctions.getFileNameWithUserId(false, fileData.name, userId);
            profilePicURL.thumbnail = UniversalFunctions.getFileNameWithUserId(true, fileData.name, userId);
            cb();
        },
        function (cb) {
            //Save File
            var path = Path.resolve(".") + "/uploads/" + profilePicURL.original;
            saveFile(fileData.path, path, function (err, data) {
                cb(err, data)
            })
        },
        function (cb) {
            //Create Thumbnail
            originalPath = Path.resolve(".") + "/uploads/" + profilePicURL.original;
            thumbnailPath = Path.resolve(".") + "/uploads/" + profilePicURL.thumbnail;

            dataToUpload.push({
                originalPath: originalPath,
                nameToSave: profilePicURL.original
            });

            cb(null,null);

            //    console.log("=========fileData==============",fileData.path,dimensions)
            // createThumbnailImage(fileData.path, thumbnailPath,dimensions,function (err, data) {
            //     dataToUpload.push({
            //         originalPath: originalPath
            //     });
            //
            //     cb(err, data)
            // })
        },
        function (cb) {
            console.log("=========a===============",dataToUpload)
            //Upload both images on S3
            parallelUploadTOS3(dataToUpload, cb);
        }
    ], function (err, result) {
        console.log("profilePicURLprofilePicURLprofilePicURLprofilePicURL",err)
        callbackParent(err, profilePicURL)
    });
}

// function uploadFile(fileData, userId, type, callbackParent) {
//     //Verify File Data
//     var imageURL = {
//         original: null,
//         thumbnail: null
//     };
//     var logoURL = {
//         original: null,
//         thumbnail: null
//     };
//     var documentURL = null;
//
//     var originalPath = null;
//     var thumbnailPath = null;
//     var dataToUpload = [];
//
//     async.series([
//         function (cb) {
//             //Validate fileData && userId
//             if (!userId || !fileData || !fileData.filename) {
//                 console.log('in upload file to s3',userId,fileData)
//                 cb(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
//             } else {
//                 // TODO Validate file extensions
//                 cb();
//             }
//         }, function (cb) {
//             //Set File Names
//             imageURL.original = UniversalFunctions.getFileNameWithUserIdWithCustomPrefix(false, fileData.filename, type,  userId);
//             imageURL.thumbnail = UniversalFunctions.getFileNameWithUserIdWithCustomPrefix(true, fileData.filename, type, userId);
//             cb();
//         },
//         function (cb) {
//             //Save File
//             var path = Path.resolve(".") + "/uploads/" + imageURL.original;
//             saveFile(fileData.path, path, function (err, data) {
//                 cb(err, data)
//             })
//         },
//         function (cb) {
//             //Create Thumbnail if its a logo
//             originalPath = Path.resolve(".") + "/uploads/" + imageURL.original;
//             dataToUpload.push({
//                 originalPath: originalPath,
//                 nameToSave: imageURL.original
//             });
//             if (type == UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.FILE_TYPES.LOGO){
//                 thumbnailPath = Path.resolve(".") + "/uploads/" + imageURL.thumbnail;
//                 createThumbnailImage(originalPath, thumbnailPath, function (err, data) {
//                     dataToUpload.push({
//                         originalPath: thumbnailPath,
//                         nameToSave: imageURL.thumbnail
//                     });
//                     cb(err, data)
//                 })
//             }else {
//                 cb();
//             }
//
//         },
//         function (cb) {
//             //Upload both images on S3
//             parallelUploadTOS3(dataToUpload, cb);
//         }
//     ], function (err, result) {
//
//         console.log("..............imageURL........",imageURL);
//         callbackParent(err, imageURL)
//     });
// }


function parallelUploadTOS3(filesArray, callback) {
    //Create S3 Client
    var client = knox.createClient({
        key: Config.awsS3Config.s3BucketCredentials.accessKeyId
        , secret: Config.awsS3Config.s3BucketCredentials.secretAccessKey
        , bucket: Config.awsS3Config.s3BucketCredentials.bucket
    });
    var s3ClientOptions = {'x-amz-acl': 'public-read'};
    var taskToUploadInParallel = [];
    filesArray.forEach(function (fileData) {
        taskToUploadInParallel.push((function (fileData) {
            return function (internalCB) {
                if (!fileData.originalPath || !fileData.nameToSave) {
                    internalCB(Config.APP_CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR)
                } else {
                    client.putFile(fileData.originalPath, fileData.nameToSave, s3ClientOptions, function (err, result) {
                        deleteFile(fileData.originalPath);
                        internalCB(err, result);
                    })
                }
            }
        })(fileData))
    });
    async.parallel(taskToUploadInParallel, callback)
}


/*
 Save File on the disk
 */
function saveFile(fileData, path, callback) {
    fsExtra.copy(fileData, path, callback);
}

function deleteFile(path) {
    console.log("%%%%%%%%%%%%%%%",path);
    fsExtra.remove(path, function (err) {
        console.log('error deleting file>>',err)
    });
}

/*
 Create thumbnail image using graphics magick
 */

function createThumbnailImage(originalPath, thumbnailPath,dimensions, callback) {

   // console.log(thumbnailPath)
    const ratio = dimensions.width/dimensions.height;
    var gm = require('gm').subClass({imageMagick: true});
    gm(originalPath)
        .resize(dimensions.width * ratio * .15, dimensions.height * ratio * .15, "!")
        .autoOrient()
        .write(thumbnailPath, function (err, data) {
            callback(err)
        })
}


module.exports = {
    uploadFileToS3WithThumbnail: uploadFileToS3WithThumbnail,
    uploadFileToS3WithoutThumbnail:uploadFileToS3WithoutThumbnail
    //uploadFile: uploadFile
};
