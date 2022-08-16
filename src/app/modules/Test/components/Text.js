import { Fragment } from "react";
import { useDrag } from "react-dnd";

function Text({ data, option }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: data.id },
    collect: (monitor) => {
      return({
        isDragging: !!monitor.isDragging(),
      })
    }
  }));
  


  return (
    <Fragment>
      { 
        option === 1 && 
          <p
            className={`editable ${data.size} ${data.textAling}`}
            contentEditable={true} 
            suppressContentEditableWarning={true} 
          >
            { data.text }
          </p>}
      { 
        option === 2 && 
          <div style={{ width: '100px', border: isDragging ? "5px dotted pink" : "0px" }} className="bkg-dark content-icon rounded my-2" ref={drag}>
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
