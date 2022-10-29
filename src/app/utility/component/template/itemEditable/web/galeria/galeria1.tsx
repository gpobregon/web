/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useEffect } from "react";
import { Row, Col } from 'react-bootstrap'
import { useDrop } from "react-dnd"
import NewCol from '../hero/col'
import { Menu, Item, useContextMenu } from "react-contexify";
import { generateRandomString } from '../../../../../../utility/global/index'
import Image from '../../../../resource/image3'
import Masonry from 'react-masonry-css'

type Model = {
  data: any
  referencia: any
  handlerId: any
  isDragging: any
  removeItem: (data: any) => void
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, moveCard, setEditItem, updateElement, removeItem }) => {

  const { show } = useContextMenu({ id: data.id });

  const [dataSelect, setDataSelect] = useState<any>([])

  const [addResource, setAddResource] = useState<any>([])
  const [count, setCount] = useState<number>(0)

  const breakpointColumnsObj = { default: 2, 1100: 2, 700: 2, 500: 2 }

  const destroyItem = (e: any) => {
    removeItem(dataSelect.id);
    setEditItem([])
  }

  const destroyChildren = (id: string) => {
    const children = data.section2.filter((item: any) => String(item.id) !== String(id))
    setAddResource(children)
    setCount(1)
  }

  const addResourceGaleria = (item: any) => {
    const data = item.item
    console.log(data.tipo)
    if(data.tipo.includes('image')) {
    setAddResource((addResource: []) => [...addResource, { ...data, id: generateRandomString(7) }])
    setCount((count: number) => count = 1)
    }
  }

  const [{ }, dropGraleria] = useDrop(() => ({
    accept: "image",
    drop: (item: any) => addResourceGaleria(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const thumbs = data.section2.map((file: any, index: number) => {
    return (
      file.tipo.includes('image') && <Image key={index} item={file} destroyOneResource={destroyChildren} />
    )
  })

  const OpenMenu = (e: any, data: any) => {
    setEditItem(data)
    setDataSelect(data)
    show(e)
  }

  useEffect(() => {
    if (count === 1) {
      setCount((count) => count = 0)
      const item = {
        ...data,
        section2: addResource
      }
      updateElement(item)
      setEditItem(item)

    }
  }, [count, addResource])

  useEffect(() => {
    setAddResource(data.section2)
  }, [])

  return (
    <div
      ref={referencia}
      data-handler-id={handlerId}
      className="d-flex cursor-grabbing mx-300px"
    >
      <div
        onContextMenu={(e: any) => OpenMenu(e, data)}
        className="p-1 py-1 mx-1"
      >
        <i id={data.id} className="bi bi-grip-vertical fa-2x" onContextMenu={show} />
      </div>
      <Menu id={data.id} theme="dark">
        <Item id="delete" onClick={(e: any) => destroyItem(e)}>
          <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
        </Item>
      </Menu>
      <div className="w-100 me-3">
        <Row>
        <NewCol
            lg={4}
            section={0}
            data={data}
            sectionData={data.section1}
            setEditItem={setEditItem}
            updateElement={updateElement}
            removeItem={removeItem}
          />
          <Col lg={8} className="border border-opacity-10" tyle={{ minHeight: '100px' }}>

            <Row>
              <Col lg={12} className="py-4">
                <div className="resource-element size-resource-video rounded d-flex justify-content-center align-items-center" style={{ height: '150px' }} ref={dropGraleria}>
                  <span className="text-center">
                    <p><i className="bi bi-arrow-90deg-down text-white" /></p>
                    <p>Arrasta multimedia de los recursos</p>
                  </span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="p-4">
                <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                  {thumbs}
                </Masonry>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Text