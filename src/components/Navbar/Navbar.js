import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import selectIcon from '../../assets/select.svg';
import shapeElementsIcon from '../../assets/rectangle.svg';
import textIcon from '../../assets/text.svg';
import deleteIcon from '../../assets/delete.svg';
import resetIcon from '../../assets/reset.svg';
import commentsIcon from '../../assets/comments.svg';
import ShapesDropDown from '../ShapesDropDown/ShapesDropDown';


const Navbar = ({createShape}) => {

  const [isDropDown, setIsDropDown] = useState(false);
  const [selectedShape, setSelectedShape] = useState('Circle');

  const handleSelectShape = (shape) => {
    setSelectedShape(shape);
    createShape(shape);
  }

  const handleDropdownClick = () => {
    setIsDropDown(!isDropDown);
  }

  // useEffect(() => {
  //   window.addEventListener('click',()=>{
  //     setIsDropDown(!isDropDown)
  //   })

  //   return () => {
  //     window.removeEventListener('click',()=>{setIsDropDown(!isDropDown)})
  //   }
  // },[])

  
  return (
    <nav className='flex items-center justify-between px-4 py-2' style={{border:'1px solid white'}}>
      <img src={logo} alt="FigPro Logo" width={58} height={20} />

      <ul className='flex flex-row items-center gap-8'>

        <li className='w-6 h-6' ><img alt='' className='w-full h-full cursor-pointer' src={selectIcon} /></li>
        
        <li className='w-6 h-6 flex items-center gap-1'>
          <img alt='' className='w-full h-full cursor-pointer' src={shapeElementsIcon} />
          <i onClick={handleDropdownClick} style={{color:'#C4D3ED', fontSize:'10px'}} className="fa-solid fa-chevron-down cursor-pointer relative">{isDropDown && <ShapesDropDown handleSelectShape={handleSelectShape}/>}</i>
        </li>
        
        <li className='w-6 h-6' ><img alt='' className='w-full h-full cursor-pointer' src={textIcon} /></li>
        <li className='w-6 h-6' ><img alt='' className='w-full h-full cursor-pointer' src={deleteIcon} /></li>
        <li className='w-6 h-6' ><img alt='' className='w-full h-full cursor-pointer' src={resetIcon} /></li>
        <li className='w-6 h-6' ><img alt='' className='w-full h-full cursor-pointer' src={commentsIcon} /></li>

      </ul>

      <div className='avatar rounded-full h-7 w-7 bg-white'></div>
    </nav>
  )
}

export default Navbar
