import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import swaggerDoc from '../../documentation/openapi.json' with { type: 'json' };

// Check if NODE_ENV environment variable is set. If not, throw an error.
const nodeEnv = process.env.NODE_ENV;
if (!nodeEnv) {
    throw new Error('NODE_ENV not set!');
}

const app = express();
const port = 3000;

// Set up basic JSON parsing and CORS headers
app.use(express.json());
app.use(cors()); // TODO make sure it blocks everything except localhost port 4173 and 5173 (default Svelte ports)

// Set up swagger API doc path
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// TODO setup your routers here

// Global error handler. In your code, throw an object with a status and message, and it will be caught here. We ignore one eslint call here, because next is needed.
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Something went wrong!'
        });
});

// Setup server, by default on port 3000
app.listen(port, () => {
    // We allow this one console log here, because it helps us understand the server is actually running.
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${port}, running in ${nodeEnv} mode.`);
});