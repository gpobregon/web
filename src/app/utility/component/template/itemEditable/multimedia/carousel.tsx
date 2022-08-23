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
           Carousel
        </div>

    )
}

export default Video