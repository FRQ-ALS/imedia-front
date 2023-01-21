import React, { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import CustomButton from '../../CustomButton/CustomButton';
import html2canvas from 'html2canvas';

import './PdfViewer.css';


const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};

export default function PdfViewer(props) {
  const [file, setFile] = useState();
  const [numPages, setNumPages] = useState(1);
  const [finalPage, setFinalPage] = useState(null)
  const fileInput = useRef(null);
  const [imageURL, setImage] = useState(null)
  // const [mouseDown, setMouseDown] = useState(false)
  const [height, setHeight] = useState(100)
  const [width, setWidth] = useState(600)
  const ref = useRef(null)
  const [boxPosition, setBoxPosition] = useState({
    x: 0,
    y: 0,
    offsetX: 0,
    offsetY: 0,
  })
  const [clipPosition, setClipPosition] = useState({
    left: 0,
    top: 0,
    height: 0,
    width: 0,
  })
  // const [offset, setOffset] = useState([0,0])

  let mouseDown = false;
  let offset = [0,0]

  const page = document.getElementsByClassName("lol")

  function takeScreenshot(){
    console.log(clipPosition)
    html2canvas(page[0], {
        x: clipPosition.left,
        y: clipPosition.top,
        width: clipPosition.width,
        height: clipPosition.height
      }).then(canvas => {
          const dataUrl = canvas.toDataURL();
          console.log(dataUrl)
        setImage(dataUrl)
          document.getElementById("#imagelol").src = dataUrl
      });
  }


  const incrementPageNumber = (e)=>{
    if(numPages==finalPage){
        return
    }
    const num = numPages +1;
    setNumPages(num)
  }

  const decrementPageNumber = (e)=>{
    if(numPages == 1){
        return
    }
    const num = numPages -1;
    setNumPages(num)
  }


  function onFileChange(event) {
    setFile(event.target.files[0]);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setFinalPage(nextNumPages);
  }

  const handleUploadClick = (e) =>{
    fileInput.current.click();
  }

  const handleMouseDown = (e) => {
    mouseDown = true;
    const areaSelector = document.getElementById("areaSelector")
    const areaSelectorRect = areaSelector.getBoundingClientRect()

    offset = [areaSelector.offsetLeft - e.clientX, areaSelector.offsetTop - e.clientY];

    
  }

  const handleMouseMove = (e) =>{

    const areaSelector = document.getElementById("areaSelector")
    const areaSelectorRect = areaSelector.getBoundingClientRect()
    let height = areaSelectorRect.height
    let width = areaSelectorRect.width

    let top = areaSelectorRect.top
    let left = areaSelectorRect.left

    if(mouseDown){
      areaSelector.style.left = e.clientX + offset[0] + 'px'
      areaSelector.style.top = e.clientY + offset[1] + 'px'
    }
  }

  const handleMouseUp = (e) =>{
    mouseDown = false;
    const areaSelector = document.getElementById("areaSelector")
    const areaSelectorRect = areaSelector.getBoundingClientRect()
    console.log(areaSelectorRect)

    const pageRect = page[0].getBoundingClientRect()


      setClipPosition({
        left:areaSelectorRect.left-pageRect.left,
        top:areaSelectorRect.top-pageRect.top,
        height:areaSelectorRect.height,
        width:areaSelectorRect.width
      })
  }

  return (
    <div className="Example">
        <div className="Example__container__load">
          <label htmlFor="file"></label>
          <input onChange={onFileChange} style={{display:"none"}} ref={fileInput} type="file" />
          <CustomButton id="uploadFileButton" onClick={event=>handleUploadClick(event)}>
              {/* {question.image==undefined ? "Upload Image" : "Change Image"} */}Upload pdf file
            </CustomButton>
        </div>
        <CustomButton onClick={decrementPageNumber}>Previous page</CustomButton>
        {numPages}
        <CustomButton onClick={incrementPageNumber}>Next page</CustomButton>

        <div  className="Example__container__document">
          <Document onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            <Page className="lol" pageNumber={numPages}>
            <div ref={ref} style={{left:0, top:0}} 
            onMouseDown={handleMouseDown} id='areaSelector'></div>
            </Page> 
          </Document>
        </div>
        <img id='imagelol' src={imageURL}></img>
        <button onClick={takeScreenshot}>take pic </button>

    </div>
  );
}

//src='https://i.picsum.photos/id/688/200/300.jpg?hmac=6_iDeSdl4f6R2Lre1xFrJ9VaO8OQHMJD_PL5lEypBGI'