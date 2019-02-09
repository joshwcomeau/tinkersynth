import svg2img from 'svg2img';

export default async function rasterize(svgMarkup, width, height) {
  return new Promise((resolve, reject) => {
    svg2img(svgMarkup, { width, height }, (error, buffer) => {
      if (error) {
        return reject(error);
      }

      return resolve(buffer);
    });
  });
}
