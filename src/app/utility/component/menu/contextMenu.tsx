import { FC, useContext } from "react";
import { Menu, Item } from "react-contexify";
import { ContentContext } from '../../../modules/template/movil/context'

const MenuContext = () => {
    const { ChangeMode, changeTypeEdit, setChangeModeEditor, changeModeEditor } = useContext(ContentContext)

    const destroyItem = (e: any) => {
        console.log(e.triggerEvent.target.id)
    }
    return (
        <Menu id={"menu-id"} theme="dark">
        <Item onClick={destroyItem}>
          <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
        </Item>
        <Item >
          <i className="fa fa-save text-success pe-4" />Guardar Recurso
        </Item>
      </Menu>
    )
}

export default MenuContext