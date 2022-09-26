import { useContext } from 'react'
import Modal from 'react-bootstrap/Modal';
import { LoadingContext } from './context'

const Loading = () => {

    const {showLoad, setShowLoad} = useContext(LoadingContext)

    return (
        <Modal show={showLoad} onHide={() => setShowLoad(false)} centered>
            <div className="card card-custom card-flush py-5">
                <div className="card-body py-5 text-center h5">
                    Porfavor espere... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                </div>
            </div>
        </Modal>
    );
}

export default Loading;
