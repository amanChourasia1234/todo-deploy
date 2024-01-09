import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todos.js';

const app = express();
import path from 'path';

dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/todos', todosRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const mongodb =
  'mongodb+srv://aman:aman@cluster0.wgi0196.mongodb.net/?retryWrites=true&w=majority';

app.get('/', (req, res) => {
  res.send('Welcome to our Webpage');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => console.log(err));
