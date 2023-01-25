import React, { useState, useRef, useEffect } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import CustomButton from "../CustomButton/CustomButton";
import html2canvas from "html2canvas";
import { DialogActions } from "@mui/material";
import { DialogContent } from "@mui/material";
import { Dialog } from "@mui/material";
import "./PdfViewer.css";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

export default function PdfViewer(props) {
  const [file, setFile] = useState(props.currentPdf);
  const [numPages, setNumPages] = useState(1);
  const [finalPage, setFinalPage] = useState(null);
  const fileInput = useRef(null);
  const [imageURL, setImage] = useState(null);
  // const [mouseDown, setMouseDown] = useState(false)
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(600);
  const ref = useRef(null);
  const [clipPosition, setClipPosition] = useState({
    left: 0,
    top: 0,
    height: height,
    width: width,
  });
  // const [offset, setOffset] = useState([0,0])

  let mouseDown = false;
  let offset = [0, 0];
  var exportedImageURL;

  const page = document.getElementsByClassName("lol");

  function takeScreenshot() {
    console.log(clipPosition);
    html2canvas(page[0], {
      x: clipPosition.left,
      y: clipPosition.top,
      width: width,
      height: height,
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL();
      setImage(dataUrl);
      canvas.toBlob(function (blob) {
        var file = new File([blob], "screenshot", { type: "image/jpeg" });
        props.setImageURL(file);
        props.setDialog(false);
      }, "image/jpeg");
      // document.getElementById("#previewImage").src = dataUrl;
    });
  }

  const incrementPageNumber = (e) => {
    if (numPages == finalPage) {
      return;
    }
    const num = numPages + 1;
    setNumPages(num);
  };

  const decrementPageNumber = (e) => {
    if (numPages == 1) {
      return;
    }
    const num = numPages - 1;
    setNumPages(num);
  };

  function onFileChange(event) {
    setFile(event.target.files[0]);
    props.setCurrentPdf(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setFinalPage(nextNumPages);
  }

  const handleUploadClick = (e) => {
    fileInput.current.click();
  };

  const handleMouseDown = (e) => {
    mouseDown = true;
    const areaSelector = document.getElementById("areaSelector");
    const areaSelectorRect = areaSelector.getBoundingClientRect();

    offset = [
      areaSelector.offsetLeft - e.clientX,
      areaSelector.offsetTop - e.clientY,
    ];
  };

  const handleMouseMove = (e) => {
    const areaSelector = document.getElementById("areaSelector");
    const areaSelectorRect = areaSelector.getBoundingClientRect();
    let height = areaSelectorRect.height;
    let width = areaSelectorRect.width;

    let top = areaSelectorRect.top;
    let left = areaSelectorRect.left;

    if (mouseDown) {
      areaSelector.style.left = e.clientX + offset[0] + "px";
      areaSelector.style.top = e.clientY + offset[1] + "px";
    }
  };

  const handleMouseUp = (e) => {
    mouseDown = false;
    const areaSelector = document.getElementById("areaSelector");
    const areaSelectorRect = areaSelector.getBoundingClientRect();

    const pageRect = page[0].getBoundingClientRect();

    setClipPosition({
      left: areaSelectorRect.left - pageRect.left,
      top: areaSelectorRect.top - pageRect.top,
      height: areaSelectorRect.height,
      width: areaSelectorRect.width,
    });
  };

  const handleSelectorHeight = (e) => {
    setHeight(Number(e.target.value) * 10);
    // const temp = clipPosition
    // temp.height(Number(e.target.value) * 10)
    // setClipPosition(temp)
  };

  const handleSelectorWidth = (e) => {
    setWidth(Number(e.target.value) * 6);
    // const temp = clipPosition
    // temp.wid(Number(e.target.value) * 6)
    // setClipPosition(temp)
  };

  function returnImageURL() {
    props.setImageURL(takeScreenshot());
  }

  return (
    <div id="pdfViewerContainer">
      {file === null || file === undefined ? null : (
        <div id="pdfContainer">
          <div id="fileContainer">
            <div id="pdfNavigationContainer">
              <CustomButton id="navButton" onClick={decrementPageNumber}>
                Prev
              </CustomButton>
              <p id="pdfPageHeading">{numPages}</p>
              <CustomButton id="navButton" onClick={incrementPageNumber}>
                Next
              </CustomButton>
            </div>
            <div id="documentContainer">
              <Document
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
              >
                <Page className="lol" pageNumber={numPages}>
                  <div
                    ref={ref}
                    style={{ left: 0, top: 0, height: height, width: width }}
                    onMouseDown={handleMouseDown}
                    id="areaSelector"
                  ></div>
                </Page>
              </Document>
            </div>
          </div>
        </div>
      )}
      <div id="pdfUploadContainer">
        <label htmlFor="file"></label>
        <input
          onChange={onFileChange}
          style={{ display: "none" }}
          ref={fileInput}
          type="file"
        />
        <CustomButton
          id="pdfDialogButton"
          onClick={(event) => handleUploadClick(event)}
        >
          Upload pdf file
        </CustomButton>
        {file === null || file === undefined ? null : (
          <>
            <label for="height">Height</label>
            <input
              defaultValue={height / 10}
              onChange={handleSelectorHeight}
              type="range"
            ></input>
            <label for="height">Width</label>
            <input
              id="height"
              defaultValue={width / 6}
              onChange={handleSelectorWidth}
              type="range"
            ></input>
            <CustomButton id="pdfDialogButton" onClick={takeScreenshot}>
              Take Screenshot
            </CustomButton>
          </>
        )}
          <CustomButton
              id="pdfDialogButton"
              onClick={(event) => props.setDialog(false)}
            >
              Close
            </CustomButton>
      </div>
    </div>
  );
}

//src='https://i.picsum.photos/id/688/200/300.jpg?hmac=6_iDeSdl4f6R2Lre1xFrJ9VaO8OQHMJD_PL5lEypBGI'
