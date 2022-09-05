import { Menu, Item, useContextMenu } from "react-contexify"

const CustomMenu = ({ children, id} : any) => {
    const { show } = useContextMenu({ id: id });  
    return (
        <Menu id={id} theme="dark">
            { children }
        </Menu>
    )
}

export default CustomMenu