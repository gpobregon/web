/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, FC } from 'react'
import { generateRandomString, updateData } from '../../../../../../utility/global/index'
import ItemEditable from '../../index'
import { Col } from 'react-bootstrap'
import { useDrop } from "react-dnd"

type Model = {
    data: any
    section: number,
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
    removeItem: (data: any) => void
    saveResourceElement: (data: string) => void
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

const NewCol: FC<Model> = ({ section, data, moveCard, setEditItem, updateElement, removeItem, saveResourceElement }) => {
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
        console.log(Element)
        setItems((items: any) => Element)
        setEditChildrenItem(Element)
        setCount((count: number) => count = 1)
    }

    const updateElementChildren = (item: []) => {
        setEditChildrenItem(item)
        const elements = (section === 0 ? data.section1 : data.section2 )
        const response = updateData(elements, item)
        const newItem = {
            ...data,
            section1: (section === 0 ? response : [...data.section1]),
            section2: (section === 1 ? response : [...data.section2])
        }
        updateElement(newItem)
    }

    useEffect(() => {
        if (count === 1) {
            const newItem = {
                ...data,
                section1: (section === 0 ? [...data.section1, items] : [...data.section1]),
                section2: (section === 1 ? [...data.section2, items] : [...data.section2])
            }
            updateElement(newItem)
            setCount((count) => count = 0)
        }
    }, [count])
    return (
        <Col className="border border-opacity-10" style={{ minHeight: '100px' }} ref={drop}>
            {
                (section === 0 ? data.section1 : data.section2).map((item: any, index: number) => {
                    return (
                        <div key={index}>
                            <ItemEditable
                                key={index}
                                data={item}
                                id={item.id}
                                index={index}
                                moveCard={moveCard}
                                removeItem={removeItem}
                                setEditItem={setEditChildrenItem}
                                updateElement={updateElementChildren}
                                saveResourceElement={saveResourceElement}
                            />
                        </div>
                    )
                })
            }
        </Col>
    )
}

export default NewCol