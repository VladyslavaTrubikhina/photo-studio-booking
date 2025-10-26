import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger-config.js';
import authRouter from './routes/auth-router.js';
import photoZonesRouter from "./routes/photo-zones-router.js";
import { seedDatabase } from "./db/seeder.js";
import reservationsRouter from "./routes/reservations-router.js";
import usersRouter from "./routes/users-router.js";

const nodeEnv = process.env.NODE_ENV || 'dev';
const app = express();
const port = 3000;

if (process.env.NODE_ENV === 'dev') {
    await seedDatabase();
}

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRouter);
app.use('/zones', photoZonesRouter);
app.use('/reservations', reservationsRouter);
app.use('/users', usersRouter);

app.use(function (err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'Something went wrong!'
        });
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${port}, running in ${nodeEnv} mode.`);
});

export default app;