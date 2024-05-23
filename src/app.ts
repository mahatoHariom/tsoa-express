import 'reflect-metadata';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes';
import swaggerFile from './swagger.json';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { errorHandler } from './api/app/middlewares/error-handler';

import { morganMiddleware,logger } from './api/infrastructure/logger';
import { config } from './api/infrastructure/env';

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    dotenv.config(); // Initialize dotenv for environment variables
    this.app.use(cors()); // Enable CORS
    this.app.use(morganMiddleware); // Morgan logging middleware
    this.app.use(bodyParser.json()); // Parse JSON bodies
    this.app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
  }

  private routes(): void {
    RegisterRoutes(this.app); // Register API routes
    this.app.use(
      '/docs',
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerFile,
      
      ),
    ); // Serve Swagger UI documentation
    this.app.get('/health', (req: Request, res: Response) => res.send('OK')); // Health check endpoint
    this.app.use((_req: Request, res: Response) => res.status(404).send('Not Found')); // Handle 404 Not Found errors
    this.app.use(errorHandler); // Error handling middleware
  }

  public start(): void {
    this.app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  }
}

export default App;
