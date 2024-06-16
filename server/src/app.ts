import { Server } from "./server";

const server = new Server();
export const fastifyApp = server.getfastifyApp();

server.run();