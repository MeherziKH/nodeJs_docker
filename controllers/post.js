import { validationResult } from "express-validator";
import Post from "../models/post.js";
import User from "../models/user.js";

export function getAll(req, res) {
    Post.find({})
    .then((docs) => {
        let list = [];
        for (let i = 0; i < docs.length; i++) {
          list.push({
            id: docs[i]._id,
            title: docs[i].title,
            description: docs[i].description,
            image: docs[i].image,
            owner:docs[i].owner,
          });
        }
    res.status(200).json(list);
    })
    .catch((err) => {
        res.status(500).json({ error: err });
    });
}

  export function addPost(req, res) {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
    } else {
        const post = new Post({ owner: req.body.owner, title: req.body.title, description: req.body.description, image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`});
        post.save((error, post) => {
            if (error) {
                res.status(500).json({ error: error });
            } else {
            User.findByIdAndUpdate(req.body.owner, { $push: { posts: post._id } }, (error) => {
                if (error) {
                    res.status(500).json({ error: error });
                } else {
                    res.status(200).json({});
                }
            });
            }
        });
    }
  }

  export function updatePost(req, res) {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
    }else {
      let newPost = {};
      if(req.file == undefined) {
        newPost = {
        title: req.body.title,
        description: req.body.description,
        }
      }
      else {
        newPost = {
        title: req.body.title,
        description: req.body.description,
        image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
        }
      }
      Post.findByIdAndUpdate(req.params.id, newPost)
        .then((doc1) => {
        Post.findById(req.params.id)
          .then((doc2) => {
          res.status(200).json(doc2);
          })
          .catch((err) => {
          res.status(500).json({ error: err });
          });
        })
        .catch((err) => {
        res.status(500).json({ error: err });
        });
      }
    }

    export function deletePost(req, res) {
        Post.findByIdAndDelete(req.params.id, (error, post) => {
            if (error) {
              res.status(200).json({error : error})
            } else {
              User.findByIdAndUpdate(post.owner, { $pull: { posts: req.params.id } }, (error) => {
                if (error) {
                    res.status(500).json({error : error})
                } else {
                    res.status(200).json()
                }
              });
            }
          });
    }

    export function getUser(req, res) {
        Post.findById(req.params.id)
            .populate('owner')
            .exec((error, post) => {
            if (error) {
                res.status(500).json({ });
            } else {
                res.status(200).json( post.owner );
            }
        });
    }
    

    
    