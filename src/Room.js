import React, { createContext, useRef, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import RightSidebar from './components/RightSidebar/RightSidebar';

export const FigmaContext = createContext()

function Room() {

  const [selectedTextObj, setSelectedTextObj] = useState(null);
  const [selectedFont, setSelectedFont] = useState('sans-serif');

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [layersArr, setLayersArr] = useState([]);

  const canvasRef = useRef(null);

  return (
    <FigmaContext.Provider value={{layersArr,setLayersArr,selectedTextObj,setSelectedTextObj,selectedFont,setSelectedFont,width,setWidth,height,setHeight}}>
      <main className="h-screen overflow-hidden w-full">
        <Navbar canvasRef={canvasRef}/>
        <section className="lower-container flex flex-row w-full" style={{ height: '94%' }}>
          <LeftSidebar />
          <canvas ref={canvasRef} />
          <RightSidebar />
        </section>
      </main>
    </FigmaContext.Provider>
  );
}

export default Room;



