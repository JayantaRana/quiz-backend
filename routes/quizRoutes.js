// const express = require("express");
// const router = express.Router();
// const Question = require("../models/Question");

// // Get questions by category and level
// router.get("/:category/:level", async (req, res) => {
//   try {
//     const { category, level } = req.params;
//     const quiz = await Question.findOne({ category, level });
//     if (!quiz) {
//       return res.status(404).json({ message: "No questions found" });
//     }
//     res.json(quiz.questions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;



// routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const mongoose = require('mongoose');

router.get('/debug', async (req, res) => {
  try {
    const count = await Question.countDocuments();
    res.json({ readyState: mongoose.connection.readyState, count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:category/:level', async (req, res) => {
  try {
    const { category } = req.params;
    const level = Number(req.params.level);    // coerce to number
    console.log('GET /api/quiz', { category, level });
    const quiz = await Question.findOne({ category, level }).lean();
    if (!quiz) return res.status(404).json({ message: 'No questions found' });
    res.json(quiz.questions);
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

