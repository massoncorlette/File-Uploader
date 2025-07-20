const cloudinary = require('cloudinary').v2;
const { format }  = require("@cloudinary/url-gen/actions/delivery");
const { auto } = require("@cloudinary/url-gen/qualifiers/format");
const { attachment } = require("@cloudinary/url-gen/qualifiers/flag");
const { CloudinaryImage } = require('@cloudinary/url-gen');

cloudinary.config({
  cloud_name: 'dlcev9lgh',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET

});

async function getCloudinaryObj(path, download) {
  if (download === true) {

  } else {
    
  }
  const results = await cloudinary.uploader.upload(path);
  const publicid = results.public_id;
  const fileName = results.original_filename;
  const size = results.bytes
  const url = cloudinary.url(publicid, {
    transformation: [
      {
        quality: 'auto',
        fetch_format:'auto'
      },
      {
        width:1200,
        height:1200,
        crop: 'fill',
        gravity: 'auto'
      }
    ]
  })
  return {
    publicid,
    url,
    fileName,
    size
  };
};


async function downloadCloudinaryImg(fileInfo) {
  const image = new CloudinaryImage(fileInfo.publicid)
  .delivery(format(auto()))
  .addFlag(attachment(fileInfo.fileName));

  console.log(image);

};

module.exports = { getCloudinaryObj, downloadCloudinaryImg };