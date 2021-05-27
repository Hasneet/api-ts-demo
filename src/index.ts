import { ApiServer } from './server/impl/ApiServer';
import { DatabaseProvider } from './database/DatabaseConfiguration';
const server = new ApiServer();
DatabaseProvider.configure({
	type: (process.env.DATABASE_TYPE as any) || 'mysql',
	host: process.env.DATABASE_HOST || 'localhost',
	port: Number(process.env.DATABASE_PORT) || 3306,
	username: process.env.DATABASE_USERNAME || 'h123',
	password: process.env.DATABASE_PASSWORD || 'h123',
	database: process.env.DATABASE_NAME || 'xyz',
});
server.startServer();
