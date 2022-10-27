/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment } from "react";
import { useDrag } from "react-dnd"

type Model = {
    item: any
    selected: any
    setSelected: (id: any) => void
}

const ImageItem: FC<Model> = ({ item, selected, setSelected }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { item },
        collect: (monitor) => {
            return ({
                isDragging: !!monitor.isDragging(),
            })
        }
    }));


    return (
        <Fragment>
            <div style={{ border: isDragging ? "1px dashed #009EF7" : "0px" }} className={`${selected.id_recurso === item.id_recurso ? 'active-element' : 'bkg-dark'}  content-icon rounded p-3 w-100`} ref={drag} onClick={() => setSelected(item)}>
                <div className="icon-wrapper text-center">
                    <i className={`bi bi-music-note fa-4x text-white`}></i>
                </div>
                <div className="d-flex">
                    <div className="p-2 w-100 icon-name text-truncate mb-0 mt-1 small">{item.nombre}</div>
                </div>
            </div>
        </Fragment>
    )
}

export default ImageItem