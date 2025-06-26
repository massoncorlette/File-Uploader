const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: 'dlcev9lgh',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET

});

async function getCloudinaryObj(path) {
  const results = await cloudinary.uploader.upload(path);
  console.log(results);
  const url = cloudinary.url(results.public_id, {
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
  return url;
};

module.exports = { getCloudinaryObj };