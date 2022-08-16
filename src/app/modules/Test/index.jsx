import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./components/DragDrop";
const Index = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App">
            <DragDrop />
            </div>
        </DndProvider>
    )
}

export default Index