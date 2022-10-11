/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState } from "react";
import { Row, Col, Image } from 'react-bootstrap'
import { useContextMenu } from "react-contexify";
import MenuDoubleClick from '../../../menu/doubleClick'
import ContextMenu from '../../../menu/contextMenu'
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

  const idMenu = `menu-${data.id}`
  const nameMenu = `custom-${data.id}`

  const { show } = useContextMenu({ id: idMenu })

  const { show: showMenu2 } = useContextMenu({ id: nameMenu })

  const [dataSelect, setDataSelect] = useState<any>([])

  const destroyItem = (e: any) => {
    removeItem(dataSelect.id);
    setEditItem([])
  }

  const OpenMenu = (e: any, data: any) => {
    setEditItem(data)
    setDataSelect(data)
    show(e)
  }

  return (
    <div
      ref={referencia}
      data-handler-id={handlerId}
      onClick={() => setEditItem(data)}
      className="d-flex cursor-grabbing"
    >
      <div
        className="p-1 py-1 d-flex align-items-center"
        id={data.id}
        onContextMenu={(e: any) => OpenMenu(e, data)}
        onDoubleClick={showMenu2}
      >
        <i className="bi bi-grip-vertical fa-2x" id={data.id} />
      </div>
      <ContextMenu
        destroyItem={destroyItem}
        idMenu={idMenu}
      />
      <MenuDoubleClick
        updateElement={updateElement}
        nameMenu={nameMenu}
        editItem={data}
      />
      <Row id={data.id} className="d-flex justify-content-center w-100">
        <Col lg={9} sm={12} xs={12} className={`my-1 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}>
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