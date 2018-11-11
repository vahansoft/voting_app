const config = require('../config');
const express = require('express');

const cors = require('cors')
const bodyParser = require('body-parser');
const authMiddleware = require('./middlewares/auth');

const models = require('./models');

const apiRoutes = require('./routes/api');

const app = express();

/**
* Middlewares
*/
app.use(cors());
app.use(bodyParser.json());
app.use(authMiddleware);

app.use('/api', apiRoutes);

app
	.listen(config.HTTP_PORT, () => console.debug(`Server is now running on http://localhost:${config.HTTP_PORT}/`));