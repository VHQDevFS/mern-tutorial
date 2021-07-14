require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-leanit.beb7d.mongodb.net/mern-learnit?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
