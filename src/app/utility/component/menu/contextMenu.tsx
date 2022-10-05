import { FC, useContext } from "react";
import { Menu, Item } from "react-contexify";
import { ContentContext } from '../../../modules/template/movil/context'

type Model = {
  idMenu: string
  destroyItem: (data: any) => void
  saveElement: (data: any) => void
}

const MenuContext: FC<Model> = ({ destroyItem, saveElement, idMenu }) => {
  
  const { handleClose } = useContext(ContentContext)

  const preventHide =  ({ event }: any) => {
    handleClose(true)
    event.stopPropagation();
  }
  return (
    <Menu id={idMenu} theme="dark">
      <Item onClick={(e: any) => destroyItem(e)}>
        <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
      </Item>
      <Item onClick={preventHide}>
        <i className="fa fa-save text-success pe-4" />Guardar Recurso
      </Item>
    </Menu>
  )
}

export default MenuContext