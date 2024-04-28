const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    status:{type:Boolean, required:true},
    year: { type: String, default: "2024" },
    userID: { type: String },
    username: { type: String },
  },
  { versionKey: false }
);

const bookModel = model("books", bookSchema);

module.exports = bookModel;


