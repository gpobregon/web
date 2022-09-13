/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Row, Col } from 'react-bootstrap'
import { Menu, Item, useContextMenu } from "react-contexify";

type Model = {
    data: any
    referencia: any
    handlerId: any
    isDragging : any
    setEditItem: (data : any) => void
    updateElement: (data : any) => void
    removeItem: (data : any) => void
}
const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => { 
  
  const { show } = useContextMenu({ id: "menu-id" });  
    
    const destroyItem = ( e : any) => {
      removeItem(e.triggerEvent.target.id);
      setEditItem([])
    }

    return ( 
          <div
            ref={referencia}
            data-handler-id={handlerId}
            className="d-flex cursor-grabbing"
          >
            <div onContextMenu={show} className="p-1 py-1 d-flex align-items-center">
              <i id={data.id} className="bi bi-grip-vertical fa-2x"/>
            </div>
            <Menu id="menu-id" theme="dark">
              <Item id="delete" onClick={(e : any) => destroyItem(e)}>
                <i className="bi bi-x-circle-fill text-danger pe-4"/>Quitar Elemento
              </Item>
            </Menu>
            <Row className="w-100">
              <Col></Col>
              <Col></Col>
            </Row>
          </div>
    )
}

export default Text