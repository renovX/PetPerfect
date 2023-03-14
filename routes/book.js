import express from "express";
import bookController from "../controller/book.js";
const bookRouter = express.Router();

bookRouter.post("/add", bookController.addBook);
bookRouter.put("/like/:id", bookController.likeBook);
bookRouter.put("/unlike/:id", bookController.unlikeBook);
bookRouter.get("/", bookController.getBooks);
export default bookRouter;
