import mongoose from "mongoose";
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  author: {
    type: String,
    required: true,
  },
});
const model = mongoose.model("Book", bookSchema);
export default model;
