import update from 'immutability-helper'
import shuffle from 'lodash/shuffle.js'
import { memo, useCallback, useEffect, useState } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { Box } from './box2'
import { Dustbin } from './dustbin2'
import { ItemTypes2 } from './ItemTypes'
export const Container = memo(function Container() {
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes2.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes2.FOOD], lastDroppedItem: null },
    {
      accepts: [ItemTypes2.PAPER, ItemTypes2.GLASS, NativeTypes.URL],
      lastDroppedItem: null,
    },
    { accepts: [ItemTypes2.PAPER, NativeTypes.FILE], lastDroppedItem: null },
  ])
  const [boxes, setBoxes] = useState([
    { name: 'Bottle', type: ItemTypes2.GLASS },
    { name: 'Banana', type: ItemTypes2.FOOD },
    { name: 'Magazine', type: ItemTypes2.PAPER },
  ])
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  useEffect(() => {
    const interval = setInterval(() => {
      setBoxes(shuffle(boxes))
      setDustbins(shuffle(dustbins))
    }, 4000)
    return () => clearInterval(interval)
  })
  const isDropped = (boxName) => droppedBoxNames.indexOf(boxName) > -1
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
      setDroppedBoxNames(
        update(
          droppedBoxNames,
          name
            ? {
                $push: [name],
              }
            : {},
        ),
      )
    },
    [dustbins, droppedBoxNames],
  )
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            accepts={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {boxes.map(({ name, type }, index) => (
          <Box
            name={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>
    </div>
  )
})


export default Container