import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../styles/main.css'

function Main() {
  const [isDrawing, setIsDrawing] = useState(false)
  const [sketchData, setSketchData] = useState('')
  const [sketchName, setSketchName] = useState('')
  const [createdBy, setCreatedBy] = useState('63431309f142fa46ebb7fa67')
  const [collaborators, setCollaborators] = useState([])
  const canvasRef = useRef(null);
  const tool = useRef(null);


  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    const context = canvas.getContext("2d")
    context.scale(2, 2);
    context.lineCap = "round";

    // need to replace the color with variable that contains user specific color
    context.strokeStyle = "#000000";
    // console.log(context.strokeStyle)
    context.lineWidth = 5;
    // console.log(context)
    tool.current = context;

  }, [])


  const start = (e) => {
    tool.current.beginPath();
    tool.current.moveTo(e.clientX, e.clientY);
    setIsDrawing(true);
  };

  const end = () => {
    tool.current.closePath();
    setIsDrawing(false);
  };

  const drawing = (e) => {
    if (!isDrawing) {
      return;
    }
    tool.current.lineTo(e.clientX, e.clientY);
    tool.current.stroke();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  const imagedataupload = async () => {
    const canvas = canvasRef.current
    let uploadUrl = canvas.toDataURL()
    // console.log(uploadUrl)
    let sketchObj = {
      sketchName,
      sketchData: uploadUrl,
      createdBy,
      collaborators
    }
    let response = await axios.post('/sketch/uploadSketch', sketchObj)
    console.log(response.data)

  }

  const setImage = () => {
    var img = new Image()
    let downloadURL
    img.src = downloadURL
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d")
    context.drawImage(img, 0, 0, window.innerHeight, window.innerWidth)
  }

  return (
    <div>
      <div className='main'>
        <canvas onMouseDown={start} onMouseUp={end} onMouseMove={drawing} ref={canvasRef} className='main-canvas' ></canvas>
        <div className='main-actions'>
          <div className="main-toolbar">

            <button onClick={clear} className="clear">Clear</button>
            <button onClick={imagedataupload} className="clear">Save</button>

            <DropdownButton className="sketches" id="dropdown-basic-button" title="Sketches">
              <Dropdown.Item href="#/action-1">Sketch 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Sketch 2</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-3">New Sketch</Dropdown.Item>
            </DropdownButton>

            <DropdownButton className="sketches" id="dropdown-basic-button" title="Collaborators">
              <Dropdown.Item href="#/action-1">Collaborator</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Collaborator2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Akshay</Dropdown.Item>
            </DropdownButton>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Main