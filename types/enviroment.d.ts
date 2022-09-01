export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            DB_HOST: string;
            DB_PASSWORD: string;
            SWAGGER_URL: string;
        }
    }
}
