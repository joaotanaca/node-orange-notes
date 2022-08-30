import express from "express";
import helmet from "helmet";
import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json";
import { AppDataSource } from "./src/config/database";
import Routes from "./src/routes";

AppDataSource.initialize()
    .then()
    .catch((err) => {
        console.log(err);
    });

const port = 8080;
const app = express();

app.use(express.json());
app.use(helmet());

app.use("/api-docs", serve, setup(swaggerDocument));

const routes = new Routes(app);
routes.initialize();

app.listen(port, () => {
    console.log(`Servidor aberto na porta ${port}`);
});
