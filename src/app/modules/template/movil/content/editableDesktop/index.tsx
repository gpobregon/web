import { Fragment, useContext } from 'react'
import { Col } from 'react-bootstrap'
import ItemEditable from '../../../../../utility/component/template/itemEditable/index'
import { ContentContext } from '../../context'

const EditableDesktop = () => {
    const { drop, board, updateElement, moveCard, setEditItem, removeItem } = useContext(ContentContext)
    return (
        <Fragment>
            <Col lg={12}>
                <div className="bkg-dark rounded height-section-editable p-4" ref={drop}>
                    {
                        board.map((item : any, index : number) => {

                            return (
                                <div key={index}>
                                    <ItemEditable 
                                        key={index} 
                                        data={item} 
                                        id={item.id}
                                        index={index}
                                        removeItem={removeItem}
                                        moveCard={moveCard}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                </div>
                            )
                        })}
                </div>
            </Col>
        </Fragment>
    )
}

export default EditableDesktop