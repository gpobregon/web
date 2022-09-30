import { Menu, Item } from "react-contexify";

const MenuDoubleClick = () => {
    return (
        <Menu id="menu-custom" theme="dark" className="menu-icon">
            <Item id="left">
                <i className="bi bi-text-left text-white fs-4 pe-4" />
            </Item>
            <Item id="center">
                <i className="bi bi-text-center text-white fs-4 pe-4" />
            </Item>
            <Item id="right">
                <i className="bi bi-text-right text-white fs-4 pe-4" />
            </Item>
            <Item id="right">
                <i className="bi bi-type-bold text-white fs-4 pe-4" />
            </Item>
            <Item id="right">
                <i className="bi bi-type-italic text-white fs-4 pe-4" />
            </Item>
            <Item id="right">
                <i className="bi bi-type-underline text-white fs-4 pe-4" />
            </Item>
        </Menu>
    )
}

export default MenuDoubleClick