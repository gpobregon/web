/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Row } from 'react-bootstrap'
import NewCol from './col'
import { Menu, Item, useContextMenu } from "react-contexify";

type Model = {
  data: any
  referencia: any
  handlerId: any
  isDragging: any
  removeItem: (data: any) => void
  setEditItem: (data: any) => void
  updateElement: (data: any) => void
  moveCard: (dragIndex: number, hoverIndex: number) => void
}

const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, moveCard, setEditItem, updateElement, removeItem }) => {

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
            lg={6}
            section={0}
            data={data}
            sectionData={data.section1}
            setEditItem={setEditItem}
            updateElement={updateElement}
            removeItem={removeItem}
          />
          <NewCol
            lg={6}
            section={1}
            data={data}
            sectionData={data.section2}
            removeItem={removeItem}
            updateElement={updateElement}
            setEditItem={setEditItem}
          />
        </Row>
      </div>
    </div>
  )
}

export default Text