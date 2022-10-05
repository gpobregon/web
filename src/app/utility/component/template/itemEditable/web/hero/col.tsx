/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, FC } from 'react'
import { generateRandomString, updateData } from '../../../../../../utility/global/index'
import ItemEditable from '../../index'
import { Col } from 'react-bootstrap'
import { useDrop } from "react-dnd"

type Model = {
    data: any
    lg: number
    sectionData: any
    section: number
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
    removeItem: (data: any) => void
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

const NewCol: FC<Model> = ({ section, data, sectionData, moveCard, setEditItem, updateElement, removeItem, lg }) => {
    const [items, setItems] = useState<any>([])
    const [count, setCount] = useState<number>(0)
    const [editChildrenItem, setEditChildrenItem] = useState<any>([])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item: any) => addElement(item.data),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addElement = (item: any) => {
        const Element = {...item, id: generateRandomString(7), index: generateRandomString(7)}
        setItems((items: any) => Element)
        setEditChildrenItem(Element)
        setCount((count: number) => count = 1)
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
                section1: type === 0 ? [...data.section1, children] : children
            }
        }
        if (section === 1) {
            newElement = {
                ...data,
                section2: type === 0 ? [...data.section2, children] : children
            }
        }
        if (section === 2) {
            newElement = {
                ...data,
                section3: type === 0 ? [...data.section3, children] : children
            }
        }
        return newElement
    }

    const destroyChildren = (code:any) => {
        updateElement(EditSeccionChildren(remote(code), 1))
    }

    const remote = (element:any) => {
        let newBoard = {}
        newBoard = sectionData.filter((item: any) => String(item.id) !== String(element))
        return newBoard
    }
    useEffect(() => {
        if (count === 1) {
            updateElement(EditSeccionChildren(items, 0))
            setCount((count) => count = 0)
        }
    }, [count])
    return (
        <Col className="border border-opacity-10" lg={lg} style={{ minHeight: '100px' }} ref={drop}>
            {
                sectionData.map((item: any, index: number) => {
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
                })
            }
        </Col>
    )
}

export default NewCol