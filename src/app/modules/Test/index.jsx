import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Targets from './targets'
import Target2 from './target2'

const Ejemplo = () => {
  return (
    <DndProvider backend={HTML5Backend}>
        <Targets />
        <Target2 />
    </DndProvider>
  )
}

export default Ejemplo