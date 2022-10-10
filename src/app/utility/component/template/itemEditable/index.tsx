import type { Identifier, XYCoord } from 'dnd-core'
import { FC, Fragment, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Paragraph from "./textos/paragraph"
import Schedule from './informacion/schedule'
import Text from './textos/text'
import List from "./textos/list"
import Url from "./otros/url"
import Map from "./otros/map"

import Video from "./multimedia/video"
import Audio from "./multimedia/audio"
import Carousel from "./multimedia/carousel"
import Image360 from "./multimedia/image360"
import Picture from "./multimedia/image"

import Event from "./informacion/event"
// Web
import Hero1 from "./web/hero/hero1"
import Hero2 from "./web/hero/hero2"

import Content1 from "./web/contenido/contenido1"
import Content2 from "./web/contenido/contenido2"

import Galeria from "./web/galeria/galeria1"
import Galeria2 from "./web/galeria/galeria2"

import Footer1 from './web/footer/footer1'
import Footer2 from './web/footer/footer2'

export interface CardProps {
  id: any
  data : any
  index: any
  moveCard: (dragIndex: number, hoverIndex: number) => void
  setEditItem: (data : any) => void
  updateElement: (data : any) => void
  removeItem: (data : any) => void
}

export const ItemEditable: FC<CardProps> = ({ id, data, index, moveCard, updateElement, setEditItem, removeItem }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<any, void, { handlerId: Identifier | null }>({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => { return { id, index } },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  
  return (
    <Fragment>
      { data.type === 'title' && <Text removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'paragraph' && <Paragraph removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'list' && <List removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'schedule' && <Schedule removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'url' && <Url removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'map' && <Map removeItem={removeItem} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      
      { data.type === 'video' && <Video removeItem={removeItem} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'audio' && <Audio removeItem={removeItem} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'carousel' && <Carousel removeItem={removeItem} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'image-360' && <Image360 removeItem={removeItem} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'image' && <Picture removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'event' && <Event removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}

      { data.type === '1-hero' && <Hero1 moveCard={moveCard} removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === '2-hero' && <Hero2 moveCard={moveCard} removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}

      { data.type === 'contenido1' && <Content1 removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'contenido2' && <Content2 removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}

      { data.type === 'galeria1' && <Galeria removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId} moveCard={moveCard} />}
      { data.type === 'galeria2' && <Galeria2 removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId} moveCard={moveCard} />}

      { data.type === 'footer1' && <Footer1 removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId} />}
      { data.type === 'footer2' && <Footer2 removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId} />}
    </Fragment>
  )
}


export default ItemEditable