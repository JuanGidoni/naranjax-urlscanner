const config = require('./config');
const express = require('express');
const search = require('./routes/search')
const app = express();

app.get('/', (req, res) => {
  try {
    res.status(200).send('Hello! This api is using NodeJS and this endpoint is useless... please read docs :D')
  } catch (error) {
    res.status(4040).send(error)
  }
})

app.use("/search/", search);

app.listen(config.port, () => {
    console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
}).on('error', err => {
    console.error(err);
    process.exit(1);
});

