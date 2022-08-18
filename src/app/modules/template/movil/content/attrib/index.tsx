import { Fragment, useContext } from 'react'
import Textos from './textos'
import { ContentContext } from '../../context'
const Index = () => {
    const { editItem } = useContext(ContentContext)
    return (
        <Fragment>
            { 
                editItem.type === 'text' && <Textos/>
            }
        </Fragment>   
    )
}

export default Index