import React from 'react';
import {
    Button,
    Card,
    CardWrapper,
    ClientHeader,
    ClientIcon,
    ClientRow,
    ClientsWrapper, ClientTitleCard,
    InfoMessage
} from "../styles/Global";
import {CompanyStreet} from "../types/company";
import {HiOutlineMail} from "react-icons/hi";
import {AiOutlinePhone} from "react-icons/ai"
import AddClient from "./AddClient";
import {useActions} from "../hooks/useActions";

const Clients: React.FC<{ clients: CompanyStreet, archive: CompanyStreet[]}> = ({ clients, archive}) => {
    const {RemoveClientActionCreator} = useActions();
    const removeClientHandler = (id: number, bindId: string): void=>{
        RemoveClientActionCreator(id,  bindId, clients, archive);
    }
    const sortedClients = clients.clients.sort((a,b) => {
       if(a["name"]>b["name"]) return 1;
       if(a["name"]<b["name"]) return -1;
       return 0;
    } );

    return (
        <>
            <ClientHeader>
                <h2>Список клиентов {clients.streetName} д. {clients.building}  / {clients.flat} </h2>
            </ClientHeader>
           <Card h={140}>
               <AddClient  apartment={clients} archive={archive}/>
           </Card>
            <ClientsWrapper>
                {clients.clients.length > 0 ?
                    sortedClients.map((client:any, ind:number) => (
                    <CardWrapper key={ind}>
                        <Card h={200}>
                            <ClientTitleCard>{client.name !== "" ? client.name : "Имя не указано"}</ClientTitleCard>
                            {client.email && <ClientRow><ClientIcon><HiOutlineMail/> </ClientIcon> {client.email}</ClientRow>}
                            {client.phone && <ClientRow><ClientIcon><AiOutlinePhone/></ClientIcon> {client.phone}</ClientRow>}
                            <Button onClick={()=>removeClientHandler(client.id, client.bindId)} bg={'#b61827'}>Удалить</Button>
                        </Card>
                    </CardWrapper>
                ))
                    : <InfoMessage>Нет клиентов</InfoMessage>
                }
            </ClientsWrapper>

        </>

    );
};

export default Clients;