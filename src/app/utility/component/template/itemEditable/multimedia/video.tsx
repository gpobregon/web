/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Menu, Item, useContextMenu } from "react-contexify";

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
            <div id={data.id} className={`editable ${data.textAling} w-100`}>
                {
                    data.url ? ( 
                    <video width="100%" height="240" controls autoPlay className={`rounded ${data.borderRadius} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}>
                        <source src={data.url}  type="video/mp4" />
                        <source src={data.url}  type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                    ) :
                    (
                    <div className="bkg-dark content-icon rounded my-2 text-center" >
                        <div className="icon-wrapper">
                            <i className={`bi bi-film fa-4x text-white`}></i>
                        </div>
                    </div>
                    )
                }  
            </div>
          </div>
    )
}

export default Video