/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Row, Col } from 'react-bootstrap'
import ContentEditable from "react-contenteditable";
import { Menu, Item, useContextMenu } from "react-contexify";

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
  const { show } = useContextMenu({ id: "menu-id" });

  const destroyItem = (e: any) => {
    removeItem(e.triggerEvent.target.id);
    setEditItem([])
  }

  const changeText = (e: any) => {
    const edit = {
      ...data,
      text: e.target.value
    }
    updateElement(edit)
  }
 
  return (
    <div
      ref={referencia}
      data-handler-id={handlerId}
      className="d-flex cursor-grabbing"
    >
      <div onContextMenu={show} className="p-1 py-1 d-flex align-items-center">
        <i id={data.id} className="bi bi-grip-vertical fa-2x" />
      </div>
      <Menu id="menu-id" theme="dark">
        <Item id="delete" onClick={(e: any) => destroyItem(e)}>
          <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
        </Item>
      </Menu>
      <Row className="w-100">
        <Col>
          <ContentEditable
            id={data.id}
            className={`p-1 lex-shrink-1 w-100 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
            html={`${data.text}`} // innerHTML of the editable div
            disabled={isDragging} // use true to disable edition
            onChange={changeText} // handle innerHTML change
            onClick={() => setEditItem(data)}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Text