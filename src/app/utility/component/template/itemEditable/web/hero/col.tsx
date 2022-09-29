/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState, useEffect, FC } from 'react'
import { Col } from 'react-bootstrap'
import { useDrop } from "react-dnd"

type Model = {
    data: any
    section: number,
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
    // removeItem: (data : any) => void
}

const NewCol: FC<Model> = ({ section, data, setEditItem, updateElement }) => {
    const [items, setItems] = useState<any>([])
    const [count, setCount] = useState<number>(0)
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item: any) => addElement(item.data),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addElement = (item: any) => {

        setItems((items: any) => item)
        setCount((count: number) => count = 1)

    }

    useEffect(() => {
        if (count === 1) {
            const Sec1 = (section === 0 ? [...data.section1, items] : [...data.section1])
            const newItem = {
                ...data,
                section1: Sec1,
                section2: (section === 1 ? [...data.section2, items] : [...data.section2])
            }
            updateElement(newItem)
            setCount((count) => count = 0)
        }
    }, [count])
    return (
        <Col className="border" style={{ minHeight: '100px' }} ref={drop}>
            {
                (section === 0 ? data.section1 : data.section2).map((item: any, index: number) => {
                    return (
                        <div key={index}>{item.text}</div>
                        // <div key={index}>
                        //     <ItemEditable
                        //         key={index}
                        //         data={data}
                        //         id={item.id}
                        //         index={index}
                        //         moveCard={moveCard}
                        //         removeItem={removeItem}
                        //         setEditItem={setEditItem}
                        //         updateElement={updateElement}
                        //         saveResourceElement={saveResourceElement}
                        //     />
                        // </div>
                    )
                })
            }
        </Col>
    )
}

export default NewCol