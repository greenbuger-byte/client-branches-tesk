import {$request, ApiRoutes, errorResponse} from "./config";
import {FormikValues} from "formik";
import {Client} from "../types/client";
import {CompanyStreet} from "../types/company";

export const companyApi = {
    get: async () => {
        try{
            const {data} = await $request.get(ApiRoutes.COMPANY_LIST);
            return data;
        }catch (err){
           throw errorResponse(err);
        }
    },
    // load archive
    getStreets: async (companyId: number) => {
        try {
            const {data} = await $request.get(`${ApiRoutes.COMPANY_STREETS}?companyId=${companyId}`);
            return data;
        }catch (err){
            errorResponse(err);
        }
    },
    createClient: async (client: FormikValues, address: CompanyStreet) => {
        const saveClient = Object.assign({}, {...client, bindId: 0});
        try{
            const resultOfClientCreation = await $request.post(ApiRoutes.ADD_CLIENT, {...saveClient}, {
                headers: {"Content-Type": "application/json", "accept": "text/plain"}
            });
            if(resultOfClientCreation.data.result.toUpperCase() === "OK"){
                const clientBinding = await $request.put(ApiRoutes.BIND_CLIENT, {
                    clientId:resultOfClientCreation.data.id, addressId:  address.addressId
                },  {headers: {"Content-Type": "application/json", "accept": "text/plain"}});
                const updatedApartments = await $request.get(`${ApiRoutes.COMPANY_STREETS}?houseId=${address.houseId}`);
                let myNewBindId = "0"
                for(let addresses of updatedApartments.data){
                    if(address.addressId === addresses.addressId){
                        for(let client of addresses.clients){
                            if(client.id === resultOfClientCreation.data.id){
                                myNewBindId = client.bindId;
                            }
                        }
                    }
                }
                if(clientBinding.status === 200){
                    const newClient: Client = {
                        id:  resultOfClientCreation.data.id,
                        name: client.name,
                        email: client.email,
                        phone: client.phone,
                        bindId: myNewBindId
                    }
                    return newClient;
                }else throw Error("Не удалось добавить квартиру клиенту");
            }else{
                throw Error("Не удалось создать клиента")
            }
        }catch (err) {
            errorResponse(err);
        }
    },
    removeClient: async (id: string): Promise<any> => {
        try {
            const resultOfDeleted = await $request.delete(`${ApiRoutes.BIND_CLIENT}/${id}`);
            if(resultOfDeleted.status===200){
                return;
            }else{
                throw Error("Не удалось удалить клиента")
            }
        }catch (err){
            errorResponse(err);
        }
    }
}