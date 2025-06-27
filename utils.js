
function bytesToMegabytes(bytes) {


  const megabytes = bytes / (1024 * 1024);
  return megabytes;
}

module.exports = { bytesToMegabytes };