import "reflect-metadata";
import { DataSource } from "typeorm";
import models from "../models";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./database.sqlite",
    synchronize: true,
    entities: models,
});
