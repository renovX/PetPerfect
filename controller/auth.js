import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Author from "../model/Author.js";
import express from "express";

const authController = {
  registor: async (req, res) => {
    const { name, email, password, phone_number } = req.body;
    if (!(name, email, password, phone_number))
      return res.send("Enter all details");
    const encrypted_pass = await bcrypt.hash(password, 10);
    const newauthor = new Author({
      name: name,
      email: email,
      password: encrypted_pass,
      phone_number: phone_number,
      likedBooks: [],
    });
    try {
      const r = await newauthor.save();
      if (r) res.send(r);
    } catch (e) {
      res.status(500).send(e);
    }
  },

  logIn: async (req, res) => {
    if (req.session.isAuth) return res.send("Already Logged In");
    const { email, passwd } = req.body;
    if (!(email && passwd)) return res.send("Provide both email and password");
    const author = await Author.findOne({ email: email });
    if (author && (await bcrypt.compare(passwd, author.password))) {
      //valid email and password
      req.session.isAuth = true;
      req.session.author_id = author._id;
      res.send("Log In Success");
    } else res.send("Invalid email or password");
  },
  logOut: async (req, res) => {
    req.session.destroy((err) => {
      if (err) res.send(err);
      else res.send("Log Out Success");
    });
  },
};
export default authController;
