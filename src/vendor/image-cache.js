// Image preloader util
// Written by Sam Bernard
// Taken from https://raw.githubusercontent.com/sambernard/react-preload/master/modules/ImageCache.js

const hash = {};
const cache = [];

const add = (url, options = {}) => {
  if (!hash[url]) {
    hash[url] = new Image();

    if (options.crossOrigin) {
      hash[url].crossOrigin = options.crossOrigin;
    }

    hash[url].src = url;

    cache.push(hash[url]);
  }
  return hash[url];
};

const get = (url, options) => add(url, options);

const stuff = (urls, options) => {
  if (urls.length > 0) {
    urls.map(url => add(url, options));
  }
};

const ImageCache = {
  add,
  stuff,
  get,
  hash,
  cache,
};

export default ImageCache;
