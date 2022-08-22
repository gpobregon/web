/* eslint-disable react-hooks/exhaustive-deps */
import { FC, Fragment } from "react";
import { Image } from 'react-bootstrap';
import { useDrag } from "react-dnd"

type Model = {
    data: any
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
                <Image
                    alt="Logo"
                    className={`w-100 cursor-pointer pb-3`}
                    src={data.preview}
                    onLoad={() => { URL.revokeObjectURL(data.preview) }}
                />
                </div>
                <p className="icon-name text-truncate mb-0 mt-1 small">{ data.name }</p>
            </div>
        </Fragment>
    )
}

export default ImageItem