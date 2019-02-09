import { Storage } from '@google-cloud/storage';

const gcpProjectId = 'tinkersynth';
const gcpBucketName = 'tinkersynth-art';
const storage = new Storage({
  projectId: gcpProjectId,
});

const getOptionsForType = type => {
  const cacheControl = 'public, max-age=31536000';

  switch (type) {
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

export const upload = (path, type) => {
  const options = getOptionsForType(type);

  return storage.bucket(gcpBucketName).upload(path, options);
};
