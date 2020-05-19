const express = require('express');
const logger = require('./middleware/logger');
const corsOptions = require('./middleware/cors');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001;

app.use(logger);
app.use(cors(corsOptions));
app.use('/', require('./routes/routes'));

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(
    `Stock Tickr listening at http://localhost:${port}`
));