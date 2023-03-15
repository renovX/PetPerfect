import express from "express";
import bcrypt from "bcrypt";
import session from "express-session";
import Book from "./model/Book.js";
import Author from "./model/Author.js";
import { faker } from "@faker-js/faker";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
//import db from "./config
import bodyParser from "body-parser";
import authorRouter from "./routes/author.js";
import bookRouter from "./routes/book.js";
import authRouter from "./routes/auth.js";
import verifyAuth from "./middleware/auth.js";
const generateData = async (n) => {
  await Author.collection.drop();
  await Book.collection.drop();
  const authorTable = [["id", "name", "email", "password"]],
    bookTable = [["id", "title"]];
  //first dummy data which will be used in postman
  const dummyauthorDoc = await Author.create({
    _id: new mongoose.Types.ObjectId("6666a6bbcd66666666666e66"),
    name: "dummy",
    email: "dummy@bha.com",
    password: await bcrypt.hash("12345", 10),
    phone_number: "999-999-9999",
    likedBooks: [],
  });
  const dummybookDoc = await Book.create({
    _id: new mongoose.Types.ObjectId("6566a6bbcd66666666666e66"),
    title: "dummy book",
    likes: faker.datatype.number({ max: 100 }),
    author: "dummy",
  });
  for (let i = 0; i < n; i++) {
    const name = faker.name.firstName(),
      email = faker.internet.email(),
      password = faker.internet.password();
    const encrypted_pass = await bcrypt.hash(password, 10);
    const authorDoc = await Author.create({
      name: name,
      email: email,
      password: encrypted_pass,
      phone_number: faker.phone.number(),
      likedBooks: [],
    });
    authorTable.push([authorDoc._id.toString(), name, email, password]);
    for (let j = 0; j < 3; j++) {
      const title = faker.random.words();
      const bookDoc = await Book.create({
        title: title,
        likes: faker.datatype.number({ max: 100 }),
        author: name,
      });
      bookTable.push([bookDoc._id.toString(), title]);
    }
    //displaying
  }
  console.log("Authors");
  console.table(authorTable);
  console.log("Books");
  console.table(bookTable);
};
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const MongoDBStore = connectMongoDBSession(session);
const mongoStore = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
  })
);
app.use(bodyParser.json());
app.use("/auth", authRouter);
app.use("/authors", authorRouter);
app.use("/books", verifyAuth, bookRouter);
app.use("/", async (req, res) => {
  res.send("404 not found");
});

const port = process.env.PORT || 3000;
try {
  await mongoose.connect(process.env.MONGO_URI);
  generateData(5);
  console.log("Data generated successfully");

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
} catch (e) {
  console.log(e);
}
