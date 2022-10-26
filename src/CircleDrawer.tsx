/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Modal from './Circle_comps/Modal';
import {Circle} from './Circle_comps/model'
import { v4 as uuidv4 } from 'uuid';

const CircleDrawer = () => {

  const [circles, setCircles] = useState<Circle[]>([]) //the truth
  const [hoverID, setHoverID] = useState<string>("")
  const [showModal, setShowModal] = useState<boolean>(false)
  const [history, setHistory] = useState<Circle[][]>([circles]) //the history

  const [histI, setHistI] = useState<number>(1) //(negative) index of history to display.

  //HELPER FUNCTIONS
  const getRads = (arr:Circle[]) => {
    if(arr.length===0)return 0;
    return arr.reduce((acc, { r }) => acc + r, 0);
  }

  const truncHist = () =>{
    const newHist = history.slice(0,history.length-(histI-1))
    setHistI(1)
    return newHist;
  }
  
  const addCircle = (x:number, y:number) => {
    let newCircle: Circle = {key:uuidv4(), x:x, y:y, r:20, fill:"white", stroke:"black", opacity:0.3}

    const newCircles = [...circles, newCircle]
    setCircles(newCircles)
    return newCircles //return this so i can use this to update history vs relying on state to do that because state is for rendering display, not for driving code
  }

  //EVENT HANDLERS
  const handleClick = (x:number, y:number) => {
    if(!hoverID){
      const fixedHist = histI>1 ? truncHist() : history

      const returnedCircles = addCircle(x,y);
      setHistory([...fixedHist, returnedCircles])
    }else{
      setShowModal(true)
    }
  }
  const handleOver = (key:string) => {
    if(!showModal){
      setHoverID(key)
      setCircles(circles.map((c)=> c.key===key?{...c, fill:"red"}:c))
    }
  }
  const handleOff = (key:string) => {
    if (!showModal){
      setHoverID("")
      setCircles(circles.map((c)=> c.key===key?{...c, fill:"white"}:c))
    }
  }

  const canUndo = () => {
    if (history.length > histI) return true;
    return false;
  }

  const canRedo = () => {
    if (histI>1) return true;
    return false;
  }

  const handleUndo = () => {
    if (canUndo()){
      setHistI(histI+1)
      setCircles(history[history.length-(histI+1)])
    }
  }
  const handleRedo = () => {
    if (canRedo()){
      setHistI(histI-1)
      setCircles(history[history.length-(histI-1)])
    }
  }
  
  //USE EFFECTS
  useEffect(() => {
    //if the modal is on or there is zero history, don't do these things
    if (showModal || history.length===0) return;
    handleOff(hoverID)
    //if the modal changed things, update history
    if (getRads(circles)!==getRads(history[history.length-1])){
      //if we've gone back in history, truncate history array to current position
      const fixedHist = histI>1 ? truncHist() : history 
      setHistory([...fixedHist, circles])//when modal closed
    }
  }, [showModal])

  return (
    <div className="thing">
        CircleDrawer
        <svg
            className="canvas" 
            width={400} 
            height={400} 
            onClick={(e)=>handleClick(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}>
              {
                circles.map((circ) =>(
                  <circle
                    className="circle"
                    key={circ.key} 
                    r={circ.r} 
                    cx={circ.x} 
                    cy={circ.y} 
                    fill={circ.fill}
                    stroke={circ.stroke}
                    fillOpacity={circ.opacity}
                    onMouseOver={()=> handleOver(circ.key)}
                    onMouseLeave={()=>handleOff(circ.key)}/>
                ))
              }
        </svg>
        {showModal?(
          <Modal
            setShowModal={setShowModal}
            circleID={hoverID}
            circles={circles}
            setCircles={setCircles}
          />
          ):(null)}
      <button
        disabled={!canUndo()}
        onClick={()=>handleUndo()}
      >undo</button>
      <button
        disabled={!canRedo()}
        onClick={()=>handleRedo()}
      >redo</button>
    </div>
  )
}

export default CircleDrawer