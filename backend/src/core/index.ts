import { app } from "./app";
import { env } from "./env";

async function startServer() {
    try {
        await app.listen({
            host: "0.0.0.0",
            port: env.PORT,
        });

        console.log("Backend: Running on http://localhost:" + env.PORT);

    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit the process with an error code
    }
}

startServer();
