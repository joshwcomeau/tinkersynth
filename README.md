# Tinkersynth

Stuff here soon

### Secrets

Server keys are held in `src/server/config/prod.js`. This object should mirror
`src/server/config.dev.js`, but hold the real server values. They're deployed
from this computer with the rest of the code

(this is not really ideal, but I can't figure out how to get Flightplan to access the actual environment args :/)

### Server setup

- Create a file at `src/server/config/prod.js` with secrets for the STRIPE_KEY and the PORT.

- We use Google Cloud Platform, and it requires that a JSON file be added to env variables. Locally I've set it up so that:

```
export GOOGLE_APPLICATION_CREDENTIALS="~/work/tinkersynth/gcp-keys.json"
```

I'll probably need to do the same thing on the server, maybe I can just add it to the NPM script instead of proper env vars?
