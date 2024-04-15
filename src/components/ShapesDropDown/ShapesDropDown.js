import React from 'react'
// import { PiRectangleThin } from "react-icons/pi";
const shapesArr = [{id:1, shape:'Rectangle'},{id:2, shape:'Line'},{id:3, shape:'Triangle'},{id:4, shape:'Ellipse'},{id:5, shape:'Polygon'},{id:6, shape:'Star'}];


const ShapesDropDown = ({handleSelectShape}) => {
  return (
    <div className='absolute bg-white top-0 p-4 z-50'>

      <ul className='flex flex-col gap-4 w-full h-full'>

        {
            shapesArr.map((shape) => {
                return (
                    <li key={shape.id} onClick={()=>handleSelectShape(shape.shape)}>
                        <p>{shape.shape}</p>
                    </li>            
                )
            })
        }

      </ul>

    </div>
  )
}

export default ShapesDropDown
