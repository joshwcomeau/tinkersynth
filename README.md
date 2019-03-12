# Tinkersynth

Stuff here soon

Admin route: https://tinkersynth.com/__admin/dashboard/
Test routes:

- https://tinkersynth.com/__test/emails/purchase-print/
- https://tinkersynth.com/__test/emails/purchase-vector/
- https://tinkersynth.com/__test/emails/purchase-combo/

### Server setup

- Create a file at `gcp-keys.json`, and add secret key for Google Cloud Platform storage. You can create a new key here: https://console.cloud.google.com/apis/credentials/serviceaccountkey?project=tinkersynth&folder&organizationId

- Secrets are held in `.bashrc` on the server

### Restart server

To restart the node server, `yarn restart-server`

To restart nginx, SSH in (`ssh deploy@api.tinkersynth.com`) and `sudo systemctl restart nginx`

To restart the server itself (which is necessary when changing private keys in `.bashrc`), SSH in and run `sudo shutdown -h now`. Then run `yarn restart-server` from local computer, to restart PM2.
