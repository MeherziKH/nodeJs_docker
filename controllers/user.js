import { validationResult } from "express-validator";
import User from "../models/user.js";

export function getAll(req, res) {
  User.find({})
  .populate('posts')
  .exec((error, persons) => {
    if (error) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json( persons );
    }
  });
}

export function addUser(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`,
    })
      .then((newUser) => {
        res.status(200).json({
          username: newUser.username,
          password: newUser.password,
          email: newUser.email,
          image: newUser.image,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export function getUserById(req, res) {
    User.findById(req.params.id)
    .then( e => {res.status(200).json(e);})
    .catch( err => {res.status(500).json({error : err});});
}

export function updateUser(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  }else {
    let newUser = {};
    if(req.file == undefined) {
      newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
      }
    }
    else {
      newUser = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      image: `${req.protocol}://${req.get("host")}/img/${req.file.filename}`
      }
    }
    User.findByIdAndUpdate(req.params.id, newUser)
      .then((doc1) => {
      User.findById(req.params.id)
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

export function deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
    .then( e => {res.status(200).json(e);})
    .catch( err => {res.status(500).json({error : err});});
}

