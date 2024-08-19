import express from "express";
import 'dotenv/config';
import router from "./router";
import errorHandler from "./middleware/error";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet, { contentSecurityPolicy, hsts } from "helmet";
import logger from "./utils/logger";
import NodeCache from "node-cache";

const PORT = process.env.PORT || 3000;
const app = express();
const cookiesSecret = process.env.SECRET_COOKIES_KEY
const corsOptions = {
  origin: 'http://localhost:4000/',
  optionsSuccessStatus: 200
};
app.use(express.json());
app.use(cookieParser(cookiesSecret));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
  app.use(cors(corsOptions))
  app.use(helmet({
    contentSecurityPolicy: false,
    hsts: false
  }))
}else {
  app.use(cors())
  app.use(helmet())
}

app.use((req, res, next) => {
  logger.info('Corps de la requête:', req.body);
  logger.info('En-têtes de la requête:', req.headers);
  next();
});

app.use(router);
app.use(errorHandler)
app.listen(PORT, () => {
  logger.info(`app is running on http://localhost:${PORT}`);
});
