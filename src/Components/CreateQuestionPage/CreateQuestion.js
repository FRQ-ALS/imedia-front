import React, { useState, useRef } from "react";
import "./CreateQuestion.css";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextField from "../TextField/CustomTextField";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { Dialog } from "@mui/material";
import { Button } from "@mui/material";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import useAlert from "../../Hooks/AlertHook";


export default function CreatQuestion(props) {
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [questionToBeDeleted, setQuestionTobeDeleted] = useState(null);
  const [imageToBeUploaded, setImageToBeUploaded] = useState(null)
  const [multipleChoiceToggle, setMultipleChoiceToggle] = useState(true)
  const [errorText, setErrorText] = useState("")
  const fileInput = useRef(null);
  const { setAlert } = useAlert();


  const sendQuestionData = () => {

    const errorStack = []
    for(let i=0; i<currentQuestion.length; i++){
      if(currentQuestion[i].question=="" && currentQuestion[i].image==undefined){
        errorStack.push(`• You must set a question for question ${currentQuestion[i].questionNumber}`)
      }
      if(currentQuestion[i].answers.length!=0 && currentQuestion[i].correctAnswer==""){
        errorStack.push(`• You must select a correct answer for question ${currentQuestion[i].questionNumber}`)
      }
    }

    if(errorStack.length!=0){
      setAlert("Please complete neccesary fields before saving", "error")
      setErrorText(errorStack.toString().replaceAll(",","\n"), "error")
      return
    }

  
    props.getQuestions(currentQuestion);
  };

  const fileHandler = (e, i) => {
    const tempArr = [...currentQuestion];
    tempArr[imageToBeUploaded].image = e.target.files[0];
    setCurrentQuestion(tempArr);
    setImageToBeUploaded(null)
  };

  const handleAddQuestion = (e) => {
    const newQuestion = {
      questionNumber: "",
      image: undefined,
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

  const handleUploadClick = (event, i) => {
    fileInput.current.click();
    setImageToBeUploaded(i)
  };

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
            <CustomButton id="uploadFileButton" onClick={event=>handleUploadClick(event,i)}>
              Upload Image
            </CustomButton>
            <input
              type="file"
              required
              ref={fileInput}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(event) => fileHandler(event, i)}
            />
            {question.image != undefined ? (
              <img id="questionImage" src={URL.createObjectURL(question.image)}></img>
            ) : null}
          </div>

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
          <CustomButton
            onClick={(event) => {
              setDialogOpen(true);
              setQuestionTobeDeleted(i);
            }}
            id="removeQuestionButton"
          >
            Remove question
          </CustomButton>
        </div>
      ))}
      <>
        {errorText=="" ? null: <pre id="bottomErrorText">{errorText}</pre>}
        <div id="bottomButtonsContainer">
          <CustomButton onClick={handleAddQuestion} id="addQuestionButton">
            Add New Question
          </CustomButton>
          <CustomButton onClick={sendQuestionData} id="saveQuestionsButton">
            Save
          </CustomButton>
        </div>
      </>
    </div>
  );
}
