
// return Promise object
async function retrieveImage(url) {
  
  try {
    const image = await fetch(url, { mode: 'cors' });
    if (!image.ok) {
      throw new Error(`Response status: ${image.status}`);
    }
    console.log(image);
    return image;
  } catch (error) {
    console.log(error);
  }
};


function bytesToMegabytes(bytes) {

  console.log(bytes);

  const megabytes = bytes / (1024 * 1024);
  return megabytes;
}

module.exports = { bytesToMegabytes, retrieveImage };

