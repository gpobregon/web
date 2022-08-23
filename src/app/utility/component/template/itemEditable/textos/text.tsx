/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment } from "react";
import ContentEditable from "react-contenteditable";
import {
    Menu,
    Item,
    useContextMenu
  } from "react-contexify";

// const style = {

// }

type Model = {
    data: any
    referencia: any
    handlerId: any
    isDragging : any
    setEditItem: (data : any) => void
    updateElement: (data : any) => void
    removeItem: (data : any) => void
}
const MENU_ID = "menu-id";
const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement, removeItem }) => { 
    const { show } = useContextMenu({
        id: MENU_ID
      });
      function handleItemClick( handlerId : any){
        removeItem(data);
      }
    
    const changeText = (e : any) => {
        const edit = {
          ...data,
          text: e.target.value
        }
        updateElement(edit)
    }
    return ( 
        <Fragment>
        <div onContextMenu={show}>        
        <ContentEditable
                innerRef={referencia}
                data-handler-id={handlerId}
                className={`editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
                html={ `${data.text}` } // innerHTML of the editable div
                disabled={false} // use true to disable edition
                onChange={changeText} // handle innerHTML change
                onClick={() => setEditItem(data)}
            />
            </div>
            <Menu id={MENU_ID} theme="dark">
                <Item onClick={() => handleItemClick(handlerId)}>
                    <i className="bi bi-x-circle-fill text-danger pe-4"/>Quitar Elemento
                </Item>
            </Menu>
        </Fragment>
        
    )
}

export default Text