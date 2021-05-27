import { HttpServer } from '../server/HttpServer';

export interface Controller {
	intialize(HttpServer: HttpServer): void;
}
