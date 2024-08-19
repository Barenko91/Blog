import express from "express";
import 'dotenv/config';
import router from "./router";
import errorHandler from "./middleware/error";
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet, { contentSecurityPolicy, hsts } from "helmet";

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
  console.log('Corps de la requête:', req.body);
  console.log("Cookies  : ",req.signedCookies)
  console.log('En-têtes de la requête:', req.headers);
  next();
});

app.use(router);
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
