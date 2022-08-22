/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
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
    },
    setEditItem: (data : any) => void
    updateElement: (data : any) => void
}

const Paragraph: FC<Model> = ({ data, setEditItem, updateElement }) => { 
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
                <i className="bi bi-justify-left fs-1 text-white"></i>
            </div>
            <p className="icon-name text-truncate mb-0 mt-1">Párrafo</p>
        </div>
    )
}

export default Paragraph