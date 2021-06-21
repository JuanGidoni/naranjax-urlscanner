const fs = require('fs');

function createController(content, interval) {
 return new Promise((resolve, reject) => {
   if (typeof content !== 'object') {
    reject('Content not a Object Type.')
   } else {
    setTimeout(() => {
     let currentDate = Date.now()
     let fileLog = `FILE CREATED SUCCESSFULLY, name: urlscan-${currentDate}.json`
     fs.writeFile(`./urlscan-${currentDate}.json`, JSON.stringify(content), (err) => {
      if (err) throw err;
     })
      resolve(fileLog)
    }, interval);
  }
 });
}


module.exports = createController