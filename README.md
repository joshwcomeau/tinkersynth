# Tinkersynth

Stuff here soon

### Server setup

- Create a file at `gcp-keys.json`, and add secret key for Google Cloud Platform storage. You can create a new key here: https://console.cloud.google.com/apis/credentials/serviceaccountkey?project=tinkersynth&folder&organizationId

- Secrets are held in `.bashrc` on the server

### Restart server

To restart the node server, `yarn restart-server`

To restart nginx, SSH in (`ssh deploy@api.tinkersynth.com`) and `sudo systemctl restart nginx`
