/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment } from "react";
import { Row, Col } from 'react-bootstrap'
import { Menu, Item, useContextMenu } from "react-contexify";
import { meses } from '../../../../../utility/global/data'

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

    const getSplitDate = (date : any, type: number) => {
      
      let response;
      if( type === 1) {
        response = date.split('-')[2];
      } else if (type === 2) {
        response = meses[Number(date.split('-')[1]-1)];
      } else if( type === 3) {
        response = date.split('-')[0];
      }
      return response;
    }
    console.log(data.finalDate)
    return ( 
          <div
            onContextMenu={show}
            ref={referencia}
            data-handler-id={handlerId}
            onClick={() => setEditItem(data)}
            className="d-flex cursor-grabbing"
          >
            <div className="p-1 py-1 d-flex align-items-center">
              <i className="bi bi-grip-vertical fa-2x"/>
            </div>
            <Row className={`py-2 flex-shrink-1 w-100 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}>
              <Col lg={3} sm={4} xs={5}>
                <div className="d-flex flex-column text-center border rounded">
                  <div className="p-2 border-bottom">{getSplitDate(data.startDate, 2) || 'Mes'}</div>
                  <div className="p-2">
                    { 
                      (data.finalDate === data.startDate || data.finalDate === '0000-00-00' || data.finalDate === '') ? getSplitDate(data.startDate, 1) : <Fragment>{getSplitDate(data.startDate, 1)} - {getSplitDate(data.finalDate, 1)}</Fragment>
                    }
                  </div>
                  {/* <small>{getSplitDate(data.startDate, 3)}</small> */}
                </div>
              </Col>
              <Col lg={9} sm={8} xs={8}>
                {data.text}
              </Col>
            </Row>
            <Menu id={"menu-id"} theme="dark" data-test={data}>
              <Item onClick={(e : any) => destroyItem(e)}>
                <div>
                    <i className="bi bi-x-circle-fill text-danger pe-4"/>Quitar Elemento
                </div>
              </Item>
            </Menu>
          </div>
    )
}

export default Text