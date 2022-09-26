/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Menu, Item, useContextMenu } from "react-contexify";
import CustomCarusel from '../../../carousel/index'

type Model = {
    data: any
    referencia: any
    handlerId: any
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
    removeItem: (data : any) => void
}

const Video: FC<Model> = ({ referencia, handlerId, data, setEditItem, updateElement, removeItem }) => {

    const { show } = useContextMenu({ id: "menu-id" });  

    const destroyItem = ( e : any) => {
        removeItem(e.triggerEvent.target.id);
        setEditItem([])
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
                onContextMenu={show} >
            <i className="bi bi-grip-vertical fa-2x" id={data.id}  />
            </div>
            <Menu id={"menu-id"} theme="dark" data-test={data}>
            <Item onClick={(e : any) => destroyItem(e)}>
                <div>
                    <i className="bi bi-x-circle-fill text-danger pe-4"/>Quitar Elemento
                </div>
            </Item>
            </Menu>
            <div id={data.id} className={`editable ${data.textAling} ${data.list.length === 0 ? 'text-center' : ''} w-100`}>
                {
                    data.list.length > 0 ? (<CustomCarusel list={data.list} />) : (<i className={`bi bi-images display-2 text-white`} />)
                }
                
            </div>
        </div>

    )
}

export default Video