/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
// import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
// import { Image } from 'react-bootstrap';
import { useDrag } from "react-dnd"

type Model = {
    data: any
}

const Video: FC<Model> = ({ data }) => { 
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { data },
        collect: (monitor) => {
          return({
            isDragging: !!monitor.isDragging()
          })
        }
      }));
    return (
        <div 
            style={{ border: isDragging ? "1px dashed #009EF7" : "0px" }} 
            className="bkg-dark content-icon rounded my-2" 
            ref={drag}>
            <div className="icon-wrapper">
                {/* <Image
                    alt="Logo"
                    className={`max-h-100px cursor-pointer`}
                    src={toAbsoluteUrl(`/media/svg/iconsFigma/Event.svg`)}
                /> */}
                <i className="bi bi-link-45deg fa-2x text-white" />
            </div>
            <p className="icon-name text-truncate mb-0 mt-1 small">Url</p>
        </div>
    )
}

export default Video