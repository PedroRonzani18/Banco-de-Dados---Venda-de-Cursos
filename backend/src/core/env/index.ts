import 'dotenv/config'; 
import { z } from 'zod'; 

const envSchema = z.object({

	NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
	// POSTGRESQL_USERNAME: z.string(),
	// POSTGRESQL_PASSWORD: z.string(),
	// POSTGRESQL_DATABASE: z.string(),
	DATABASE_URL: z.string().optional(),
	PORT: z.coerce.number().default(3333),
	WALLET_LOCATION: z.string(),
	ORACLE_USER: z.string(),
	ORACLE_PASSWORD: z.string(),
});

const _env = envSchema.safeParse(process.env); // tenta validar process.env para ver se tem as exatas informações dentro

if (_env.success === false) {
	console.error('Invalid enviroment variables',
		_env.error.format()); // formata todos os erros ali

	throw new Error('Invalid enviroment variables'); 
}

const {POSTGRESQL_USERNAME, POSTGRESQL_PASSWORD, POSTGRESQL_DATABASE, DATABASE_URL} = process.env

if(DATABASE_URL)
	process.env.DATABASE_URL = DATABASE_URL
else if (POSTGRESQL_USERNAME && POSTGRESQL_PASSWORD && POSTGRESQL_DATABASE)
	process.env.DATABASE_URL=`postgresql://${process.env.POSTGRESQL_USERNAME}:${process.env.POSTGRESQL_PASSWORD}@localhost:5432/${process.env.POSTGRESQL_DATABASE}?schema=public`

if (!process.env.DATABASE_URL)
	throw new Error('Invalid environment variables'); 

console.log("Environment Variables: valid")
export const env = _env.data;