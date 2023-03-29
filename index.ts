import express, {json, Router} from "express";
import cors from "cors"
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import {handleError} from "./util/errors";
import {mathRouter} from "./routers/math-router";
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3700,
}));

const router = Router();

router.use('/math', mathRouter);

app.use('/api', router);


app.use(handleError);
app.listen(3001, '0.0.0.0', () => {
    console.log('Listening an port: http://localhost:3001')
})
