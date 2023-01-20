/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useCallback } from "react";
import NewCol from './col'
import { Row, Col } from 'react-bootstrap'
import { Menu, Item, useContextMenu } from "react-contexify";

type Model = {
  data: any
  referencia: any
  handlerId: any
  isDragging: any
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  removeItem: (data: any) => void
  moveCard: (dragIndex: number, hoverIndex: number) => void
}
const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, moveCard, setEditItem, updateElement, removeItem }) => {

  const { show } = useContextMenu({ id: "menu-id" });
  const [forbidDrag, setForbidDrag] = useState(false)
  const destroyItem = (e: any) => {
    removeItem(e.triggerEvent.target.id);
    setEditItem([])
  }

  const onToggleForbidDrag = useCallback(() => {
    setForbidDrag(!forbidDrag)
  }, [forbidDrag, setForbidDrag])

  return (
    <div
      ref={!forbidDrag ? referencia : null}
      data-handler-id={handlerId}
      className="d-flex cursor-grabbing"
    >
      <input
        type="checkbox"
        className="position-absolute mt-5 ms-3"
        checked={forbidDrag}
        onChange={onToggleForbidDrag}
      />
      <div onContextMenu={show} className="p-1 py-1 d-flex align-items-center">
        <i id={data.id} className="bi bi-grip-vertical fa-2x" />
      </div>
      <Menu id="menu-id" theme="dark">
        <Item id="delete" onClick={(e: any) => destroyItem(e)}>
          <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
        </Item>
      </Menu>
      <div className="w-100 me-3">
        <Row>
          <Col className="border">
            <Row>
              <NewCol
                lg={12}
                section={0}
                data={data}
                sectionData={data.section1}
                removeItem={removeItem}
                setEditItem={setEditItem}
                updateElement={updateElement}
              />
            </Row>
            <Row>
              <NewCol
                lg={12}
                section={1}
                data={data}
                sectionData={data.section2}
                removeItem={removeItem}
                setEditItem={setEditItem}
                updateElement={updateElement}
              />
            </Row>
          </Col>
          <NewCol
            lg={6}
            section={2}
            data={data}
            sectionData={data.section3}
            removeItem={removeItem}
            setEditItem={setEditItem}
            updateElement={updateElement}
          />
        </Row>
      </div>
    </div>
  )
}

export default Text