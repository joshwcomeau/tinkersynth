let config;
if (process.env.NODE_ENV === 'production') {
  config = require('./prod.js');
} else {
  config = require('./dev.js');
}

export default config;
