import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import selectIcon from '../../assets/select.svg';
import shapeElementsIcon from '../../assets/rectangle.svg';
import textIcon from '../../assets/text.svg';
import deleteIcon from '../../assets/delete.svg';
import resetIcon from '../../assets/reset.svg';
import commentsIcon from '../../assets/comments.svg';
import ShapesDropDown from '../ShapesDropDown/ShapesDropDown';
import { fabric } from 'fabric';

const Navbar = ({canvasRef}) => {

  const [isDropDown, setIsDropDown] = useState(false);
  const [selectedShape, setSelectedShape] = useState('Rectangle');

  const handleSelectShape = (shape) => {
    setSelectedShape(shape);
  }

  const handleDropdownClick = () => {
    setIsDropDown(!isDropDown);
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
      stroke: 'black',
      strokeWidth: 2,
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

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
    });

    let createdShape;

    switch (selectedShape) {
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
        return () => {
          canvas.dispose();
        };
    }

    canvas.add(createdShape);

    // // Optionally, you can add more shapes or configure the canvas here

    return () => {
      // Clean up Fabric.js resources if needed
      canvas.dispose();
    };
  }, [selectedShape]);

  
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
