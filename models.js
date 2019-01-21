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

blogSchema.virtual("fullName").get(function() {
    return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogSchema.methods.serialize = function() {
    return {
        id: this._id,
        title: this.title,
        content: this.content,
        author: this.fullName,
        created: this.created
    };
};

const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog };