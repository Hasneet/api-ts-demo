import { RequestHandler } from 'express';

export interface HttpServer {
	get(url: string, requestHandler: RequestHandler): void;
	post(url: string, requestHandler: RequestHandler): void;
	patch(url: string, requestHandler: RequestHandler): void;
	del(url: string, requestHandler: RequestHandler): void;
}
