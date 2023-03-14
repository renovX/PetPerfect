import express from "express";

const verifyAuth = async (req, res, next) => {
  if (!req.session.isAuth) return res.status(401).send("Unauthorized");
  next();
};

export default verifyAuth;
