/**
 * This module is used to deploy the server to api.tinkersynth.com.
 *
 * The client-side website is auto-deployed when pushing master to Github,
 * hosted on Netlify. This is _just_ for the API server on DigitalOcean.
 *
 * This script assumes you've already built and bundled your code in /dist.
 * It should be run with the NPM script `deploy-server` or
 * `build-and-deploy-server`
 *
 * Options:
 *   - `fresh-dependencies` - Install dependencies rather than copy from the
 *     previous deploy.
 *
 *
 * Example: `yarn deploy-server -- --fresh-dependencies`
 *
 * NOTE: The very first time you run this, you'll need to create the `app`
 * directory on the server, and run it with `--fresh-dependencies`.
 */

const plan = require('flightplan');
const moment = require('moment');

const privateKey = process.env.HOME + '/.ssh/id_rsa';

const user = 'deploy';
const appName = 'tinkersynth';
const newDirectoryName =
  'tinkersynth_' + moment().format('YYYY-MM-DD_hh[h]mm[m]ss[s]');

const tempDir = `/tmp/${newDirectoryName}`;
const projectDir = `/home/${user}/app`;

const newDirectory = `${projectDir}/${newDirectoryName}`;
const linkedDirectory = `${projectDir}/current`;

const MAX_SAVED_DEPLOYS = 5;

const restartServer = remote => {
  // Start/Restart the application
  // First, figure out if the app is already running
  let appDetails = remote.exec(`pm2 show ${appName}`, { failsafe: true });
  let appNotRunning = !!appDetails.stderr;

  if (appNotRunning) {
    remote.log('App is not already running. Starting it fresh');
    remote.exec(
      `NODE_ENV=production pm2 start ${linkedDirectory}/dist/server/index.js --name="${appName}"`
    );
  } else {
    remote.log('Restarting app');
    remote.exec(`NODE_ENV=production pm2 restart ${appName} --update-env`);
  }
};

plan.target('production', {
  host: 'api.tinkersynth.com',
  username: 'deploy',
  privateKey,
  agent: process.env.SSH_AUTH_SOCK,
});

plan.local('deploy', local => {
  local.log(`Deployment started! Deploying to ${newDirectoryName}`);

  local.log('Copying files to remote');

  const dist = local.find('dist', { silent: true }).stdout.split('\n');
  const packageJson = local
    .find('package.json', { silent: true })
    .stdout.split('\n');
  const files = [...dist, ...packageJson];

  local.transfer(files, `/tmp/${newDirectoryName}`);
});

plan.remote('deploy', remote => {
  remote.log('Move folder to web root');
  remote.sudo(`cp -R ${tempDir} ${newDirectory}`, { user });
  remote.rm(`-rf ${tempDir}`); // clean up after ourselves

  if (!plan.runtime.options['fresh-dependencies']) {
    remote.log('Copying dependencies from last deploy');
    remote.exec(
      `cp -R ${linkedDirectory}/node_modules ${newDirectory}/node_modules`
    );
  }

  remote.log('Installing dependencies');
  remote.sudo(
    `npm --production --prefix ${newDirectory} install ${newDirectory}`,
    { user }
  );

  remote.log('Creating symlink');
  remote.sudo(`ln -snf ${newDirectory} ${linkedDirectory}`, { user });

  restartServer(remote);

  // TODO: This doesn't actually seem to work :/
  remote.log('Removing oldest copies of deploy');
  remote.exec(
    `cd ${projectDir} && rm -rf \`ls -td tinkersynth_* | awk 'NR>${MAX_SAVED_DEPLOYS}'\``
  );
});

plan.remote('restart', restartServer);
