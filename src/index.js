import express from 'express';
import piaRoutes from './routes/piaRoutes.js';
import 'dotenv/config';
import connectDB from './config/db.js';
import cors from 'cors';
import notFoundHandler from './middlewares/notFoundHandler.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
// Use the routes
app.use('/', piaRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`IG Service running on port ${PORT}`);
});
