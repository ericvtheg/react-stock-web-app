const express = require('express');
const logger = require('./middleware/logger');
const corsOptions = require('./middleware/cors');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(logger);
app.use(cors(corsOptions));
app.use('/', require('./routes/routes'));



app.listen(port, () => console.log(
    `Stock Tickr listening at http://localhost:${port}`
));