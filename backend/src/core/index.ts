import path from "path";
import { app } from "./app";
import { env } from "./env";
import oracledb from 'oracledb';

const WALLET_LOCATION = path.join(__dirname, env.WALLET_LOCATION);

const connectionConfig = {
  user: env.ORACLE_USER,
  password: env.ORACLE_PASSWORD,
  connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCPS)(HOST=adb.sa-saopaulo-1.oraclecloud.com)(PORT=1522))(CONNECT_DATA=(SERVICE_NAME=f55grwkwpyhckzx_bdec_high.adb.oraclecloud.com)))',
  walletLocation: WALLET_LOCATION
};

async function connectToDatabase() {
    try {
  
      oracledb.initOracleClient({ configDir: WALLET_LOCATION });
      const connection = await oracledb.getConnection(connectionConfig);
      console.log('Conexão estabelecida com sucesso!');
  
      await connection.close();
    } catch (err) {
      console.error('Erro ao conectar ao Oracle Database:', err);
    }
  }

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
