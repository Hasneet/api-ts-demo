import { Connection, createConnection } from 'typeorm';
import { User } from '../models/User';

export interface DatabaseConfiguration {
	type: 'mysql';
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
	ssh?: boolean;
}

export class DatabaseProvider {
	private static connection: Connection;
	private static configuration: DatabaseConfiguration;

	public static configure(config: DatabaseConfiguration) {
		DatabaseProvider.configuration = config;
	}

	public static async getConnection(): Promise<Connection> {
		if (DatabaseProvider.connection) return DatabaseProvider.connection;
		const {
			type,
			host,
			port,
			username,
			password,
			database,
			ssh,
		} = DatabaseProvider.configuration;
		DatabaseProvider.connection = await createConnection({
			type,
			host,
			port,
			username,
			password,
			database,
			entities: [User],
			synchronize: true
		});
		return DatabaseProvider.connection;
	}
}
