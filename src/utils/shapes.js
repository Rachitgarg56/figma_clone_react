import { BiRectangle } from "react-icons/bi";
import { HiOutlineMinus } from "react-icons/hi2";
import { IoTriangleOutline } from "react-icons/io5";
import { TbOvalVertical } from "react-icons/tb";
import { RiHexagonLine } from "react-icons/ri";
import { AiOutlineStar } from "react-icons/ai";

const shapesArr = [{id:1, shape:'Rectangle', icon: <BiRectangle/>},{id:2, shape:'Line', icon: <HiOutlineMinus/>},
                    {id:3, shape:'Triangle', icon: <IoTriangleOutline/>},{id:4, shape:'Ellipse', icon: <TbOvalVertical/>},
                    {id:5, shape:'Polygon', icon: <RiHexagonLine/>},{id:6, shape:'Star', icon: <AiOutlineStar/>}];

export default shapesArr;