/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";

type Model = {
    data: any
    referencia: any
    handlerId: any
    setEditItem: (data: any) => void
}

const Image: FC<Model> = ({ referencia, handlerId, data, setEditItem }) => {

    return (

        <div
            onClick={() => setEditItem(data)} 
            ref={referencia} 
            data-handler-id={handlerId}
            className={`editable p-3`}
        >
            Imagen Dragada
        </div>

    )
}

export default Image