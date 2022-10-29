/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState, useContext, useRef, Fragment } from "react";
import { Row, Col, Image, Popover, OverlayTrigger, Form } from 'react-bootstrap'
import { useContextMenu } from "react-contexify";
import MenuDoubleClick from '../../../menu/doubleClick'
import ContextMenu from '../../../menu/contextMenu'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { ContentContext } from '../../../../../modules/template/movil/context'

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

  const { changeTypeEdit } = useContext(ContentContext)

  const idMenu = `menu-${data.id}`
  const nameMenu = `custom-${data.id}`

  const { show } = useContextMenu({ id: idMenu })

  const { show: showMenu2 } = useContextMenu({ id: nameMenu })

  const [dataSelect, setDataSelect] = useState<any>([])

  const valor1 = useRef<HTMLInputElement>(null)
  const valor2 = useRef<HTMLInputElement>(null)

  function ValidarFechas() {

    if (valor1.current && valor2.current) {
      if (Date.parse(valor1.current.value) <= Date.parse(valor2.current.value)) {
        return true
      }
      else {
        return false
      }
    }
  }

  const changeSizeTitle = (item: {}) => {
    if (data.type === 'event') {
      if (ValidarFechas()) {
        const ele = {
          ...data,
          ...item
        }
        updateElement(ele)
      }
    } else {
      const ele = {
        ...data,
        ...item
      }
      updateElement(ele)
    }

  }

  const destroyItem = (e: any) => {
    removeItem(dataSelect.id);
    setEditItem([])
  }

  const OpenMenu = (e: any, data: any) => {
    setEditItem(data)
    setDataSelect(data)
    show(e)
  }

  const popoverClick = (
    <Popover id="popover-basic" style={{ transform: 'translate(-366px, 317px)', width: '358px' }}>
      <Popover.Header as="h3">Horario</Popover.Header>
      <Popover.Body>
        {(data.type === 'schedule' || data.type === 'event') &&
          <Fragment>
            <Row className="py-1 w-80">
              <Col className="mx-1 px-0">
                <Form.Label><small>{data.type === 'schedule' ? 'Título' : 'Descripción'}</small></Form.Label>
                  <Form.Control
                    defaultValue={data.text}
                    placeholder="escribe un título"
                    size="sm"
                    onChange={(e: any) => changeSizeTitle({ text: e.target.value })}
                  />
              </Col>
            </Row>
            <Row className="py-1 pb-3">
              <Col className="mx-1 px-0">
                <Form.Label><small>Hora inicial</small></Form.Label>
                <Form.Control
                  size="sm"
                  ref={valor1}
                  defaultValue={data.startHour}
                  type='time'
                  onChange={(e: any) => changeSizeTitle({ startHour: e.target.value })}
                />
              </Col>
              <Col className="mx-1 px-0">
                <Form.Label><small>Hora Final</small></Form.Label>
                <Form.Control
                  size="sm"
                  ref={valor2}
                  defaultValue={data.finalHour}
                  type='time'
                  onChange={(e: any) => changeSizeTitle({ finalHour: e.target.value })}
                />
              </Col>
            </Row>
          </Fragment>
        }
      </Popover.Body>
    </Popover>
  );

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
          {
            changeTypeEdit === 1 &&
            (
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
            )
          }

          {
            changeTypeEdit === 2 && (
              <OverlayTrigger
                trigger="click"
                placement="left"
                overlay={popoverClick}
              >
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
              </OverlayTrigger>
            )
          }
        </Col>
      </Row>
    </div>
  )
}

export default Schedule