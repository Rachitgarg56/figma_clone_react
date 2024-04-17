import React, { useContext } from 'react';
import { FigmaContext } from '../../Room';

function ChooseFontWeight() {

  const { selectedTextObj } = useContext(FigmaContext);

  const handleFontWeightNumChange = (event) => {
    if (selectedTextObj) {
      selectedTextObj.fontWeight = event.target.value;
    }
  };

  const handleFontWeightTextChange = (event) => {
    if (selectedTextObj) {
      selectedTextObj.fontWeight = event.target.value;
    }
  };

  return (
    <div className="flex px-5 py-4 gap-2">
      <div className="left-container w-1/2">
        <select className='bg-gray-900 w-full' onChange={handleFontWeightNumChange}>
          <option value="400">400</option>
          <option value="500">500</option>
          <option value="600">600</option>
          <option value="700">700</option>
          <option value="800">800</option>
        </select>
      </div>
      <div className="right-container w-1/2">
        <select className='bg-gray-900 w-full' onChange={handleFontWeightTextChange}>
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="bolder">Bolder</option>
          <option value="lighter">Lighter</option>
          <option value="400">Regular</option>
          <option value="500">Medium</option>
          <option value="600">Semi Bold</option>
          <option value="700">Bold</option>
          <option value="800">Extra Bold</option>
        </select>
      </div>
    </div>
  );
}

export default ChooseFontWeight;
