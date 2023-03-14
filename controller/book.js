import mongoose from "mongoose";
import Book from "../model/Book.js";
import Author from "../model/Author.js";
import express from "express";
const bookController = {
  getBooks: async (req, res) => {
    //const id = new mongoose.Types.ObjectId(req.params["id"]);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const order = Number(req.query.order) || 1;

    const skip = (page - 1) * limit;

    try {
      const bookDoc = await Book.find()
        .sort({ likes: order, _id: -1 })
        .skip(skip)
        .limit(limit)
        .select("-__v")
        .exec();
      res.send(bookDoc);
    } catch (e) {
      res.send(e);
    }
  },

  addBook: async (req, res) => {
    const obj = req.body;
    console.log("body" + req.body);
    if (obj) {
      const newbook = new Book({
        title: obj.title,
        likes: obj.likes,
        author: obj.author,
      });
      try {
        const r = await newbook.save();
        if (r) res.send(r);
      } catch (e) {
        console.log("error");
        res.send(e);
      }
    } else return res.send("empty");
  },
  likeBook: async (req, res) => {
    const author_id = new mongoose.Types.ObjectId(req.session.author_id);
    const book_id = new mongoose.Types.ObjectId(req.params["id"]);
    //incrementing likes
    try {
      const authorDoc = await Author.findById(author_id);
      const likedBooks = authorDoc.likedBooks;
      //const unlikedBooks = authorDoc.unlikedBooks;
      if (
        !(
          likedBooks.find((el) => el == req.params["id"]) //||
          //unlikedBooks.find((el) => el == req.params["id"])
        )
      ) {
        const bookDoc = await Book.findOneAndUpdate(
          { _id: book_id },
          { $inc: { likes: 1 } }
        ).exec();

        await Author.updateOne(
          { _id: author_id },
          { $push: { likedBooks: book_id } }
        ).exec();
        if (!bookDoc) return res.send("Book not in database");
        res.send("Liked");
      } else res.send("Already Liked");
    } catch (e) {
      res.status(500).send(e);
    }
  },
  unlikeBook: async (req, res) => {
    try {
      const author_id = new mongoose.Types.ObjectId(req.session.author_id);
      const book_id = new mongoose.Types.ObjectId(req.params["id"]);
      //incrementing likes

      const authorDoc = await Author.findById(author_id);
      if (!authorDoc) return res.send("Author Not Logged In");
      const likedBooks = authorDoc.likedBooks;
      //const unlikedBooks = authorDoc.unlikedBooks;
      if (likedBooks.find((el) => el == req.params["id"])) {
        const bookDoc = await Book.findOneAndUpdate(
          { _id: book_id },
          { $inc: { likes: -1 } }
        ).exec();
        await Author.updateOne(
          { _id: author_id },
          { $pull: { likedBooks: book_id } }
        ).exec();
        if (!bookDoc) return res.send("Book not in database");
        res.send("Unliked");
      } else res.send("Book has not been given a like");
    } catch (e) {
      res.send("Error" + e);
    }
  },
};
export default bookController;
