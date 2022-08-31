import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { AppDataSource } from "./src/config/database";
import Routes from "./src/routes";

AppDataSource.initialize()
    .then()
    .catch((err) => {
        console.log(err);
    });

const port = 3000;
const app = express();

app.use(express.json());
app.use(helmet());

const routes = new Routes(app);
routes.initialize();

app.listen(port, () => {
    console.log(`Servidor aberto na porta ${port}`);
});
