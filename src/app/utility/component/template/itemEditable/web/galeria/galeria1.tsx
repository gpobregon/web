/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Row, Col } from 'react-bootstrap'
import NewCol from '../hero/col'
import { Menu, Item, useContextMenu } from "react-contexify";

type Model = {
  data: any
  referencia: any
  handlerId: any
  isDragging: any
  removeItem: (data: any) => void
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  saveResourceElement: (data: string) => void
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, saveResourceElement, moveCard, setEditItem, updateElement, removeItem }) => {

  const { show } = useContextMenu({ id: "menu-id" });
  const { show: showMenu2 } = useContextMenu({ id: "menu-custom" });

  const destroyItem = (e: any) => {
    removeItem(e.triggerEvent.target.id);
    setEditItem([])
  }

  return (
    <div
      ref={referencia}
      data-handler-id={handlerId}
      className="d-flex cursor-grabbing"
    >
      <div onContextMenu={show} onDoubleClick={showMenu2} className="p-1 py-1 d-flex align-items-center">
        <i id={data.id} className="bi bi-grip-vertical fa-2x" />
      </div>
      <Menu id="menu-id" theme="dark">
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
            moveCard={moveCard}
            removeItem={removeItem}
            saveResourceElement={saveResourceElement}
          />
          <Col className="border border-opacity-10" tyle={{ minHeight: '100px' }}>
          
            <Row>
              <Col lg={12}>
                <div className="resource-element size-resource-video rounded d-flex justify-content-center align-items-center" style={{ height: '150px'}}>
                    <span className="text-center">
                        <p><i className="bi bi-arrow-90deg-down text-white" /></p>
                        <p>Arrasta multimedia de los recursos</p>
                    </span>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                Imagenes
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Text