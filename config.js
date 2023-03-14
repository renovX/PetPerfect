import mongoose from "mongoose";
await mongoose.connect(
  "mongodb+srv://lasty401:foolishdon@cluster0.vzeau1t.mongodb.net/sample"
);
const db = mongoose.connection;
export default db;
