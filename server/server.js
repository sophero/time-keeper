require('./config/config');
const config = require('./config/config.json');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes');

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
