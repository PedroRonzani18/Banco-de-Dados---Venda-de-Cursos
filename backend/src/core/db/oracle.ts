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

async function connectToDatabase() {
  try {

    console.log('Iniciando conexão com Oracle Database...');

    oracledb.initOracleClient({ configDir: WALLET_LOCATION });

    console.log('Oracle Client inicializado com sucesso!');

    const connection = await oracledb.getConnection(connectionConfig);

    console.log('Conexão estabelecida com sucesso!');

    await connection.close();
  } catch (err) {
    console.error('Erro ao conectar ao Oracle Database:', err);
  }
}

connectToDatabase();
