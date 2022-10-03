import { useDrag } from "react-dnd"

import { FC } from 'react'
type Props = {
    item: any
    destroyOneResource: (id : number) => void
}
const AudioResource: FC<Props> = ({ item, destroyOneResource }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { item },
        collect: (monitor) => {
          return({
            isDragging: !!monitor.isDragging(),
          })
        }
      }));

        let Icono 
        if (item.tipo.includes('audio')) {
            Icono = 'music-note'
        } else if (item.tipo.includes('video')) {
            Icono = 'film'
        }
    return (
        <div style={{ border: isDragging ? "1px dashed #009EF7" : "0px" }} className="bkg-dark content-icon rounded p-2 text-center w-50 d-inline-block"  ref={drag}>
            <div className="icon-wrapper">
                <i className={`bi bi-${Icono} fa-4x text-white`}></i>
            </div>
            <div className="d-flex">
                <div className="p-2 w-100 icon-name text-truncate mb-0 mt-1 small">{ item.nombre }</div>
                <div className="p-2 flex-shrink-1"><i className="fa fa-trash text-danger position-relative" onClick={() => destroyOneResource(item.id_recurso)} /></div>
            </div>
        </div>
    )
}

export default AudioResource