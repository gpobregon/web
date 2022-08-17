import { Fragment, useContext } from "react";
import { useDrag } from "react-dnd";
import { ContentContext } from '../context'

function Text({ data, option }) {
  const { setEditItem, updateElement } = useContext(ContentContext)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: data.id },
    collect: (monitor) => {
      return({
        isDragging: !!monitor.isDragging(),
      })
    }
  }));

  const changeText = (e) => {
    const edit = {
      ...data,
      text: e.currentTarget.textContent
    }
    updateElement(edit)
  } 

  return (
    <Fragment>
      { 
        option === 1 && 
            <p
              className={`editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
              contentEditable={true} 
              suppressContentEditableWarning={true} 
              onClick={() => setEditItem(data)}
              onInput={(e) => changeText(e)}
            >
              { data.text }
            </p>
          }
      { 
        option === 2 && 
          <div style={{ border: isDragging ? "1px dashed #009EF7" : "0px" }} className="bkg-dark content-icon rounded my-2" ref={drag}>
              <div className="icon-wrapper">
                  <i className="bi bi-fonts fs-1"></i>
              </div>
              <p className="icon-name text-truncate mb-0 mt-1">Título</p>
          </div>
      
      }
    </Fragment>
    
  );
}

export default Text;
