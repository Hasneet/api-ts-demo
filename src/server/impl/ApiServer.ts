import express from 'express';
import { RequestHandler } from 'express';
import { HttpServer } from '../HttpServer';
import { CONTROLLERS } from '../../controllers';
import { CommonMiddleware } from '../../middlewares/CommonMiddleware';

export class ApiServer implements HttpServer {
	private app: express.Express;
	private port: Number;
	constructor() {
		this.app = express();
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.port = Number(process.env.PORT) || 3000;
	}
	get(url: string, requestHandler: RequestHandler): void {
		this.addRoutes('get', url, requestHandler);
	}
	post(url: string, requestHandler: RequestHandler): void {
		this.addRoutes('post', url, requestHandler);
	}
	patch(url: string, requestHandler: RequestHandler): void {
		this.addRoutes('patch', url, requestHandler);
	}
	del(url: string, requestHandler: RequestHandler): void {
		this.addRoutes('delete', url, requestHandler);
	}

	private addRoutes(
		method: 'get' | 'post' | 'patch' | 'delete',
		url: string,
		requestHandler: RequestHandler
	): void {
        console.log(`Added route ${method.toUpperCase()} : ${url}`);
		this.app[method](url, async (req, res, next) => {
			try {
				await requestHandler(req, res, next);
			} catch (e) {
				console.log(e);
				return res.send(e);
			}
		});
	}

	public startServer() {
        //INITIALIZE MIDDLEWARES
        new CommonMiddleware(this.app);

		// INITIALIZE CONTROLLERS
		CONTROLLERS.forEach((controller) => controller.intialize(this));
		this.app.listen(this.port, () => {
			console.log(`Server started listening on port ${this.port}`);
		});
	}
}
