/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, FC, useCallback} from 'react'
import {generateRandomString, updateData} from '../../../../../../utility/global/index'
import update from 'immutability-helper'
import ItemEditable from '../../index'
import {Col} from 'react-bootstrap'
import {useDrop} from 'react-dnd'

type Model = {
    data: any
    lg: number
    sectionData: any
    section: number
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
    removeItem: (data: any) => void
}

const NewCol: FC<Model> = ({
    section,
    data,
    sectionData,
    setEditItem,
    updateElement,
    removeItem,
    lg,
}) => {
    const [items, setItems] = useState<any>([])
    const [count, setCount] = useState<number>(0)
    const [editChildrenItem, setEditChildrenItem] = useState<any>([])
    const [items2, setItems2] = useState<any>([])
    const [count2, setCount2] = useState<number>(0)

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'image',
        drop: (item: any) => {
            if (!['1-hero', '2-hero'].includes(item.data.type)) {
                addElement(item.data)
                
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
    }))

    // // Arrastrar elemento
    // const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    //     setItems2((prevCards: any[]) =>
    //         update(prevCards, {
    //             $splice: [
    //                 [dragIndex, 1],
    //                 [hoverIndex, 0, prevCards[dragIndex] as any],
    //             ],
    //         })
    //     )
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //     setCount2((count2: number) => (count2 = 1))
    // }, [])
    const findCard = useCallback(
        (id: any) => {
            const card = items2.filter((c: any) => `${c.id}` === id)[0]
            return {
                card,
                index: items2.indexOf(card),
            }
        },
        [items2]
    )
    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            console.log(dragIndex, hoverIndex, 'Col')
            setItems2((prevCards: any) =>
                update(prevCards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevCards[dragIndex]],
                    ],
                })
            )

            setCount2((count2: number) => (count2 = 1))
        },
        [findCard, items2, setItems2]
    )
    const addElement = (item: any) => {
        const Element = {...item, id: generateRandomString(7), index: generateRandomString(7)}
        setItems((items: any) => Element)
        setEditChildrenItem(Element)
        setCount((count: number) => (count = 1))
    }

    const updateElementChildren = (item: []) => {
        setEditChildrenItem(item)
        const response = updateData(sectionData, item)
        updateElement(EditSeccionChildren(response, 1))
    }

    const EditSeccionChildren = (children: any, type: number) => {
        let newElement = {}
        if (section === 0) {
            newElement = {
                ...data,
                section1: type === 0 ? [...data.section1, children] : children,
            }
        }
        if (section === 1) {
            newElement = {
                ...data,
                section2: type === 0 ? [...data.section2, children] : children,
            }
        }
        if (section === 2) {
            newElement = {
                ...data,
                section3: type === 0 ? [...data.section3, children] : children,
            }
        }
        return newElement
    }

    const destroyChildren = (code: any) => {
        updateElement(EditSeccionChildren(remote(code), 1))
    }

    const remote = (element: any) => {
        let newBoard = {}
        newBoard = sectionData.filter((item: any) => String(item.id) !== String(element))
        return newBoard
    }
    useEffect(() => {
        if (count === 1) {
            updateElement(EditSeccionChildren(items, 0))
            setCount((count) => (count = 0))
        }
    }, [count])

    useEffect(() => {
        if (sectionData.length > 0) {
            setItems2(sectionData)
        }
    }, [sectionData])

    useEffect(() => {
        if (count2 === 1) {
            let elementos = EditSeccionChildren(items2, 1)
            updateElement(elementos)
            setItems(elementos)
            setCount2((count2) => (count2 = 0))
        }
    }, [count2])

    return (
        <Col className='border border-opacity-10 py-5 my-5' lg={lg} style={{minHeight: '100px'}} ref={drop}>
            {sectionData.map((item: any, index: number) => {
                return (
                    <div key={index}>
                        <ItemEditable
                            key={index}
                            data={item}
                            id={item.id}
                            index={index}
                            moveCard={moveCard}
                            removeItem={destroyChildren}
                            setEditItem={setEditChildrenItem}
                            updateElement={updateElementChildren}
                        />
                    </div>
                )
            })}
        </Col>
    )
}

export default NewCol
