import express from "express";
import authorController from "../controller/author.js";
const authorRouter = express.Router();
authorRouter.get("/me", authorController.getLoggedAuthor);
authorRouter.get("/:id", authorController.getAuthorbyId);

//authorRouter.post("/add", authorController.addAuthor);
authorRouter.get("/", authorController.getAuthors);
export default authorRouter;
