const express = require("express")
const commentRouter = express.Router()
const Comment = require('../models/Comment')


commentRouter.post('/:issueId', (req, res, next) => {
  req.body.user = req.auth._id // Attach the user who posted the comment
  req.body.issue = req.params.issueId // Link the comment to the issue
  const newComment = new Comment(req.body)
  newComment.save((err, savedComment) => {
      if (err) {
          res.status(500)
          return next(err)
      }
      return res.status(201).send(savedComment)
  })
})

commentRouter.get( "/", async (req, res, next) => {
    try {
        const comments = await Comment.find().populate("user", "username")
        return res.status( 200 ).send( comments )
    } catch (error) {
        res.status( 500 )
        return next( error )
    }
})

module.exports = commentRouter