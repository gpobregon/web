/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import Img360 from '../../../carousel/image360'

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
            className={`editable p-5`}
        >
            <Img360/>
        </div>

    )
}

export default Video