// context/todoContext.tsx
import { createContext, FC, useState, useCallback, useEffect } from 'react'
import { WithChildren } from '../../../utility/models/childrenContext'
import { updateData, validElement, generateRandomString } from '../../../utility/global/index'
import { getData, postData } from '../../../services/api'
import update from 'immutability-helper'
import { useDrop } from "react-dnd"
import swal from 'sweetalert'

export const ContentContext = createContext<any | null>(null)

export const ContentProvider: FC<WithChildren> = ({children}) => {
    const [board, setBoard] = useState<any>([])
    const [oldBoard, setOldBoard] = useState<any>([])
    const [language, setLanguage] = useState<any>([])
    const [changeLaguage, setChangeLaguage] = useState<any>([])
    const [changeTypeEdit, setChangeTypeEdit] = useState<number>(1)
    let [count, setCount] = useState(0)
    const [editItem, setEditItem] = useState<any>([])

    const addElement = (data : any) => {
        const response = validElement(data.type)
        const result = response.filter((item : any) => data.id === item.id);
        setCount(count+=1)
        const item = result[0]
        setBoard((board: [] ) => 
          [
            ...board,
            { 
              ...item,
              id: generateRandomString(7),
              text: `${item.text} ${(board.length + 1)}`,
              index: (board.length + 1) }
          ]
        );
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

  const changeLangegeSelect = (data : any) => {
    setChangeLaguage(data)
    oneData(data)
  }

  // get all data
  const getLenguate = async () => {
    const response: any = await getData('language/select')
    setLanguage(response ? response.data : [])
    setChangeLaguage(response ? response.data : [])
    oneData(response ? response.data : [])
  }
  // obtenermos el template 
  const oneData = async ( item : any) => {
    const data = {
            "id_punto": 1,
            "id_lenguaje": item.value
          }
    const response: any = await postData('site/mobile/getone', data)
   if (response.data.length > 0 ) { 
      setBoard(JSON.parse(response.data[0].contenido))
      setOldBoard(JSON.parse(response.data[0].contenido))
    } else {
      setBoard([])
      setOldBoard([])
    }
  }
  // guardamos el template
  const storeTemplate = async () => {
    const dataTemplate = {
        "id_punto": 1,
        "id_lenguaje": changeLaguage.value,
        "nombre":"Nombre editado3 sitio movil 1",
        "descripcion":"descripcion2 editado sitio movil 1",
        "contenido": JSON.stringify(board),
        "version": "version sitio movil 1",
        "estado":1
    }
    const response: any = await postData('site/mobile/set', dataTemplate)
    response &&
      swal(
        {
          text: '¡Configuración almacenada exitosamente!',
          icon: 'success',
        }
      )
  }

  // elimina items dragados en el editor
  const removeItem = (data : any) => {
    const newBoard = board.filter((item : any) => String(item.id) !== String(data))
    setBoard(newBoard)
  }
  // descarta los cambios realizados dentro del editor
  const discardChange = () => {
    setBoard(oldBoard)
  }
  
  useEffect(() => {
    getLenguate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

//   useEffect(() => {
//     if (count === 1) {
//         setEditItem(board[board.length-1])
//         setCount(0)
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [count, board])

    const value = {
        drop,
        board,
        oneData,
        language,
        editItem,
        moveCard,
        removeItem,
        setEditItem,
        discardChange,
        updateElement,
        storeTemplate,
        changeLaguage,
        changeTypeEdit,
        setChangeLaguage,
        setChangeTypeEdit,
        changeLangegeSelect
    }
    return (
        <ContentContext.Provider value={value}>
            { children }
        </ContentContext.Provider>
    )
}