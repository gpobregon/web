import { FC } from 'react'
import { Menu, Item } from "react-contexify";
import { Button, ButtonGroup } from 'react-bootstrap'

type Model = {
    editItem: any
    nameMenu: string
    updateElement: (data: any) => void
}

const MenuDoubleClick: FC<Model> = ({ editItem, nameMenu, updateElement }) => {
    
    const changeSizeTitle = (e: any, data: any) => {
       let edit = {}

       if (data.typeList === 'list-group-points') {
        edit = { 
            content: editItem.content.replace('list-group list-group-bg list-group-numbered', 'list-group-points').replace('list-group-item', 'add-item')
         }
       } else if (data.typeList === 'list-group-numbered' ) {
        edit = { 
            content: editItem.content.replace('list-group-points', 'list-group list-group-bg list-group-numbered').replace('add-item', 'list-group-item')
         } 
        } else {
            edit = { ...data }
        }
        const item = {
            ...editItem,
            ...edit,
            typeList: data.typeList
        }
        updateElement(item)
    }

    return (
        <Menu id={nameMenu} theme="dark" className="custom-menu-double">

            {editItem.type === 'title' &&
                <Item className="d-flex justify-content-center">
                    <ButtonGroup aria-label="Basic example" size="sm">
                        <Button size="sm" onClick={(e: any) => changeSizeTitle(e, { size: 'h1' })}>H1</Button>
                        <Button size="sm" onClick={(e: any) => changeSizeTitle(e, { size: 'h2' })}>H2</Button>
                        <Button size="sm" onClick={(e: any) => changeSizeTitle(e, { size: 'h3' })}>H3</Button>
                        <Button size="sm" onClick={(e: any) => changeSizeTitle(e, { size: 'h4' })}>H4</Button>
                        <Button size="sm" onClick={(e: any) => changeSizeTitle(e, { size: 'h5' })}>H5</Button>
                        <Button size="sm" onClick={(e: any) => changeSizeTitle(e, { size: 'h6' })}>H6</Button>
                    </ButtonGroup>
                </Item>
            }

            <Item>
                <ButtonGroup aria-label="Basic example" size="sm">
                    <Button variant="secondary" onClick={(e: any) => changeSizeTitle(e, { textAling: 'text-start' })} ><i className="bi bi-justify-left" /></Button>
                    <Button variant="secondary" onClick={(e: any) => changeSizeTitle(e, { textAling: 'text-center' })} ><i className="bi bi-text-center" /></Button>
                    <Button variant="secondary" onClick={(e: any) => changeSizeTitle(e, { textAling: 'text-end' })} ><i className="bi bi-justify-right" /></Button>
                    <Button variant="secondary" onClick={(e: any) => changeSizeTitle(e, { textAling: 'text-justify' })} ><i className="bi bi-justify" /></Button>
                    <Button variant="secondary" onClick={(e: any) => changeSizeTitle(e, { fontWeight: editItem.fontWeight === 'fw-normal' ? 'fw-bolder' : 'fw-normal' })} ><i className="bi bi-type-bold" /></Button>
                    <Button variant="secondary" onClick={(e: any) => changeSizeTitle(e, { fontFamily: editItem.fontFamily === 'fw-normal' ? 'fst-italic' : 'fw-normal' })} ><i className="bi bi-type-italic" /></Button>
                    <Button variant="secondary" onClick={(e: any) => changeSizeTitle(e, { textDecoration: editItem.textDecoration ? '' : 'text-decoration-underline' })} ><i className="bi bi-type-underline" /></Button>
                </ButtonGroup>
            </Item>

            {
                editItem.type === 'list' &&
                <Item className="d-flex justify-content-center">
                    <ButtonGroup aria-label="Basic example" size="sm">
                        <Button variant="secondary" onClick={(e: any) => changeSizeTitle(e, { typeList: 'list-group-numbered' })} ><i className="bi bi-list-ol" /></Button>
                        <Button variant="secondary" onClick={(e: any) => changeSizeTitle(e, { typeList: 'list-group-points' })} ><i className="bi bi-list-ul" /></Button>
                    </ButtonGroup>
                </Item>
            }
        </Menu>
    )
}

export default MenuDoubleClick