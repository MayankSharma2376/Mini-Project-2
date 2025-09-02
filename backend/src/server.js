const dotenv = require('dotenv')
const express = require('express');
const cors = require('cors');
const authRoute = require('../routes/auth.routes.js');
const connectDb = require('../lib/connectDb.js');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoute);

app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:4000');
  connectDb();
});