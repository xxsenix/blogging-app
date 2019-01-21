"use strict";

const mongoose = require("mongoose");

//schema
const blogSchema = mongoose.Schema({
    author: {
        firstName: String,
        lastName: String
    },
    title: {type: String, required: true},
    content: {type: String},
    created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = {Blog};