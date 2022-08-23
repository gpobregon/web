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

export interface CardProps {
  id: any
  data : any
  index: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  setEditItem: (data : any) => void
  updateElement: (data : any) => void
  removeItem: (data : any) => void
}

export const ItemEditable: FC<CardProps> = ({ id, data, index, moveCard, updateElement, setEditItem, removeItem }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<
    any,
    void,
    { handlerId: Identifier | null }
  >({
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
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    // <div ref={ref} data-handler-id={handlerId}>
    //   {text}
    // </div>
    <Fragment>
      { data.type === 'title' && <Text removeItem={removeItem} isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'paragraph' && <Paragraph isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'list' && <List isDragging={isDragging} referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'schedule' && <Schedule referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'url' && <Url referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'map' && <Map referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      
      { data.type === 'video' && <Video referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'audio' && <Audio referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
      { data.type === 'carousel' && <Carousel referencia={ref} data={data} updateElement={updateElement} setEditItem={setEditItem} handlerId={handlerId}/>}
    </Fragment>
  )
}


export default ItemEditable