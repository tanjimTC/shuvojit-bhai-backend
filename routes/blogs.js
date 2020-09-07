const express = require("express");
const router = require("express-promise-router")();
const userController = require("../controllers/blogs");
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routeHelpers");
//  by "/" we are actually in /user route because app.js we used route as "app.use("/users", users);"
router
  .route("/")
  .get(userController.index)
  .post(validateBody(schemas.blogSchema), userController.newBlog);

//  by "/:userID" we are actually in "/user/:userID" route because app.js we used route as "app.use("/users", users);"
router
  .route("/:blogId")
  .get(validateParam(schemas.idSchema, "blogId"), userController.getBlog)
  .put(
    [
      validateParam(schemas.idSchema, "blogId"),
      validateBody(schemas.blogSchema),
    ],
    userController.replaceBlog
  )
  .patch(
    [
      validateParam(schemas.idSchema, "blogId"),
      validateBody(schemas.userOptionalSchema),
    ],
    userController.updateBlog
  )
  .delete(validateParam(schemas.idSchema, "blogId"), userController.deleteBlog);

module.exports = router;
