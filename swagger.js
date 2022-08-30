const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./endpoints.ts"];

swaggerAutogen(outputFile, endpointsFiles, { host: "localhost:8080" });
