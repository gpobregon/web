/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Image, Row } from 'react-bootstrap';
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'

type Model = {
    data: any
    referencia: any
    handlerId: any
    setEditItem: (data : any) => void
    updateElement: (data : any) => void
}

const Url: FC<Model> = ({ referencia, handlerId, data, setEditItem, updateElement }) => { 

    // const changeText = (e : any) => {
    //     const edit = {
    //       ...data,
    //       text: e.target.value
    //     }
    //     updateElement(edit)
    // }
    return (

    <div className="w-100 text-center" onClick={() => setEditItem(data)} >
        <Image
            ref={referencia}
            data-handler-id={handlerId}
            alt="Logo"
            className={`max-h-100px cursor-pointer text-center`}
            src={toAbsoluteUrl(`/media/svg/iconsFigma/FakeMap.svg`)}
        />
    </div>
        
    )
}

export default Url