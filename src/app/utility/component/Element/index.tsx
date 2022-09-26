/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { useDrag } from "react-dnd"
import { Image } from 'react-bootstrap';
import { toAbsoluteUrl } from '../../../../_metronic/helpers'

type Model = {
    data: { 
        id: Number,
        type: String,
        typeIcon: String,
        icon:String,
        text: String,
        size: String,
        textAling: String,
        fontWeight: String,
        fontFamily: String,
        textDecoration: String
    }
    setEditItem: (data : any) => void
    updateElement: (data : any) => void
}

const Text: FC<Model> = ({ data, setEditItem, updateElement }) => { 
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { data },
        collect: (monitor) => {
          return({
            isDragging: !!monitor.isDragging(),
          })
        }
      }));
    return (
        <div style={{ border: isDragging ? "1px dashed #009EF7" : "0px" }} className="bkg-dark content-icon rounded my-2" ref={drag}>
            <div className="icon-wrapper">
                {
                    data.typeIcon === "bi" ? 
                        (<i className={`bi bi-${data.icon} fs-1 text-white`} /> ) : 
                        (<Image
                            alt="Logo"
                            className={`max-h-100px cursor-pointer`}
                            src={toAbsoluteUrl(`/media/svg/iconsFigma/${data.icon}`)}
                        />)
                }
            </div>
            <p className="icon-name text-truncate mb-0 mt-1 small">{data.text}</p>
        </div>
    )
}

export default Text