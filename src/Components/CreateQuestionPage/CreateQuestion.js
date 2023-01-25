import React, { useState, useRef, useEffect } from "react";
import "./CreateQuestion.css";
import CustomButton from "../CustomButton/CustomButton";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { Dialog } from "@mui/material";
import useAlert from "../../Hooks/AlertHook";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import PdfViewer from "../PdfViewer/PdfViewer";
import { v4 as uuidv4 } from "uuid";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UploadIcon from "@mui/icons-material/Upload";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function CreatQuestion(props) {
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [questionToBeDeleted, setQuestionTobeDeleted] = useState(null);
  const [imageToBeUploaded, setImageToBeUploaded] = useState(null);
  const [questionMinimized, setQuestionMinimized] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [imageArray, setImageArray] = useState([]);
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [currentPdf, setCurrentPdf] = useState(null);
  const fileInput = useRef(null);
  const { setAlert } = useAlert();

  const jwt = document.cookie.split("=")[1]


  useEffect(() => {
    if (props.setQuestionsArray.length == 0) {
      return;
    }
    setCurrentQuestion(props.setQuestionsArray);
  }, [props.setQuestionsArray]);

  const minimizeQuestion = (e, i) => {
    const tempArr = [...questionMinimized];
    tempArr[i] = true;
    setQuestionMinimized(tempArr);
  };

  const maximizeQuestion = (e, i) => {
    const tempArr = [...questionMinimized];
    tempArr[i] = false;
    setQuestionMinimized(tempArr);
  };

  const sendQuestionData = () => {
    const errorStack = [];
    for (let i = 0; i < currentQuestion.length; i++) {
      if (
        currentQuestion[i].question == "" &&
        currentQuestion[i].image == undefined
      ) {
        errorStack.push(
          `• You must set a question for question ${currentQuestion[i].questionNumber}`
        );
      }
      if (
        currentQuestion[i].answers.length != 0 &&
        currentQuestion[i].correctAnswer == null
      ) {
        errorStack.push(
          `• You must select a correct answer for question ${currentQuestion[i].questionNumber}`
        );
      }
      //checking whether a selected answer is not just an empty box
      if (
        (currentQuestion[i].answers[currentQuestion[i].correctAnswer] == "" ||
          currentQuestion[i].answers[currentQuestion[i].correctAnswer] ==
            null) &&
        currentQuestion[i].answers.length != 0
      ) {
        errorStack.push(
          `• You must select a valid correct answer for question ${currentQuestion[i].questionNumber}`
        );
      }
    }

    if (errorStack.length != 0) {
      setAlert("Please complete neccesary fields before saving", "error");
      setErrorText(errorStack.toString().replaceAll(",", "\n"), "error");
      return;
    } else {
      setErrorText("");
      // setAlert("Save successful!", "success")
    }
    props.getQuestions(currentQuestion);
  };

  const handleFileFromPdf = (parameter) => {
    const tempImage = [...imageArray];
    tempImage[imageToBeUploaded] = parameter;
    setImageArray(tempImage);
    uploadImage(parameter, imageToBeUploaded);
  };

  const fileHandler = (e, i) => {
    const tempImage = [...imageArray];
    tempImage[imageToBeUploaded] = e.target.files[0];
    setImageArray(tempImage);
    uploadImage(e.target.files[0], imageToBeUploaded);
  };

  const uploadImage = (file, index) => {
    const body = new FormData();
    body.append("file", file);
    fetch("/api/v1/image-service/uploadimage", {
      credentials: "include",
      method: "POST",
      headers:{"Authorization":`Bearer ${jwt}`},
      body: body,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const tempArr = [...currentQuestion];
        tempArr[index].image = responseJson;
        setCurrentQuestion(tempArr);
      });
  };

  const handleAddQuestion = (e) => {
    const token = uuidv4();
    const newQuestion = {
      questionNumber: "",
      image: undefined,
      question: "",
      answers: [],
      correctAnswer: null,
      token: token,
    };
    const newArr = [...currentQuestion];
    newArr.push(newQuestion);
    setCurrentQuestion(setQuestionNumbers(newArr));

    minimizeQuestion(e, newArr.length - 2);
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
    question.correctAnswer = j;

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
    setImageToBeUploaded(i);
  };

  const handleUploadFromPdfClick = (event, i) => {
    setPdfDialogOpen(true);
    setImageToBeUploaded(i);
  };

  const hanldeQuestionRemove = (event) => {
    let i = questionToBeDeleted;
    const newArr = [...currentQuestion];
    newArr.splice(i, 1);

    //removing question from image array
    const tempImages = [...imageArray];
    tempImages.splice(i, 1);
    setImageArray(tempImages);

    setCurrentQuestion(setQuestionNumbers(newArr));
    setQuestionTobeDeleted(null);
    setDialogOpen(false);
  };

  function renderMinimizedQuestion(question) {
    return (
      <div id="minimizedQuestion">
        Question {question.questionNumber}
        <CustomButton
          onClick={(event) =>
            maximizeQuestion(event, question.questionNumber - 1)
          }
          id="expandQuestionButton"
        >
          <OpenInFullIcon />
          Expand
        </CustomButton>
      </div>
    );
  }

  function returnImageURL(i) {
    // if (imageArray[i] === undefined) {
    //   return "";
    // }

    const token = currentQuestion[i].image;
    return `/api/v1/image-service/getimage/token=${token}`;
  }

  return (
    <div id="questionsContainer">
      {currentQuestion.map((question, i) => (
        <div key={i}>
          {questionMinimized[i] == true ? (
            renderMinimizedQuestion(question)
          ) : (
            <div key={i} id="question">
              <div id="questionRemoveContainer">
                <div id="questionHeading">
                  Question {question.questionNumber}
                </div>
                <div id="questionActionButtonsContainer">
                  <CustomButton
                    id="addNewAnswerButton"
                    className="addNewAnswerButton"
                    onClick={(event) => addNewAnswer(event, i)}
                  >
                    <AddBoxIcon />
                    New Answer Choice
                  </CustomButton>
                  <CustomButton
                    id="uploadFileButton"
                    onClick={(event) => handleUploadClick(event, i)}
                  >
                    <UploadIcon />
                    {question.image == undefined || question.image == null
                      ? "Insert image from file"
                      : "Change image from file"}
                  </CustomButton>
                  <CustomButton
                    id="insertFromPdfButton"
                    onClick={(event) => handleUploadFromPdfClick(event, i)}
                  >
                    <PictureAsPdfIcon />
                    Insert image from pdf
                  </CustomButton>
                </div>
                <div id="topButtonContainer">
                  <CustomButton
                    onClick={(event) => minimizeQuestion(event, i)}
                    id="minimizeQuestionButton"
                  >
                    <CloseFullscreenIcon />
                    Minimize
                  </CustomButton>
                  <CustomButton
                    onClick={(event) => {
                      setDialogOpen(true);
                      setQuestionTobeDeleted(i);
                    }}
                    id="removeQuestionButton"
                  >
                    <DeleteForeverIcon />
                    Delete
                  </CustomButton>
                </div>
              </div>

              <div id="pictureContainer">
                <input
                  type="file"
                  required
                  ref={fileInput}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(event) => fileHandler(event, i)}
                />
                {question.image === undefined ||
                question.imag === null ? null : (
                  <img id="questionImage" src={returnImageURL(i)}></img>
                )}
              </div>

              <Dialog open={dialogOpen}>
                <DialogContent>
                  Are you sure you want to remove question{" "}
                  {questionToBeDeleted + 1}?
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
                  <div key={`${i},${j}`} id="answerChoice">
                    <input
                      type="radio"
                      name={`radAnswer${(i, j)}`}
                      checked={question.correctAnswer === j}
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
                {question.answers.length != 0 ? (
                  <div id="checkBoxToolTip">
                    Indiatce the correct answer(s) using the checkbox on the
                    left
                  </div>
                ) : (
                  <div id="checkBoxToolTip"></div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <>
        {errorText == "" ? null : <pre id="bottomErrorText">{errorText}</pre>}
        <div id="bottomButtonsContainer">
          <CustomButton onClick={handleAddQuestion} id="addQuestionButton">
            Add New Question
          </CustomButton>
          <CustomButton onClick={sendQuestionData} id="saveQuestionsButton">
            Save
          </CustomButton>
        </div>
      </>

      <Dialog fullWidth maxWidth={"600px"} open={pdfDialogOpen}>
        <DialogContent>
          <PdfViewer
            currentPdf={currentPdf}
            setCurrentPdf={(parameter) => setCurrentPdf(parameter)}
            setImageURL={(parameter) => handleFileFromPdf(parameter)}
            setDialog={(parameter) => setPdfDialogOpen(parameter)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
