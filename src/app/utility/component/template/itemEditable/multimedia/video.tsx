/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";

type Model = {
    data: any
    referencia: any
    handlerId: any
    setEditItem: (data: any) => void
    updateElement: (data: any) => void
}

const Video: FC<Model> = ({ referencia, handlerId, data, setEditItem, updateElement }) => {

    return (

        <div
            onClick={() => setEditItem(data)} 
            ref={referencia} 
            data-handler-id={handlerId}
            className={`editable p-3`}
        >
            <iframe 
                 
                 className={`rounded ${data.borderRadius} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
                width="100%" 
                height="300" 
                src="https://www.youtube.com/embed/pAE5vJBTbRY" 
                title="Travesia en Guatemala, guía turistica en Guate" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            />
        </div>

    )
}

export default Video