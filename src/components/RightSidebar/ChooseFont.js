import React, { useContext } from 'react'
import { FigmaContext } from '../../App';

const ChooseFont = () => {

  const { setSelectedFont, selectedTextObj, selectedFont } = useContext(FigmaContext);

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
    if (selectedTextObj) {
      // selectedTextObj.set('fontFamily', e.target.value);
      selectedTextObj.fontFamily = e.target.value;
    }
  }

  return (
    <div className="px-5 pt-4">
        <h1>Text</h1>
        <select className='bg-gray-900 mt-4' value={selectedFont} onChange={handleFontChange}>
            <option value="sans-serif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
        </select>
    </div>
  )
}

export default ChooseFont
