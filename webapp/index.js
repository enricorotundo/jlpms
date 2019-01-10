const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

// ugly, but..
const environmentToEnv = {
  'production': 'prod',
  'staging': 'stag',
  'development': 'dev'
}
const env = require(`./env.${environmentToEnv[process.env.NODE_ENV]}.json`);

const app = express();

app.use(require('prerender-node').set('prerenderServiceUrl', env.PRERENDER_SERVICE_URL));
app.use(serveStatic(path.join(__dirname, 'dist')));

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
