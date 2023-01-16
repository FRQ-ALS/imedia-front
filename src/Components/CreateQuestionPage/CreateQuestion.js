import React, { useState } from "react";
import "./CreateQuestion.css";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextField from "../TextField/CustomTextField";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import { Paper } from "@mui/material";
const lol = ["1", "2", "3"];
export default function CreatQuestion() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState([
    //     {
    //     question:"",
    //     noOfAnswers:"1",
    //     answers:"",
    //     correctAnswer:""
    //   }
  ]);

  const [currentAnswers, setCurrentAnswers] = useState([1]);

  const handleAddQuestion = (e) => {
    console.log(currentQuestion);
    const newQuestion = {
      questionNumber: "",
      question: "",
      answers: [],
      correctAnswer: "",
    };
    const newArr = [...currentQuestion];
    newArr.push(newQuestion);
    setCurrentQuestion(newArr);
  };

  const addNewAnswer = (e, i) => {
    //pulling out question from array
    const question = currentQuestion[i];
    const answers = [...question.answers];
    answers.push(null);
    question.answers = answers;

    //replacing question in array whilst keeping index
    const newArr = [...currentQuestion];
    newArr[i] = question;
    setCurrentQuestion(newArr);
  };

  const handleAnswerInput = (e, i, j) => {
    const question = currentQuestion[i];
    const answers = [...question.answers];
    answers[j] = e.target.value;
    question.answers = answers;

    const newArr = [...currentQuestion];
    newArr[i] = question;
    setCurrentQuestion(newArr);
  };

  const setCorrectAnswer = (e, i, j) => {
    const question = currentQuestion[i];
    question.correctAnswer = [question.answers[j]];

    const newArr = [...currentQuestion];
    newArr[i] = question;
    setCurrentQuestion(newArr);
  };

  const setQuestionInput = (e, i) => {
    const question = currentQuestion[i];
    question.question = e.target.value;
    question.questionNumber = i+1;

    const newArr = [...currentQuestion];
    newArr[i] = question;
    setCurrentQuestion(newArr);
  };

  return (
    <div id="questionsContainer">
      {currentQuestion.map((question, i) => (
        <div key={i} id="question">
          <div id="questionHeading">Question {i + 1}</div>
          <CustomTextArea
            id="questionField"
            className="questionTextArea"
            placeholder="Enter Question here"
            onChange={(event) => setQuestionInput(event, i)}
          ></CustomTextArea>
          <div id="answersContainer">
            {question.answers.map((answer, j) => (
              <div key={j} id="answerChoice">
                <input
                  type="checkbox"
                  onChange={(event) => setCorrectAnswer(event, i, j)}
                ></input>
                <CustomTextArea
                  placeholder="Enter answer here"
                  id="answerTextArea"
                  onChange={(event) => handleAnswerInput(event, i, j)}
                ></CustomTextArea>
              </div>
            ))}
            <CustomButton id="addNewAnswerButton" className="addNewAnswerButton" onClick={(event) => addNewAnswer(event, i)}>
              Add new answer
            </CustomButton>
          </div>
        </div>
      ))}
      {/* <div id="question">
        <div id="questionHeading">Question 1</div>
        <CustomTextArea
          id="questionField"
          className="questionTextArea"
          placeholder="Enter Question here"
        ></CustomTextArea>
        <div id="answersContainer">
            {currentAnswers.map((answers)=>(
                <div id="answerChoice">
                <input type="checkbox" onChange={event=> console.log(event.target.value)}></input>
                <CustomTextArea placeholder="Enter answer here" id="answerTextArea"></CustomTextArea>
                </div>
            ))}
            <CustomButton onClick={event=> {
                const newlol = [...currentAnswers]
                newlol.push(1)
                setCurrentAnswers(newlol)
            } }>Add new answer</CustomButton>
            </div>
      </div> */}
      <CustomButton onClick={handleAddQuestion} id="addQuestionButton">
        Add New Question
      </CustomButton>
    </div>
  );
}
