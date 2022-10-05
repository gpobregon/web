import { FC } from "react";
import { Menu, Item } from "react-contexify";

type Model = {
  idMenu: string
  destroyItem: (data: any) => void
  saveElement: (data: any) => void
}

const MenuContext: FC<Model> = ({ destroyItem, saveElement, idMenu }) => {

  return (
    <Menu id={idMenu} theme="dark">
      <Item onClick={(e: any) => destroyItem(e)}>
        <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
      </Item>
      <Item onClick={(e: any) => saveElement(e)}>
        <i className="fa fa-save text-success pe-4" />Guardar Recurso
      </Item>
    </Menu>
  )
}

export default MenuContext