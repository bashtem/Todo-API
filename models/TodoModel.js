const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: Number,
  todo_name: String,
  status: Boolean,
  start_time: Date,
  end_time: Date,
  description: String,   
  priority: {
    type: String,
    enum: ['high','medium', 'low']
  }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;