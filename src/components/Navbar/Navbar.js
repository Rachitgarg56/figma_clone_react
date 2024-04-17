import React, { useContext, useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import selectIcon from '../../assets/select.svg';
import shapeElementsIcon from '../../assets/rectangle.svg';
import textIcon from '../../assets/text.svg';
import deleteIcon from '../../assets/delete.svg';
import resetIcon from '../../assets/reset.svg';
import commentsIcon from '../../assets/comments.svg';
import ShapesDropDown from '../ShapesDropDown/ShapesDropDown';
import { PiTextTThin } from "react-icons/pi";
import { fabric } from 'fabric';
import { FigmaContext } from '../../Room';

const Navbar = ({canvasRef}) => {

  const { setSelectedTextObj, setWidth, setHeight, layersArr, setLayersArr } = useContext(FigmaContext);

  const [selectedObj, setSelectedObj] = useState(null);
  
  const [canvas,setCanvas] = useState(null);
  const [isDropDown, setIsDropDown] = useState(false);

  const handleDropdownClick = () => {
    setIsDropDown(!isDropDown);
  }

  const addShape = (shape) => {
    let createdShape;
    switch (shape) {
      case 'Rectangle':
        createdShape = createRectangle();
        break;
      case 'Line':
        createdShape = createLine();
        break;
      case 'Triangle':
        createdShape = createTriangle();
        break;
      case 'Ellipse':
        createdShape = createEllipse();
        break;
      case 'Polygon':
        createdShape = createPolygon();
        break;
      case 'Star':
        createdShape = createStar();
        break;
      default:
        return;
    }

    canvas.add(createdShape);

  }

  const createRectangle = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'gray',
      width: 20,
      height: 20,
    });
    return rect
  }

  const createLine = () => {
    const line = new fabric.Line([50, 50, 200, 50], {
      stroke: 'gray',
      strokeWidth: 2,
    });
    return line
  }

  const createTriangle = () => {
    const triangle = new fabric.Triangle({
      width: 40,
      height: 40,
      fill: 'gray',
      left: 195,
      top: 95,
      // angle: 90,
    });
    return triangle
  }

  const createEllipse = () => {
    const ellipse = new fabric.Ellipse({
      left: 100,
      top: 200,
      rx: 50,
      ry: 30,
      fill: 'gray',
    });
    return ellipse
  }

  const createPolygon = () => {
    const polygon = new fabric.Polygon([
      { x: 250, y: 250 },
      { x: 300, y: 250 },
      { x: 325, y: 300 },
      { x: 300, y: 350 },
      { x: 250, y: 350 },
      { x: 225, y: 300 },
    ], {
      fill: 'gray',
    });

    return polygon
  }

  const createStar = () => {
    const star = new fabric.Polygon([
      { x: 100, y: 400 },
      { x: 120, y: 440 },
      { x: 160, y: 440 },
      { x: 130, y: 460 },
      { x: 140, y: 500 },
      { x: 100, y: 480 },
      { x: 60, y: 500 },
      { x: 70, y: 460 },
      { x: 40, y: 440 },
      { x: 80, y: 440 },
    ], {
      fill: 'gray',
    });
    return star
  }

  const addText = () => {
    var text = new fabric.Text('hello world', { left: 100, top: 100, fontFamily:'serif', fontSize:20, fill:'white', editable: true });
    canvas.add(text);
  }

  const addTextLayer = () => {
    const newLayersArr = [...layersArr];
    for (let idx = 0; idx < newLayersArr.length; idx++) {
      const obj = newLayersArr[idx]
      if (obj.layer === 'Text') {
        obj.count += 1;
        setLayersArr(newLayersArr)
        return;
      }
    }
    setLayersArr([...layersArr, { layer: 'Text', count: 1, icon: <PiTextTThin/>, id: layersArr.length+1 } ])
  }

  const deleteHandler = () => {
    canvas.remove(selectedObj)
  }

  const removeLayer = () => {
    const layerName = (selectedObj.type);
    const newLayersArr = layersArr.map((layer) => {
      if (layer.layer.toLowerCase() === layerName) {
        layer.count -= 1;
      }
      return layer;
    }).filter((layer) => layer.count > 0)

    setLayersArr(newLayersArr);
  }

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
    });

    setCanvas(newCanvas)

    newCanvas.on('mouse:down', (e)=> {

      if (e.target) {
        setSelectedObj(e.target);
      } else {
        setSelectedObj(null)
      }

      if (e.target && e.target.type === 'text') {
        setSelectedTextObj(e.target);
      } else {
        setSelectedTextObj(null);
        setWidth(0)
        setHeight(0)  
      }
    })

    return () => {
      newCanvas.dispose();
    }

  }, []);

  
  return (
    <nav className='flex items-center justify-between px-4 py-2' style={{border:'1px solid white'}}>
      <img src={logo} alt="FigPro Logo" width={58} height={20} />

      <ul className='flex flex-row items-center gap-8'>

        <li className='w-6 h-6' ><img alt='' className='w-full h-full cursor-pointer' src={selectIcon} /></li>
        
        <li className='w-6 h-6 flex items-center gap-1'>
          <img alt='' className='w-full h-full cursor-pointer' src={shapeElementsIcon} />
          <i onClick={handleDropdownClick} style={{color:'#C4D3ED', fontSize:'10px'}} className="fa-solid fa-chevron-down cursor-pointer relative">{isDropDown && <ShapesDropDown addShape={addShape}/>}</i>
        </li>
        
        <li className='w-6 h-6' onClick={()=>{
          addText()
          addTextLayer()
        }} ><img alt='' className='w-full h-full cursor-pointer' src={textIcon} /></li>

        <li className='w-6 h-6' onClick={()=>{
          deleteHandler()
          removeLayer()
        }} ><img alt='' className='w-full h-full cursor-pointer' src={deleteIcon} /></li>

        <li className='w-6 h-6' onClick={()=>window.location.reload()} ><img alt='' className='w-full h-full cursor-pointer' src={resetIcon} /></li>
        <li className='w-6 h-6' ><img alt='' className='w-full h-full cursor-pointer' src={commentsIcon} /></li>

      </ul>

      <div className='avatar rounded-full h-7 w-7 bg-white'></div>
    </nav>
  )
}

export default Navbar




