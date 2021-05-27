import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HttpServer } from '../../server/HttpServer';
import { Controller } from '../Controller';
import { userService } from '../../services/Impl/UserService';
export class UserController implements Controller {
	intialize(httpServer: HttpServer): void {
		httpServer.get('/users', this.list.bind(this));
		httpServer.get('/user:id', this.getById.bind(this));
		httpServer.post('/user', this.create.bind(this));
		httpServer.patch('/user:id', this.update.bind(this));
		httpServer.del('/user:id', this.delete.bind(this));
	}

	private async list(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.send(await userService.list());
	}

	private async getById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.send(await userService.getById(Number(req.params.id)));
	}

	private async create(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.send(await userService.create(req.body));
	}

	private async update(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.send(await userService.update(req.body));
	}

	private async delete(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.send(await userService.delete(Number(req.params.id)));
	}
}
