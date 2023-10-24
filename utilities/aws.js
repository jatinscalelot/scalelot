var fs = require('fs');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const client = new S3Client({ region: process.env.AWS_REGION });
const allowedContentTypes = require("./content-types");
const bucket = process.env.AWS_BUCKET_NAME;
let async = require('async');
const { error } = require('console');
const getBlobName = (originalName) => {
    const identifier = Math.random().toString().replace(/0\./, '');
    return `${identifier}-${originalName}`;
};
const setBlobName = (fName, extn) => {
    const identifier = Math.random().toString().replace(/0\./, '');
    return `${fName}/${fName}-${identifier}.${extn}`;
};
async function saveToS3(buffer, parentfolder, contentType, sendorreceive){
    let promise = new Promise(function(resolve, reject) {
        let newContentType = contentType.split(";");
        let blobName = "";
        allowedContentTypes.allowedContentTypes.some((element, index) => {
            if (element.mimeType == newContentType[0]) {
                blobName = parentfolder + '/' + sendorreceive + '/' + setBlobName(element.fName, element.extn);
            }
        });
        if (blobName != "") {
            var putParams = {
                Bucket: bucket,
                Key: blobName,
                Body: buffer,
                ContentType: contentType
            };
            const command = new PutObjectCommand(putParams);
            client.send(command).then((data) => {
                console.log('data', data);
                resolve({msg: 'file uploaded successfully', data: data.Key});
            }).catch((error) => {
                console.log('error',error);
                reject(new Error({msg: 'An error occurred while completing the upload'}));
            });
            // s3.upload(putParams, (err, data) => {
            //     if (err) {
            //         reject(new Error({msg: 'An error occurred while completing the upload'}));
            //     }else{
            //         resolve({msg: 'file uploaded successfully', data: data.Key});
            //     }
            // });
        }
    });
    return promise;
};
async function saveToS3withFileName(buffer, parentfolder, contentType, filename){
    let promise = new Promise(function(resolve, reject) {
        let newContentType = contentType.split(";");
        let blobName = "";
        allowedContentTypes.allowedContentTypes.some((element, index) => {
            if (element.mimeType == newContentType[0]) {
                blobName = parentfolder + '/' + filename;
            }
        });
        if (blobName != "") {
            var putParams = {
                Bucket: bucket,
                Key: blobName,
                Body: buffer,
                ContentType: contentType
            };
            s3.upload(putParams, (err, data) => {
                if (err) {
                    reject(new Error({msg: 'An error occurred while completing the upload'}));
                }else{
                    resolve({msg: 'file uploaded successfully', data: data.Key});
                }
            });
        }
    });
    return promise;
};
async function deleteFromS3(fileKey){
    let promise = new Promise(function(resolve, reject) {
        var params = {
            Bucket: bucket,
            Key: fileKey
        };
        s3.deleteObject(params, function(err, data) {
            if (err) reject(new Error({msg: 'An error occurred while deleting the file'}));
            else resolve({msg: 'file deleted successfully', data: data});
        });
    });
    return promise;
};
module.exports = { saveToS3, saveToS3withFileName, deleteFromS3 };














