const config = require('./config');
const express = require('express');
const search = require('./routes/search')
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello!')
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

