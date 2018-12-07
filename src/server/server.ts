import express from 'express';
import path from 'path';

/**
 * Server class used to capsulate the functionality of the express server.
 * The server expects the static content to be served to be a subdirectory
 * based from __dirname.
 */
export default class Server {
    private app: express.Application;
    private staticPath: string;

    /**
     * Bootstraps the server and setting up the routes and static content paths.
     * 
     * @param port to which the server listens to.
     * @param staticDir in which the public content is stored.
     * @param host adress on which the server is reachable.
     */
    constructor(private port: number, staticDir='client', private host='127.0.0.1') {
        this.app = express();
        this.staticPath = path.join(__dirname, staticDir);

        this.setUpRoutes();
    }

    /**
     * Setting up routes for the server. Since we intend to serve a single page application we match
     * the * path to the index.html and relay on client side routing to navigate the page. To provide
     * the index.html the folder path of the side's content has to be added as a static route.
     * 
     * It's possible to add e.g. api routes before the * star route to extend the server with api 
     * functionalities.
     */
    private setUpRoutes() {
        this.app.use(express.static(this.staticPath));
        this.app.get('*', (req, res) => res.sendFile(path.join(this.staticPath, 'index.html')));
    }

    /**
     * Lets the server listen to the host and port given in the constructor. 
     */
    public start() {
        this.app.listen(this.port, this.host, () => console.log(`Example app listening on port ${this.port}!`))
    }
}