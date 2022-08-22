/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { setDataList } from '../../../../../utility/global/index'

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  cursor: 'grabbing',
}

type Model = {
    data: any
    isDragging: any
    referencia: any
    handlerId: any
    setEditItem: (data : any) => void
    updateElement: (data : any) => void
}

const Text: FC<Model> = ({ isDragging, referencia, handlerId, data, setEditItem, updateElement }) => { 

    const changeText = (e : any) => {

        const edit = {
            ...data,
            item: setDataList(e.target)
          }
        updateElement(edit)
    }

// const RenderItem = (data : any) => {
//     return (
//         <ul className={data.typeList ? `list-group ${data.typeList}` : ''}>
//             { 
//                 data.item.map((item: any, index: number) => <li key={index} className={`${data.typeList ? 'list-group-item item-list' : ''}`}>{ item.value }</li>)
//             }
//         </ul>
//     )
// }
console.log(data)
    return (
        <div 
            ref={referencia}
            style={{ ...style, border: isDragging ? "1px dashed #009EF7" : "0px" }}
            data-handler-id={handlerId}
            className={`editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(e) => changeText(e)}
            onClick={() => setEditItem(data)}
        >  
           {/* { 
                data.item.length === 0 &&  */}
                <ul className={data.typeList ? `list-group ${data.typeList}` : ''}>
                    <li className={data.typeList ? `list-group-item item-list` : ''}>{data.text}</li>
                </ul>
        {/* //    } */}
            {/* {
             data.item.length > 0 && RenderItem(data)
           }   */}
        </div> 
    )
}

export default Text