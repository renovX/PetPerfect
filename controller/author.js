import mongoose from "mongoose";
import Book from "../model/Book.js";
import Author from "../model/Author.js";
import express from "express";
const authorController = {
  getAuthors: async (req, res) => {
    try {
      const authors = await Author.find();
      var ans = await Promise.all(
        authors.map(async (item) => {
          const books = await Book.find({ author: item.name });
          //a.name = a.name + "0";
          item.noBooks = books.length;
          return {
            id: item._id,
            name: item.name,
            email: item.email,
            phone_number: item.phone_number,
            noBooks: books.length,
          };
        })
      );
      res.send(ans);
      //Promise.all(authorPromise).then(res.send(ans));
    } catch (e) {
      res.send("error" + e);
    }
  },
  getAuthorbyId: async (req, res) => {
    try {
      const id = new mongoose.Types.ObjectId(req.params["id"]);
      const author = await Author.findById(id);
      if (author) {
        const books = await Book.find({ author: author.name });
        //console.log(author);
        //author.books = books;
        res.send({
          id: author._id,
          name: author.name,
          email: author.email,
          phone_number: author.phone_number,
          books: books,
        });
      } else {
        res.send("Author Not Found");
      }
    } catch (e) {
      res.send(e);
    }
  },
  getLoggedAuthor: async (req, res) => {
    if (!req.session || !req.session.isAuth)
      return res.status(401).send("Author not Logged in");

    try {
      const id = new mongoose.Types.ObjectId(req.session.author_id);
      console.log(id);
      const authorDoc = await Author.findById(id).select(
        "-password -__v -likedBooks -unlikedBooks"
      );
      res.send(authorDoc);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  /*addAuthor: async (req, res) => {
    const obj = req.body;
    console.log("body" + req.body);
    if (obj) {
      const newauthor = new Author({
        name: obj.name,
        email: obj.email,
        phone_number: obj.phone_number,
      });
      try {
        const r = await newauthor.save();
        if (r) res.send("success");
      } catch (e) {
        console.log("error");
        res.send(e);
      }
    } else return res.send("empty field");
  },*/
};
export default authorController;
