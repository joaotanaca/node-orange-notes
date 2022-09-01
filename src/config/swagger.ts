import "dotenv/config";
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/config/swagger_output.json";
const endpointsFiles = ["./src/routes/index.ts"];

const scheme = process?.env?.SWAGGER_URL?.includes("localhost")
    ? "http"
    : "https";

swaggerAutogen(outputFile, endpointsFiles, {
    host: process.env.SWAGGER_URL,
    schemes: [scheme],
    securityDefinitions: {
        // petstore_auth: {
        //     type: "oauth2",
        //     authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
        //     flow: "implicit",
        // },
    },
});
