import React, { useContext } from 'react'
import { FigmaContext } from '../../Room';

const WidthHeightInputs = () => {

  const {selectedTextObj} = useContext(FigmaContext);

  const handleWidthChange = (e) => {
    if (selectedTextObj) {
      // selectedTextObj.width = e.target.value;
      const newWidth = parseInt(e.target.value); // Convert input value to an integer
      // const currentScaleX = selectedTextObj.scaleX; // Get the current scaleX value
      const newScaleX = newWidth / selectedTextObj.width; // Calculate the new scaleX based on the new width
      selectedTextObj.set('scaleX', newScaleX); // Set the new scaleX value
      selectedTextObj.set('width', newWidth); // Set the new width value
    }
  }

  const handleHeightChange = (e) => {
    if (selectedTextObj) {
      // selectedTextObj.height = e.target.value;
      const newHeight = parseInt(e.target.value); // Convert input value to an integer
      // const currentScaleY = selectedTextObj.scaleY; // Get the current scaleY value
      const newScaleY = newHeight / selectedTextObj.height; // Calculate the new scaleY based on the new height
      selectedTextObj.set('scaleY', newScaleY); // Set the new scaleY value
      selectedTextObj.set('height', newHeight); 
    }
  }


  return (
    <div className="px-5 py-4 flex flex-col gap-2 mt-4">

      <div className="input-container flex gap-4">
        <label className='bg-gray-900' style={{width:'20%', textAlign:'center'}}>W</label>
        <input
          className='bg-gray-900'
          style={{width:'80%'}}
          type="number"
          id="widthInput"
          // value={width}
          defaultValue={0}
          onChange={handleWidthChange}
        />
      </div>

      <div className="input-container flex gap-4">
      <label className='bg-gray-900' style={{width:'20%', textAlign:'center'}}>H</label>
        <input
          className='bg-gray-900'
          style={{width:'80%'}}
          type="number"
          id="heightInput"
          // value={height}
          defaultValue={0}
          onChange={handleHeightChange}
        />
      </div>
     
    </div>
  )
  
}

export default WidthHeightInputs
