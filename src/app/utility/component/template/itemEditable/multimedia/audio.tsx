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
            className={`editable py-3`}
        >
            <audio controls autoPlay >
            <source src="https://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg" type="audio/ogg" />
            <source src="horse.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>

    )
}

export default Video