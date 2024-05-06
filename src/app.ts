import { startWebSocketServer } from './websocket';
import express from 'express';
import cors from 'cors';
import http from 'http';
import routes from './routes';
import { getPort } from './config';
import logger from './utils/logger';

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', routes);
app.get('/api', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

// Retrieve the port from environment variable or default to 3001
const port = process.env.PORT || getPort() || 3001;

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

startWebSocketServer(server);
