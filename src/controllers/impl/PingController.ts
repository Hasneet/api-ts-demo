import { NextFunction, Request, Response } from 'express';
import { HttpServer } from '../../server/HttpServer';
import { Controller } from '../Controller';

export class PingController implements Controller {
	intialize(httpServer: HttpServer): void {
		httpServer.get('/ping', this.pingHandler.bind(this));
	}

	private pingHandler(req: Request, res: Response, next: NextFunction) {
		try {
			return res.send('PONG');
		} catch (err) {
			console.log(err);
			return res.send('something went wrong');
		}
	}
}
