import "reflect-metadata";
import { DataSource } from "typeorm";
import models from "@models";

export const AppDataSource = new DataSource({
    type: "postgres",
    database: "orange-notes",
    name: "default",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    synchronize: true,
    entities: models,
});
