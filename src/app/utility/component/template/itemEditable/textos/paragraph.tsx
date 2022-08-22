/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import ContentEditable from "react-contenteditable";

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  cursor: 'grabbing',
}

type Model = {
    data: any
    referencia: any
    handlerId: any
    isDragging: any
    setEditItem: (data : any) => void
    updateElement: (data : any) => void
}

const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement }) => { 

    const changeText = (e : any) => {
        const edit = {
          ...data,
          text: e.target.value
        }
        updateElement(edit)
    }
    return (
        <ContentEditable
            style={{ ...style, border: isDragging ? "1px dashed #009EF7" : "0px" }}
            innerRef={referencia}
            data-handler-id={handlerId}
            className={`editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
            html={ `${data.text}` } // innerHTML of the editable div
            disabled={false} // use true to disable edition
            onChange={changeText} // handle innerHTML change
            onClick={() => setEditItem(data)}
        />
    )
}

export default Text