const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
 const config = require('../config')

aws.config.update({
secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
accessKeyId:config.AWS_ACCESS_KEY_ID,
region:
})

const s3 = new aws.S3();
 
const fileFilter = (req,res,cb) => {
  if(file.mimeType === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null,true)
  }else{
    cb(new Error('Invalid file type,only JPEG and PNG is allowed'),false)
  }
}

const upload = multer({
  fileFiter,
  storage: multerS3({
    acl:'public-read',
    s3,
    bucket: 'some-bucket',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports= upload;