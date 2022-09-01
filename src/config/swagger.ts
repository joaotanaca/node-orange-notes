const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/config/swagger_output.json";
const endpointsFiles = ["./src/routes/index.ts"];

swaggerAutogen(outputFile, endpointsFiles, {
    host: "localhost:3000",
    securityDefinitions: {
        // petstore_auth: {
        //     type: "oauth2",
        //     authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
        //     flow: "implicit",
        // },
    },
});
