import { useContext } from 'react';
import { ContentContext } from '../context'
const Index = () => {

    const { storeTemplate, discardChange } = useContext(ContentContext)
    return (
        <div className="d-flex align-items-center pt-5 justify-content-center justify-content-lg-end">
            <i 
                className="text-white bi bi-x-lg fs-1 cursor-pointer"
                onClick={() => discardChange()}
            />
            <i 
                className="text-white fa fa-save ms-5 fs-1 cursor-pointer"
                onClick={() => storeTemplate()}
            />
            <i className="text-white bi bi-gear ms-5 fs-1 cursor-pointer"/>
        </div>
    )
}

export default Index