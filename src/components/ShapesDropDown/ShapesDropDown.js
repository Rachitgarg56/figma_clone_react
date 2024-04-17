import React, { useContext, useState } from 'react'
import './ShapesDropDown.css'
import shapesArr from '../../utils/shapes'
import { FigmaContext } from '../../App';


const ShapesDropDown = ({addShape}) => {

  const {layersArr, setLayersArr} = useContext(FigmaContext);
  const [shapeCount, setShapeCount] = useState(0);

  const getIcon = (shape) => {
    const arr = shapesArr.filter((shapeObj) => {
      return shapeObj.shape === shape
    })
    return arr[0].icon;
  }

  const addLayer = (shape) => {
    const newLayersArr = [...layersArr];
    for (let idx = 0; idx < newLayersArr.length; idx++) {
      const obj = newLayersArr[idx]
      if (obj.layer === shape) {
        obj.count += 1;
        setLayersArr(newLayersArr)
        return;
      }
    }
    const icon = getIcon(shape)
    setLayersArr([...layersArr, { layer: shape, count: 1, icon: icon, id: layersArr.length+1 }])
  }

  return (
    <div className='absolute bg-white top-0 p-4 z-50'>

      <ul className='flex flex-col gap-4 w-full h-full'>

        {
            shapesArr.map((shape) => {
                return (
                    <li key={shape.id} className='flex items-center gap-4' onClick={()=>{
                      addShape(shape.shape)
                      addLayer(shape.shape)
                    }}>
                        {shape.icon}
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
