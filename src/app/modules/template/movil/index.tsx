import { Fragment } from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ContentProvider } from './context'
import ToolbarTemplate from '../../../../_metronic/layout/components/toolbar/ToolbarTemplate'
import SerctionLeftToolbar from './toolbar/sectionLeftToolbar'
import SerctionRightToolbar from './toolbar/sectionRightToolbar'
import SectionHeader from './sectionHeader/index'
import ContentMovil from './content/index'
import '../../../../_metronic/assets/css/style.css'

const Index = () => {
    return (
        <Fragment>
            <DndProvider backend={HTML5Backend}>
                <ContentProvider>
                    <ToolbarTemplate sectionLeft={<SerctionLeftToolbar/>} sectionRight={<SerctionRightToolbar/>}/>
                    <SectionHeader/>
                    <ContentMovil/>
                </ContentProvider>
            </DndProvider>
        </Fragment>
    )
}

export default Index