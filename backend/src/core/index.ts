import { app } from "./app";
import { env } from "./env";
import { connectToDatabase } from "./db/oracle";

async function startServer() {
    try {
        await app.listen({
            host: "0.0.0.0",
            port: env.PORT,
        });

        connectToDatabase();

    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); 
    }
}

startServer();
