// context/todoContext.tsx
import { createContext, FC, useState, useEffect } from 'react'
import { WithChildren } from './interface'
import { useDrop } from "react-dnd"
import { updateData } from '../../../utility/global/index'
// import update from 'immutability-helper'
import { Element } from './data'

export const ContentContext = createContext<any | null>(null)

export const ContentProvider: FC<WithChildren> = ({children}) => {
    const [board, setBoard] = useState<any>([])
    let [N, setN] = useState(0)
    const [editItem, setEditItem] = useState<any>([])

    const addImageToBoard = (id : number) => {
        const result = Element.filter((item) => id === item.id);
        setN(N+=1)
        const item = result[0]
        const newItem = { ...item, index: N, text: `${item.text} ${N}`}
        setEditItem(item)
        setBoard((board: [] ) => [...board, newItem]);
      };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item : any) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const updateElement = (data : []) => {
    setEditItem(data)
    setBoard(updateData(board, data))
  }

    const value = {
        drop,
        board,
        Element,
        setEditItem,
        editItem,
        updateElement
    }
    return (
        <ContentContext.Provider value={value}>
            { children }
        </ContentContext.Provider>
    )
}