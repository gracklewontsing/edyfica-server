
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userCtrl = {}
const User = require("../models/user")
process.env.SECRET_KEY = "secret";

userCtrl.registerNewUser = async (req, res) => {
  const today = new Date()
  const user = new User({
    username: req.body.username,
    full_name: req.body.full_name,
    area: req.body.area,
    password: req.body.password,
    created: today
  });
  try {     
    let isUser = await User.find({ username: req.body.username });
    console.log(isUser);
    if (isUser.length >= 1) {
      return res.status(409).json("El usuario ya ha sido registrado. Favor de ingresar con sus credenciales o notificar al personal.");
    }
    bcrypt.hash(req.body.password,12, (err, hash) => {
      user.password = hash;
      User.create(user).then((user) => {
        res.json({status: user.username + " registrado."})
      })
      .catch((err)=> {
        res.status(409).send("error: "+err)
      })
    })    
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

userCtrl.logUser = async (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            _id: user._id,
            username: user.username,
            full_name: user.full_name,
            area: user.area,
            isAdmin: user.isAdmin
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });          
          res.send(token);
        } else {
          res.json({ error: "User does not exist or password incorrect." });
        }
      } else {
        res.json({ error: "User does not exist or password incorrect." });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
};

module.exports = userCtrl;