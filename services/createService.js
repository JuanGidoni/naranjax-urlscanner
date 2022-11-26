import fs from "fs";

export const createService = (content, interval, name) => {
  return new Promise((resolve, reject) => {
    if (typeof content !== "object") {
      reject("Content not a Object Type.");
    } else {
      setTimeout(() => {
        let currentDate = Date.now();
        let fileLog = {
          message: `FILE CREATED SUCCESSFULLY, name: ./urlscan-${currentDate}.json`,
          data: content,
          url: `./urlscan-${name}-${currentDate}.json`,
          created: true,
        };
        fs.writeFile(
          `./urlscan-${name}-${currentDate}.json`,
          JSON.stringify(content),
          (err) => {
            if (err) throw err;
          }
        );
        resolve(fileLog);
      }, interval);
    }
  });
};
