/* eslint-disable no-self-compare */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment, useState } from "react";
import { Row, Col } from 'react-bootstrap'
import { useContextMenu } from "react-contexify";
import MenuDoubleClick from '../../../menu/doubleClick'
import ContextMenu from '../../../menu/contextMenu'
import { meses } from '../../../../../utility/global/data'

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

      <Row className={`py-2 flex-shrink-1 w-100 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}>
        <Col lg={4} sm={4} xs={5}>
          <div className="d-flex flex-column text-center border rounded">
            <div className="p-2 small">{(getSplitDate(data.startDate, 3) === getSplitDate(data.finalDate, 3)) ? getSplitDate(data.startDate, 3) : `${getSplitDate(data.startDate, 3)} - ${getSplitDate(data.finalDate, 3)}`}</div>
            <div className="p-2 border-bottom small">{getSplitDate(data.startDate, 2)  || 'Mes'} { getSplitDate(data.finalDate, 2) !== getSplitDate(data.startDate, 2) ? `- ${getSplitDate(data.finalDate, 2)}` : '' }</div>
            <div className="p-2">
              {
                (data.finalDate === data.startDate || data.finalDate === '0000-00-00' || data.finalDate === '') ? getSplitDate(data.startDate, 1) : <Fragment>{getSplitDate(data.startDate, 1)} - {getSplitDate(data.finalDate, 1)}</Fragment>
              }
            </div>
          </div>
        </Col>
        <Col lg={8} sm={8} xs={8}>
          {data.text}
        </Col>
      </Row>
    </div>
  )
}

export default Text