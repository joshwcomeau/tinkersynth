# Tinkersynth

Stuff here soon

### Secrets

Server keys are held in `src/server/config/prod.js`. This object should mirror
`src/server/config.dev.js`, but hold the real server values. They're deployed
from this computer with the rest of the code

(this is not really ideal, but I can't figure out how to get Flightplan to access the actual environment args :/)

### Server setup

- Create a file at `src/server/config/prod.js` with secrets for the STRIPE_KEY and the PORT.

- Create a file at `gcp-keys.json`, and add secret key for Google Cloud Platform storage. You can create a new key here: https://console.cloud.google.com/apis/credentials/serviceaccountkey?project=tinkersynth&folder&organizationId

### Restart server

To restart the node server, `yarn restart-server`

To restart nginx, SSH in (`ssh deploy@api.tinkersynth.com`) and `sudo systemctl restart nginx`
