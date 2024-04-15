import React, { useRef, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import LeftSidebar from './components/LeftSidebar/LeftSidebar';
import RightSidebar from './components/RightSidebar/RightSidebar';
import { fabric } from 'fabric';

function App() {
  const canvasRef = useRef(null);

  // useEffect(() => {
  //   const canvas = new fabric.Canvas(canvasRef.current, {
  //     width: 500,
  //     height: 500,
  //   });

  //   const rect = new fabric.Rect({
  //     left: 100,
  //     top: 100,
  //     fill: 'gray',
  //     width: 20,
  //     height: 20,
  //   });

  //   canvas.add(rect);

  //   // Optionally, you can add more shapes or configure the canvas here

  //   return () => {
  //     // Clean up Fabric.js resources if needed
  //     canvas.dispose();
  //   };
  // }, []);

  return (
    <>
      <main className="h-screen overflow-hidden w-full">
        <Navbar canvasRef={canvasRef}/>
        <section className="lower-container flex flex-row w-full" style={{ height: '94%' }}>
          <LeftSidebar />
          <canvas ref={canvasRef} style={{ width: '70%', border: '10px solid white' }} />
          <RightSidebar />
        </section>
      </main>
    </>
  );
}

export default App;
