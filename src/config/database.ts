import "reflect-metadata";
import { DataSource } from "typeorm";
import models from "@models";

export const AppDataSource = new DataSource({
    type: "postgres",
    database: process.env.DB_NAME,
    name: "default",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    entities: models,
});
