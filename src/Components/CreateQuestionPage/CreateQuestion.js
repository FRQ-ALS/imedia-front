import React, { useState } from "react";
import "./CreateQuestion.css";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextField from "../TextField/CustomTextField";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { Dialog } from "@mui/material";
const lol = ["1", "2", "3"];
export default function CreatQuestion() {
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [questionToBeDeleted, setQuestionTobeDeleted] = useState(null);
  const [images, setImages] = useState([]);

  const fileHandler = (e, i) => {
    const tempImages = [...images];
    tempImages[i] = e.target.files[0];
    const fileURL = URL.createObjectURL(e.target.files[0])
    console.log(tempImages[10])
    setImages(tempImages);
  };

  function createImageURL(image) {
    return URL.createObjectURL(image);
  }

  const handleAddQuestion = (e) => {
    const newQuestion = {
      questionNumber: "",
      question: "",
      answers: [],
      correctAnswer: "",
    };

    const newArr = [...currentQuestion];
    newArr.push(newQuestion);
    setCurrentQuestion(setQuestionNumbers(newArr));
  };

  //method that adds a new field for answer
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
  //method sets the answer
  const handleAnswerInput = (e, i, j) => {
    const question = currentQuestion[i];
    const answers = [...question.answers];
    answers[j] = e.target.value;
    question.answers = answers;

    const newArr = [...currentQuestion];
    newArr[i] = question;
    setCurrentQuestion(newArr);
  };

  //method that sets the correct answer
  const setCorrectAnswer = (e, i, j) => {
    const question = currentQuestion[i];
    question.correctAnswer = [question.answers[j]];

    const newArr = [...currentQuestion];
    newArr[i] = question;
    setCurrentQuestion(newArr);
  };

  //method that adds the actual question to the questiona array
  const setQuestionInput = (e, i) => {
    const question = currentQuestion[i];
    question.question = e.target.value;

    const newArr = [...currentQuestion];
    newArr[i] = question;
    setCurrentQuestion(newArr);
  };

  //method that removes an answer from answer array and from render state
  const handleAnswerRemove = (e, i, j) => {
    const question = currentQuestion[i];
    const answers = [...question.answers];
    answers.splice(j, 1);

    question.answers = answers;
    const newArr = [...currentQuestion];
    newArr[i] = question;
    setCurrentQuestion(newArr);
  };

  function setQuestionNumbers(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].questionNumber = i + 1;
    }
    return arr;
  }

  const hanldeQuestionRemove = (event) => {
    let i = questionToBeDeleted;
    const newArr = [...currentQuestion];
    newArr.splice(i, 1);

    setCurrentQuestion(setQuestionNumbers(newArr));
    setQuestionTobeDeleted(null);
    setDialogOpen(false);
  };

  return (
    <div id="questionsContainer">
      {/* {currentQuestion.map((question, index)=>(
        <CustomButton>{question.questionNumber}</CustomButton>
      ))} */}
      {currentQuestion.map((question, i) => (
        <div lol={i} key={i} id="question">
          <div id="questionHeading">Question {question.questionNumber}</div>

          <div id="pictureContainer">
          <input
            type="file"
            accept="image/*"
            onChange={(event) => fileHandler(event, i)}
          />
          {images[i]!=undefined ? <img src={URL.createObjectURL(images[i])}></img> : null}
          </div>

          <CustomButton
            onClick={(event) => {
              setDialogOpen(true);
              setQuestionTobeDeleted(i);
            }}
            id="removeQuestionButton"
          >
            Remove question
          </CustomButton>
          <Dialog open={dialogOpen}>
            <DialogContent>
              Are you sure you want to remove question {questionToBeDeleted + 1}
              ?
            </DialogContent>
            <DialogActions id="deleteDialogActions">
              <CustomButton
                onClick={(event) => hanldeQuestionRemove(event)}
                id="deleteButton"
              >
                Delete
              </CustomButton>
              <CustomButton onClick={(event) => setDialogOpen(false)}>
                Cancel
              </CustomButton>
            </DialogActions>
          </Dialog>
          <CustomTextArea
            id="questionField"
            className="questionTextArea"
            placeholder="Enter Question here"
            value={question.question}
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
                  placeholder="Enter Answer Here"
                  value={answer == null ? "" : answer}
                  id="answerTextArea"
                  onChange={(event) => handleAnswerInput(event, i, j)}
                ></CustomTextArea>
                <CustomButton
                  onClick={(e) => handleAnswerRemove(e, i, j)}
                  id="answerRemoveButton"
                >
                  Remove
                </CustomButton>
              </div>
            ))}
            <CustomButton
              id="addNewAnswerButton"
              className="addNewAnswerButton"
              onClick={(event) => addNewAnswer(event, i)}
            >
              Add new answer
            </CustomButton>
          </div>
        </div>
      ))}
      <CustomButton onClick={handleAddQuestion} id="addQuestionButton">
        Add New Question
      </CustomButton>
    </div>
  );
}
