import express from "express";
import helmet from "helmet";
import { serve, setup } from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json";
import endpoints from "./endpoints";
import { AppDataSource } from "./src/config/database";

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

app.use((req, res, next) => {
    const { Authorization } = req.headers;
    if (!Authorization) {
        next();
    } else {
        return res.sendStatus(401);
    }
});

endpoints(app);

app.listen(port, () => {
    console.log(`Servidor aberto na porta ${port}`);
});
