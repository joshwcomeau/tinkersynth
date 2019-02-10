import fs from 'fs';

export const writeFile = (...args) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(...args, err => {
      console.log('File written', err);
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

export const parallel = (...promises) => {
  return Promise.all(promises).catch(err => {
    throw new Error(err);
  });
};
