import axios, {AxiosError} from "axios";
export enum ApiRoutes {
    COMPANY_LIST= "Request/companies",
    COMPANY_STREETS = "/HousingStock",
    ADD_CLIENT = "/HousingStock/client",
    BIND_CLIENT = "/HousingStock/bind_client"
}
export const $request = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export const errorResponse = (error: AxiosError<any>):string=> {
    if (error.response) {
        return error.response.data.message;
    }else{
        return error.message;
    }
}