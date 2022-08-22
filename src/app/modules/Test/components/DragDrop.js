import { Fragment, useState, useCallback } from "react";
import update from 'immutability-helper';
import Picture from "./Picture";
import Text from "./Text";
import { DragElement } from "./element";
import { useDrop } from "react-dnd";
import "../App.css";

const Element = [
  {
    id: 1,
    type: "image",
    text: '1',
    url:
      "https://mott.pe/noticias/wp-content/uploads/2018/03/10-trucos-para-saber-c%C3%B3mo-tomar-fotos-profesionales-con-el-celular-portada.jpg",
  },
  {
    id: 2,
    type: "image",
    text: '2',
    url:
      "https://los40.com/los40/imagenes/2021/02/01/moda/1612173150_942410_1612173448_gigante_normal.jpg",
  },
  {
    id: 3,
    type: "image",
    text: '3',
    url:
      "https://i.pinimg.com/564x/15/81/4b/15814bcbe69d06b95a94d128fffe65d0.jpg",
  },
  {
    id: 4,
    type: "text",
    text: 'Título',
    size: "h1",
    textAling: "text-center",
    fontWeight: "normal",
    fontFamily: "fw-normal"

  }
];

function DragDrop() {
  const [board, setBoard] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = Element.filter((picture) => id === picture.id);
    setBoard((board) => [...board, pictureList[0]]);
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setBoard((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])

  return (
    <>
      <div className="Pictures">
        {Element.map((item, index) => {
          return (
            <Fragment key={index}>
            { item.type === 'image' && <Picture key={index} data={item} /> }
            { item.type === 'text' && <Text key={index} data={item} option={1}/>}
          </Fragment>
          )
        })}
      </div>
      <div className="Board" ref={drop}>
        {board.map((item, index) => {
          return (
            <Fragment key={index}>
            { item.type === 'image' && 
              <DragElement 
                key={index} 
                data={item} 
                index={index}
                id={item.id} 
                moveCard={moveCard} 
                text={`elemento ${item.text}`} 
              /> }
            {/* { item.type === 'text' && <Text key={index} data={item} option={2}/>} */}
          </Fragment>
            
          )
        })}
      </div>
    </>
  );
}

export default DragDrop;
