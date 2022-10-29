/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-self-compare */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, useContext, useRef, Fragment, useEffect } from "react";
import { Row, Col, Popover, OverlayTrigger, Form } from 'react-bootstrap'
import { useContextMenu } from "react-contexify";
import MenuDoubleClick from '../../../menu/doubleClick'
import ContextMenu from '../../../menu/contextMenu'
import { meses } from '../../../../../utility/global/data'
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
const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

  const { changeTypeEdit } = useContext(ContentContext)

  const [dias, setDias] = useState('')
  const [textMes, setTextMeses] = useState('')
  const [anios, setAnio] = useState('')

  const idMenu = `menu-${data.id}`

  const nameMenu = `custom-${data.id}`

  const { show } = useContextMenu({ id: idMenu })

  const { show: showMenu2 } = useContextMenu({ id: nameMenu })

  const [dataSelect, setDataSelect] = useState<any>([])

  const getSplitDate = (date: any, type: number) => {

    let response;
    if (type === 1) {
      response = date.split('-')[2];
    } else if (type === 2) {
      response = meses[Number(date.split('-')[1] - 1)];
    } else if (type === 3) {
      response = date.split('-')[0];
    }
    return response;
  }

  const changeText = (item: {}) => {
    const ele = {
      ...data,
      ...item
    }
    updateElement(ele)
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

  const setearFechas = (item: any) => {
    if (item.finalDate === item.startDate || item.finalDate === '0000-00-00' || item.finalDate === '') {
      setDias(getSplitDate(item.startDate, 1))
      setTextMeses(getSplitDate(item.startDate, 2) || 'Mes')
      setAnio(getSplitDate(item.startDate, 3))
    } else {
      if (item.startDate !== '0000-00-00') {
        if (Date.parse(item.startDate) <= Date.parse(item.finalDate)) {
          // setea el dia
          setDias(`${getSplitDate(item.startDate, 1)} - ${getSplitDate(item.finalDate, 1)}`)
          // valida meses y setea meses
          if (getSplitDate(item.startDate, 2) === getSplitDate(item.finalDate, 2)) {
            setTextMeses(getSplitDate(item.startDate, 2))
          } else {
            setTextMeses(`${getSplitDate(item.startDate, 2)} - ${getSplitDate(item.finalDate, 2)}`)
          }
          // valida anio y setea anios
          if (getSplitDate(item.startDate, 3) === getSplitDate(item.finalDate, 3)) {
            setAnio(getSplitDate(item.startDate, 3))
          } else {
            setAnio(`${getSplitDate(item.startDate, 3)} - ${getSplitDate(item.finalDate, 3)}`)
          }
        }
      }
    }
  }

  useEffect(() => {
    setearFechas(data)
  }, [data])


  const popoverClick = (
    <Popover id="popover-basic" style={{ transform: 'translate(-366px, 317px)', width: '358px' }}>
      <Popover.Header as="h3">Horario</Popover.Header>
      <Popover.Body>
        <Fragment>
          <Row className="py-1 w-80">
            <Col className="mx-1 px-0">
              <Form.Label><small>Descripción</small></Form.Label>
              <Form.Control
                defaultValue={data.text}
                placeholder="escribe un título"
                size="sm"
                rows={3}
                as="textarea"
                onChange={(e: any) => changeText({ text: e.target.value })}
              />
            </Col>
          </Row>
          <Row className="py-1 pb-3">
            <Col className="mx-1 px-0">
              <Form.Label><small>Fecha inicial</small></Form.Label>
              <Form.Control
                size="sm"
                defaultValue={data.startDate}
                type='date'
                onChange={(e: any) => changeText({ startDate: e.target.value })}
              />
            </Col>
            <Col className="mx-1 px-0">
              <Form.Label><small>Fecha Final</small></Form.Label>
              <Form.Control
                size="sm"
                defaultValue={data.finalDate}
                type='date'
                onChange={(e: any) => changeText({ finalDate: e.target.value })}
              />
            </Col>
          </Row>
        </Fragment>
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

      {
        changeTypeEdit === 1 &&
        (
          <Row className={`my-2 flex-shrink-1 w-100 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}>
            <Col lg={4} sm={4} xs={5}>
              <div className="d-flex flex-column text-center border rounded">
                <div className="p-2 small">{ anios }</div>
                <div className="p-2 border-bottom small">{ textMes }</div>
                <div className="p-2">
                  { dias }
                </div>
              </div>
            </Col>
            <Col lg={8} sm={8} xs={8}>
              {data.text}
            </Col>
          </Row>
        )
      }
      {
        changeTypeEdit === 2 && (
          <OverlayTrigger
            trigger="click"
            placement="left"
            overlay={popoverClick}
          >
            <Row className={`my-2 flex-shrink-1 w-100 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}>
              <Col lg={4} sm={4} xs={5}>
                <div className="d-flex flex-column text-center border rounded">
                  <div className="p-2 small">{ anios }</div>
                  <div className="p-2 border-bottom small">{ textMes }</div>
                  <div className="p-2">
                    { dias }
                  </div>
                </div>
              </Col>
              <Col lg={8} sm={8} xs={8}>
                {data.text}
              </Col>
            </Row>
          </OverlayTrigger>
        )
      }
    </div>
  )
}

export default Text