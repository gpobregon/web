import { useContext } from 'react';
import { ContentContext } from '../context'
const Index = () => {

    const { toogleSave, discardChange } = useContext(ContentContext)
    return (
        <div className="d-flex align-items-center pt-5 justify-content-center justify-content-lg-end pe-5">
            <div className="tooltip-container me-5">
                <i 
                    className="text-white bi bi-x-lg fs-1 cursor-pointer tooltip-trigger"
                    onClick={() => discardChange()}
                />
                <div className="tooltip-one">
                    Cancelar
                </div>
            </div>
            <div className="tooltip-container me-5">
                <i 
                    className="text-white fa fa-save fs-1 cursor-pointer tooltip-trigger"
                    onClick={() => toogleSave()}
                />
                <div className="tooltip-one"> 
                    Guardar
                </div>
            </div>

            <div className="tooltip-container me-5">
                <i className="text-white bi bi-gear fs-1 cursor-pointer tooltip-trigger"/>
                <div className="tooltip-one">
                    Configuración
                </div>
            </div>
            
        </div>
    )
}

export default Index