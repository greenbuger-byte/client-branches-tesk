import React from 'react';
import {ListIcon, ListItems, ListItemText, ListUserIcon} from "../styles/Global";
import {CompanyStreet} from "../types/company";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {BiCaretRight} from "react-icons/bi"
import {AiOutlineUser} from "react-icons/all";

interface iMenuListProps {
    item: CompanyStreet;
    handler?: (street: CompanyStreet) => void;
    type: "street" | "house" | "apartment";
    icon?: string;
    active: boolean
}
const MenuList: React.FC<iMenuListProps> = (
    {item, handler, type, icon, active}) => {
    const {loading} = useTypedSelector(state=>state.company);
    if(loading && type==="street") return <> LOADING...</>
    return (
        <ListItems onClick={()=>handler!==undefined && handler(item)}>
            {type === "street" &&  <ListItemText> ул. {item.streetName} <ListIcon active={active}><BiCaretRight/></ListIcon></ListItemText>}
                {type === "house" && <ListItemText>д.{item.building}{item.corpus}<ListIcon active={active}><BiCaretRight/></ListIcon></ListItemText>}
            {type === "apartment" && <ListItemText>{item.flat} <ListUserIcon><AiOutlineUser/>{item.clients.length}</ListUserIcon></ListItemText>}
        </ListItems>
    )
}

export default MenuList;