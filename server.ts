import express from "express";
import 'dotenv/config';
import router from "./router";
const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use((req, res, next) => {
  console.log('Corps de la requête:', req.body);
  next();
});
server.use((req, res, next) => {
  console.log('En-têtes de la requête:', req.headers);
  next();
});
server.use(router);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
