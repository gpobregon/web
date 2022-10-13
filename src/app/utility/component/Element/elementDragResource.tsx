/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { useDrag } from "react-dnd"
import { Image } from 'react-bootstrap';
import { toAbsoluteUrl } from '../../../../_metronic/helpers'

type Model = {
    data: any
    item: any
    destroyOneResource: (id: number, tipo: number) => void
}

const Text: FC<Model> = ({ data, item, destroyOneResource }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { data },
        collect: (monitor) => {
            return ({
                isDragging: !!monitor.isDragging(),
            })
        }
    }));

    return (
        <div style={{ border: isDragging ? "1px dashed #009EF7" : "0px" }} className="bkg-dark content-icon rounded my-2 text-center" ref={drag}>
            <div className="icon-wrapper">
                {
                    data.typeIcon === "bi" ?
                        (<i className={`bi bi-${data.icon} fs-1 text-white`} />) :
                        (<Image
                            alt="Logo"
                            className={`max-h-100px cursor-pointer`}
                            src={toAbsoluteUrl(`/media/svg/iconsFigma/${data.icon}`)}
                        />)
                }
            </div>
            <div className="icon-name text-truncate mb-0 mt-1 small">
                <div className="d-flex">
                    <div className="p-2 w-100 icon-name text-truncate mb-0 mt-1 small">{item.nombre}</div>
                    <div className="p-2 flex-shrink-1"><i className="fa fa-trash text-danger position-relative" onClick={() => destroyOneResource(item.id_recurso, 2)} /></div>
                </div>
            </div>
        </div>
    )
}

export default Text