/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment } from "react";
import { Image } from 'react-bootstrap';
import { useDrag } from "react-dnd"

type Model = {
    item: any
    destroyOneResource: (id : number) => void
}

const ImageItem: FC<Model> = ({ item, destroyOneResource }) => { 
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { item },
        collect: (monitor) => {
          return({
            isDragging: !!monitor.isDragging(),
          })
        }
      }));
    return (
        <Fragment>
            <div style={{ border: isDragging ? "1px dashed #009EF7" : "0px" }} className="bkg-dark content-icon rounded p-2 w-50 d-inline-block" ref={drag}>
                <div className="icon-wrapper">
                <Image
                    alt="Logo"
                    className={`w-100 cursor-pointer pb-3`}
                    src={item.url}
                />
                </div> 
                <div className="d-flex">
                    <div className="p-2 w-100 icon-name text-truncate mb-0 mt-1 small">{ item.nombre }</div>
                    <div className="p-2 flex-shrink-1"><i className="fa fa-trash text-danger position-relative" onClick={() => destroyOneResource(item.id_recurso)} /></div>
                </div>
            </div>
        </Fragment>
    )
}

export default ImageItem