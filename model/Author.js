import mongoose from "mongoose";
const authorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  likedBooks: {
    type: Array,
  },
});
const model = mongoose.model("Author", authorSchema);
export default model;
