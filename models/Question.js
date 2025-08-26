const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  category: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: [String],
      correctAnswer: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model("Question", questionSchema);
