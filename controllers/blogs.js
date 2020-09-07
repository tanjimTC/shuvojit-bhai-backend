const Blog = require("../models/blog");

module.exports = {
  index: async (req, res, next) => {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  },

  newBlog: async (req, res, next) => {
    const newBlog = new Blog(req.value.body);
    const blog = await newBlog.save();
    res.status(201).json(blog);
  },

  getBlog: async (req, res, next) => {
    const { blogId } = req.value.params;
    const blog = await Blog.findById(blogId);
    res.status(200).json(blog);
  },

  replaceBlog: async (req, res, next) => {
    //Enforce and make sure req.body contains all the fields
    const { blogId } = req.value.params;
    const newBlog = req.value.body;
    const result = await Blog.findByIdAndUpdate(blogId, newBlog);
    res.status(200).json({ status: true });
  },

  updateBlog: async (req, res, next) => {
    //req.body may contains any number of fields
    const { blogId } = req.value.params;
    const newBlog = req.value.body;
    const result = await Blog.findByIdAndUpdate(blogId, newBlog);
    res.status(200).json({ status: true });
  },
  deleteBlog: async (req, res, next) => {
    const blogId = req.params.blogId;
    const blog = await Blog.remove({ _id: blogId });
    res.status(200).json(blog);
  },
};
