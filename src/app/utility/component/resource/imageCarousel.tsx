/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment } from "react";
import { Image } from 'react-bootstrap';
import { useDrag } from "react-dnd"

type Model = {
    item: any
    selectedItem: any
    selected: any
    setSelected: (id: any) => void
}

const ImageItem: FC<Model> = ({ item, selectedItem, selected, setSelected }) => {
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
            <div style={{ border: isDragging ? "1px dashed #009EF7" : "0px" }} className={`${(selectedItem.includes(Number(item.id_recurso)) || Number(selected.id_recurso) === Number(item.id_recurso)) ? 'active-element' : 'bkg-dark'} ${(selectedItem.includes(selected.id_recurso) && selected.id_recurso === item.id_recurso) ? 'bg-danger' : ''} content-icon rounded p-3 w-100`} ref={drag} onClick={() => setSelected(item)}>
                <div className="icon-wrapper">
                    <Image
                        alt="Logo"
                        className={`w-100 cursor-pointer pb-3 rounded-top`}
                        src={item.url}
                    />
                </div>
                <div className="d-flex">
                    <div className="p-2 w-100 icon-name text-truncate mb-0 mt-1 small">{item.nombre}</div>
                </div>
            </div>
        </Fragment>
    )
}

export default ImageItem