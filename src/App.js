import Navbar from './components/Navbar/Navbar'
import LeftSidebar from './components/LeftSidebar/LeftSidebar'
import RightSidebar from './components/RightSidebar/RightSidebar'
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
// import { fabric } from 'fabric';
// import Canvas from './components/Canvas/Canvas';
// import { useEffect, useRef } from 'react';

function App() {

  const {editor, onReady} = useFabricJSEditor();
    
  const createShape = (shape) => {
    // `editor.add${shape}`();
    editor[`add${shape}`]();
    console.log(shape);
  }

  return (
    <>
      <main className="h-screen overflow-hidden w-full">
        <Navbar createShape={createShape} />
        <section className="lower-container flex flex-row w-full" style={{height:'94%'}}>
          <LeftSidebar/>
          {/* <button className='bg-white' onClick={handleClick}>button</button> */}
          {/* <Canvas/> */}
          {/* <canvas style={{width:'70%', border:'10px solid white'}}/> */}
          <FabricJSCanvas className="sample-canvas" onReady={onReady} />
          <RightSidebar/>
        </section>
      </main>
    </>
  );
}

export default App;
