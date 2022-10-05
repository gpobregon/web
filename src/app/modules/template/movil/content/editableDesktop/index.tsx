import { Fragment, useContext } from 'react'
import ItemEditable from '../../../../../utility/component/template/itemEditable/index'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ContentContext } from '../../context'
import { Col } from 'react-bootstrap'

const EditableDesktop = () => {
    const { drop, board, saveResourceElement, updateElement, moveCard, setEditItem, removeItem } = useContext(ContentContext)
    return (
        <Fragment>
            <Col lg={12}>
                <div className="bkg-dark rounded height-section-editable p-4" style={{ height: '565px' }} ref={drop}>
                    <PerfectScrollbar component="div" style={{ height: '550px', width: "100%", paddingBottom: '100px' }}>
                        {
                            board.map((item: any, index: number) => {
                                return (
                                    item &&
                                    <div key={index}>
                                        <ItemEditable
                                            key={index}
                                            data={item}
                                            id={item.id}
                                            index={index}
                                            moveCard={moveCard}
                                            removeItem={removeItem}
                                            setEditItem={setEditItem}
                                            updateElement={updateElement}
                                            saveResourceElement={saveResourceElement}
                                        />
                                    </div>
                                )
                            })}
                    </PerfectScrollbar>
                </div>
            </Col>
        </Fragment>
    )
}

export default EditableDesktop