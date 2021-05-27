import { PingController } from './impl/PingController';
import { UserController } from './impl/UserController';

export const CONTROLLERS = [new PingController(), new UserController()];
