import express from 'express';
import cors from 'cors';

import 'dotenv/config';
import './config/database';
import { PORT } from './config/config';
import router from './routes';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/v1', router);

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
