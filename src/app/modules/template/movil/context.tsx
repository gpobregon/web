// context/todoContext.tsx
import { createContext, FC, useState, useCallback } from 'react'
import { WithChildren } from '../../../utility/models/childrenContext'
import { updateData, validElement } from '../../../utility/global/index'
import update from 'immutability-helper'
import { useDrop } from "react-dnd"

export const ContentContext = createContext<any | null>(null)

export const ContentProvider: FC<WithChildren> = ({children}) => {
    const [board, setBoard] = useState<any>([])
    const [changeTypeEdit, setChangeTypeEdit] = useState<number>(1)
    let [N, setN] = useState(0)
    const [editItem, setEditItem] = useState<any>([])

    const addElement = (data : any) => {
        const response = validElement(data.type)
        const result = response.filter((item : any) => data.id === item.id);
        setN(N+=1)
        const item = result[0]
        const newItem = { ...item, index: N, text: `${item.text} ${N}`}
        setEditItem(newItem)
        setBoard((board: [] ) => [...board, newItem]);
      };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item : any) => addElement(item.data),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setBoard((prevCards: any[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as any],
        ],
      }),
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const updateElement = (data : []) => {
    setEditItem(data)
    setBoard(updateData(board, data))
  }
  
    const value = {
        drop,
        board,
        editItem,
        moveCard,
        setEditItem,
        updateElement,
        changeTypeEdit, 
        setChangeTypeEdit
    }
    return (
        <ContentContext.Provider value={value}>
            { children }
        </ContentContext.Provider>
    )
}