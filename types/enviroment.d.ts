export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TEST: string;
        }
    }
}
