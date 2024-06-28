const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/Issue')


issueRouter.get( "/", async (req, res, next) => {
    try {
        const issues = await Issue.find()
        return res.status( 200 ).send( issues )
    } catch (error) {
        res.status( 500 )
        return next( error )
    }
})


issueRouter.post("/", async (req, res, next) => {
    try {
        req.body.user = req.auth._id
        const newIssue = new Issue(req.body)
        const savedIssue = await newIssue.save()
        res.status(201).send(savedIssue)

    } catch (error) {
        res.status(500)
        return next(error)
    }
})

issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete(
        { _id: req.params.issueId, user: req.auth._id },
        (err, deletedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedIssue.title}`)
        }
    )
})

issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId, user: req.auth._id },
        req.body,
        {new: true},
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

// GET issues by user id
issueRouter.get("/user", (req, res, next) => {
    Issue.find({user: req.auth._id}, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})


//upvote
issueRouter.put('/upVote/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        {
            $addToSet: { likedUsers: req.auth._id },
            $pull: { dislikedUsers: req.auth._id }
        },
        { new: true },
        (err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

//downvote
issueRouter.put('/downVote/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        {
            $addToSet: { dislikedUsers: req.auth._id },
            $pull: { likedUsers: req.auth._id }
        },
        { new: true },
        (err, updatedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})



module.exports = issueRouter