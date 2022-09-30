/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Row, Col, Image } from 'react-bootstrap'
import { Menu, Item, useContextMenu } from "react-contexify";
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'

type Model = {
  data: any
  referencia: any
  handlerId: any
  isDragging: any
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  removeItem: (data: any) => void
}
const Schedule: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

  const { show } = useContextMenu({ id: "menu-id" });

  const destroyItem = (e: any) => {
    removeItem(e.triggerEvent.target.id);
    setEditItem([])
  }

  const saveElement = (e: any) => {
    // saveResourceElement(e.triggerEvent.target.id)
  }

  return (
    <div
      ref={referencia}
      data-handler-id={handlerId}
      onClick={() => setEditItem(data)}
      className="d-flex cursor-grabbing my-1"
    >
      <div className="p-1 py-1 d-flex align-items-center" onContextMenu={show} id={data.id}>
        <i className="bi bi-grip-vertical fa-2x" id={data.id} />
      </div>
      <Menu id={"menu-id"} theme="dark" data-test={data}>
        <Item onClick={(e: any) => destroyItem(e)}>
          <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
        </Item>
        <Item onClick={(e: any) => saveElement(e)}>
          <i className="fa fa-save text-success pe-4" />Guardar Recurso
        </Item>
      </Menu>
      <Row id={data.id} className="d-flex justify-content-center w-100">
        <Col lg={8} sm={12} xs={12} className={`my-0 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}>
          <div id={data.id} className="border rounded-pill py-1">
            <Row className="d-flex justify-content-center">
              <Col id={data.id} lg={2} className="d-flex justify-content-center align-items-center">
                <Image
                  alt="Logo"
                  className={`max-h-50px cursor-pointer my-3`}
                  height="20px"
                  src={toAbsoluteUrl(`/media/svg/iconsFigma/Time.svg`)}
                />
              </Col>
              <Col id={data.id} lg={6} className="d-flex flex-column">
                <small>{data.text}</small>
                <span>{data.startHour} -  {data.finalHour} </span>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Schedule