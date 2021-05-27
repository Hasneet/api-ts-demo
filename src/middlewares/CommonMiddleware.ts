import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
export class CommonMiddleware {
	private app: express.Express;

	constructor(_app: express.Express) {
		this.app = _app;
		this.useBodyParser();
		this.useURLEncoded();
		this.useCors();
		this.logRequests();
	}

	private async useBodyParser() {
		this.app.use(express.json());
	}

	private async useURLEncoded() {
		this.app.use(express.urlencoded({ extended: false }));
	}

	private async useCors() {
		this.app.use(cors());
	}

	private async logRequests() {
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			console.log(req.originalUrl);
			next();
		});
	}
}
