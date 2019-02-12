import { Storage } from '@google-cloud/storage';

const gcpProjectId = 'tinkersynth';
const gcpBucketName = 'tinkersynth-art';

const storage = new Storage({
  projectId: gcpProjectId,
  keyFilename: './gcp-keys.json',
});

const getExtension = str => {
  const match = str.match(/\.([^\W]+)$/);

  if (!match) {
    throw new Error('Path appears to not have a file extension: ' + str);
  }

  return match[1];
};

const getOptionsForExtension = extension => {
  const cacheControl = 'public, max-age=31536000';

  switch (extension) {
    case 'svg': {
      return {
        gzip: true,
        metadata: {
          contentType: 'image/svg+xml',
          cacheControl,
        },
      };
    }

    case 'png': {
      return {
        metadata: {
          contentType: 'image/png',
          cacheControl,
        },
      };
    }

    default:
      throw new Error(`Unrecognized type: ${type}`);
  }
};

export const upload = path => {
  const extension = getExtension(path);
  const options = getOptionsForExtension(extension);

  const urlPrefix = 'https://storage.googleapis.com/tinkersynth-art';

  return storage
    .bucket(gcpBucketName)
    .upload(path, options)
    .catch(err => {
      throw new Error(`Could not upload to GCP: ${err}`);
    })
    .then(args => {
      const pathSegments = path.split('/');
      const filename = pathSegments[pathSegments.length - 1];

      return `${urlPrefix}/${filename}`;
    });
};
