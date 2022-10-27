/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState } from "react";
import { Row, Col } from 'react-bootstrap'
import ContentEditable from "react-contenteditable";
import { useContextMenu } from "react-contexify";
import { stripHtml } from '../../../../../global/index'
import MenuDoubleClick from '../../../../menu/doubleClick'
import ContextMenu from '../../../../menu/contextMenu'

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
  
  const idMenu = `menu-${data.id}`
  const nameMenu = `custom-${data.id}`

  const { show } = useContextMenu({ id: idMenu });

  const { show: showMenu2 } = useContextMenu({ id:  nameMenu }); 

  const [dataSelect, setDataSelect] = useState<any>([])
    
  const changeText = (e: any) => {
    const edit = {
      ...data,
      ...e
    }
    updateElement(edit)
  }

  const destroyItem = (e: any) => {
    removeItem(dataSelect.id);
    setEditItem([])
  }

  const OpenMenu = (e: any, data: any) => {
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
              onContextMenu={(e: any) => OpenMenu(e, data)}
              onDoubleClick={showMenu2}
              id={data.id}
            >
              <i id={data.id} className="bi bi-grip-vertical fa-2x"/>
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
            <Row className="w-100">
              <Col>
                <ContentEditable
                  id={data.id}
                  className={`p-1 lex-shrink-1 w-100 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
                  html={ `${data.text}` } // innerHTML of the editable div
                  disabled={isDragging} // use true to disable edition
                  onChange={(e : any) => changeText({text: stripHtml(e.target.value)})} // handle innerHTML change
                  onClick={() => setEditItem(data)}
                />
              </Col>
              <Col>
                <ContentEditable
                  id={data.id}
                  className={`p-1 lex-shrink-1 w-100 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
                  html={ `${data.text2}` } // innerHTML of the editable div
                  disabled={isDragging} // use true to disable edition
                  onChange={(e : any) => changeText({text2: stripHtml(e.target.value)})} // handle innerHTML change
                  onClick={() => setEditItem(data)}
                />
              </Col>
            </Row>
          </div>
    )
}

export default Text