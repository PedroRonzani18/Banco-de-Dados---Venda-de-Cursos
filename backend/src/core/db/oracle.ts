import oracledb from 'oracledb';
import { env } from "@/core/env";
import path from 'path';

const WALLET_LOCATION = path.join(__dirname, env.WALLET_LOCATION);

const connectionConfig = {
  user: env.ORACLE_USER,
  password: env.ORACLE_PASSWORD,
  connectString: '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCPS)(HOST=adb.sa-saopaulo-1.oraclecloud.com)(PORT=1522))(CONNECT_DATA=(SERVICE_NAME=f55grwkwpyhckzx_bdec_high.adb.oraclecloud.com)))',
  walletLocation: WALLET_LOCATION
};

export let oracleConnection: oracledb.Connection;

async function connectToDatabase() {
  if (oracleConnection) {
    // Se já existir uma conexão aberta, retorna a mesma
    return oracleConnection;
  }

  try {

    oracledb.initOracleClient({ configDir: WALLET_LOCATION });
    oracleConnection = await oracledb.getConnection(connectionConfig);

    console.log('Conexão com Oracle Database estabelecida');

    return oracleConnection;
  } catch (err) {
    console.error('Erro ao conectar ao Oracle Database:', err);
    throw err; // Lança o erro para tratamento em outro lugar
  }
}

export { connectToDatabase };
