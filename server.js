"use strict";

const express = require("express");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require("./config");
const { Blog } = require("./models");

const app = express();
app.use(express.json());

app.get("/posts", (req, res) => {
    Blog.find()
      .then(blogs => res.json(blogs))
      .catch(err => {
          console.error(err);
          res.status(500).json({message: "Internal service error"});
      })
});

let server;

function runServer(databaseUrl, port = PORT) {
    return new Promise((resolve, reject) => {
      mongoose.connect(
        databaseUrl, 
        {useNewUrlParser: true},
        err => {
          if (err) {
            return reject(err);
          }
          server = app
            .listen(port, () => {
              console.log(`Your app is listening on port ${port}`);
              resolve();
            })
            .on("error", err => {
              mongoose.disconnect();
              reject(err);
            });
        } 
      );
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
      return new Promise((resolve, reject) => {
        console.log("Closing server");
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
}

if (require.main === module) {
   runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };