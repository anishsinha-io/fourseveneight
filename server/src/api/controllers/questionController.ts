import { RequestHandler } from "express";

import Question, { IQuestion } from "../../models/questionModel";
import User, { IUser } from "../../models/userModel";

export const createQuestion: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    const { content, category, tags } = req.body;
    const newQuestionFields = {
      user: user.id,
      content,
      category,
      tags,
    } as IQuestion;
    const newQuestion = new Question(newQuestionFields);
    await newQuestion.save();
    return res.status(200).json({ newQuestion });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const removeQuestion: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    const questionId = req.params.questionId;
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ msg: "Question not found!" });
    if (question.user.toString() !== user.id.toString())
      return res.status(403).json({ msg: "Unable to authorize!" });

    await Question.findByIdAndUpdate(questionId, { deleted: true });
    return res.status(204).json({ msg: "Question successfully deleted!" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error!" });
  }
};

export const editQuestion: RequestHandler = async (req, res) => {
  try {
    const user = req.user as IUser;
    const questionId = req.params.questionId;
    const { content } = req.body;
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ msg: "Question not found" });
    if (question.user.toString() !== user.id.toString())
      return res.status(403).json({ msg: "Unable to authorize!" });
    await Question.findByIdAndUpdate(questionId, { content });
    return res.status(200).json({ msg: "Question successfully updated" });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error!" });
  }
};

export const getQuestion: RequestHandler = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ msg: "Question not found!" });
    return res.status(200).json({ question });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getAllQuestions: RequestHandler = async (req, res) => {
  try {
    const questions = await Question.find();
    if (!questions) return res.status(404).json({ msg: "No questions found!" });
    return res.status(200).json({ questions });
  } catch (err) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};
