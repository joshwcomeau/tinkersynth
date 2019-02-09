export const parallel = (...promises) => {
  return Promise.all(promises).catch(err => {
    throw new Error(err);
  });
};
