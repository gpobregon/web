import { FC, useContext } from "react";
import { Menu, Item } from "react-contexify";
import { ContentContext } from '../../../modules/template/movil/context'
import { elementData } from '../../global/index'

type Model = {
  idMenu: string
  destroyItem: (data: any) => void
}

const MenuContext: FC<Model> = ({ destroyItem, idMenu }) => {

  // const elements = ["title", "paragraph", "list", "curious-fact", "regulation", "schedule", "calendar", "event", "image", "video", "audio", "carousel", "image-360", "url", "map"]

  const { handleClose, editItem } = useContext(ContentContext)

  const preventHide = ({ event }: any) => {
    handleClose(true)
    event.stopPropagation();
  }
  return (
    <Menu id={idMenu} theme="dark">
      <Item onClick={(e: any) => destroyItem(e)}>
        <i className="bi bi-x-circle-fill text-danger pe-4" />Quitar Elemento
      </Item>
      {
        elementData.includes(editItem.type) &&
        <Item onClick={preventHide}>
          <i className="fa fa-save text-success pe-4" />Guardar Recurso
        </Item>
      }
    </Menu>
  )
}

export default MenuContext