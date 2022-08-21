/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import ContentEditable from "react-contenteditable";

type Model = {
    data: any
    referencia: any
    handlerId: any
    setEditItem: (data : any) => void
    updateElement: (data : any) => void
}

const Url: FC<Model> = ({ referencia, handlerId, data, setEditItem, updateElement }) => { 

    const changeText = (e : any) => {
        const edit = {
          ...data,
          text: e.target.value
        }
        updateElement(edit)
    }
    return (

        <div 
            className="position-relative"
            onClick={() => setEditItem(data)}
        >
            <ContentEditable
                innerRef={referencia}
                data-handler-id={handlerId}
                className={`editable input small ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
                html={ `${data.text}` } // innerHTML of the editable div
                disabled={false} // use true to disable edition
                onChange={changeText} // handle innerHTML change
            />
            <i className="fa fa-link input-icon"/>
        </div>
    )
}

export default Url