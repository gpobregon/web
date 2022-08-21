/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment } from "react";
// import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
// import { Image } from 'react-bootstrap';
import { useDrag } from "react-dnd"

type Model = {
    data: { 
        id: Number,
        type: String,
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

const ImageItem: FC<Model> = ({ data }) => { 
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
        <Fragment>
            <div style={{ border: isDragging ? "1px dashed #009EF7" : "0px" }} className="bkg-dark content-icon rounded my-2" ref={drag}>
                <div className="icon-wrapper">
                    {/* <Image
                        alt="Logo"
                        className={`max-h-100px cursor-pointer`}
                        src={toAbsoluteUrl(`/media/svg/iconsFigma/Event.svg`)}
                    /> */}
                    <i className="bi bi-image fa-2x text-white" />
                </div>
                <p className="icon-name text-truncate mb-0 mt-1 small">Imagen</p>
            </div>
        </Fragment>
    )
}

export default ImageItem