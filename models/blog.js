const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  blogTitle: String,
  date: String,
  blogText: String,
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
