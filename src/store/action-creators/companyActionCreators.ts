import {Dispatch} from "redux";
import {Company, CompanyActions, CompanyActionTypes, CompanyStreet} from "../../types/company";
import {SiteActions, SiteActionTypes} from "../../types/site";
import {companyApi} from "../../api/companyApi";
import streetFilter from "../../hooks/streetFilter";
import {StreetFilter} from "../../types/street";
import {FormikValues} from "formik";
import {Client} from "../../types/client";

export const loadCompanyActionCreator = () => async (dispatch: Dispatch<CompanyActions | SiteActions>): Promise<void>=>{
    dispatch({type: SiteActionTypes.LOADING, payload: true});
    try{
        const companies: Company[] = await companyApi.get();
        dispatch({type: CompanyActionTypes.LOAD_COMPANIES, payload: companies});
        dispatch({type: SiteActionTypes.LOADING, payload: false});
    }catch (err){
        dispatch({type: SiteActionTypes.ERROR, payload: err.toString()});
    }finally {
        dispatch({type: SiteActionTypes.LOADING, payload: false});
    }
}

export const loadCompanyStreetsActionCreator = (companyId: number) =>
    async (dispatch: Dispatch<CompanyActions|SiteActions>): Promise<void> => {
        dispatch({type: CompanyActionTypes.IS_LOADING, payload: true});
        dispatch({type: CompanyActionTypes.LOAD_STREETS, payload: null}); // nulled
        try{
            const streets = await companyApi.getStreets(companyId);
            dispatch({type: CompanyActionTypes.LOAD_ARCHIVE, payload: streets});
            dispatch({
                type: CompanyActionTypes.LOAD_STREETS,
                payload: streetFilter(StreetFilter.STREET, streets, companyId)});
        }catch (err){
            dispatch({type: SiteActionTypes.ERROR, payload: err.message.toString()});
        }finally {
            dispatch({type: CompanyActionTypes.IS_LOADING, payload: false});
        }
}

export const setActiveCompanyActionCreator = (company: Company | null) =>
    (dispatch: Dispatch<CompanyActions>)=>{
        dispatch({type: CompanyActionTypes.IS_LOADING, payload: true})
        dispatch({type: CompanyActionTypes.ACTIVE_STREET, payload: null});
        dispatch({type: CompanyActionTypes.ACTIVE_HOUSE, payload: null});
        dispatch({type: CompanyActionTypes.ACTIVE_APARTMENT, payload: null});
        dispatch({type: CompanyActionTypes.ACTIVE_COMPANY, payload:company});
        dispatch({type: CompanyActionTypes.IS_LOADING, payload: false})
}

export const setActiveStreetActionCreator = (street: CompanyStreet | null, archive: CompanyStreet[] | null) =>
    (dispatch: Dispatch<CompanyActions>): void => {
        dispatch({type: CompanyActionTypes.IS_LOADING, payload: true})
        dispatch({type: CompanyActionTypes.ACTIVE_STREET, payload: street});
        if(street!==null)
            dispatch({
                type: CompanyActionTypes.LOAD_HOUSES,
                payload: streetFilter(StreetFilter.HOUSE, archive, street.building)
            });
        dispatch({type: CompanyActionTypes.IS_LOADING, payload: false})
}
export const setActiveHouseActionCreator = (house: CompanyStreet | null, archive: CompanyStreet[] | null) =>
    (dispatch: Dispatch<CompanyActions>):void => {
        dispatch({type: CompanyActionTypes.IS_LOADING, payload: true})
        dispatch({
            type: CompanyActionTypes.ACTIVE_HOUSE,
            payload: house
        });
        if(house!==null){
            dispatch({
                type: CompanyActionTypes.LOAD_APARTMENTS,
                payload: streetFilter(StreetFilter.APARTMENT, archive, house.houseId)
            })
        }
        dispatch({type: CompanyActionTypes.IS_LOADING, payload: false})
}

export const setActiveApartmentActionCreator = (apartment: CompanyStreet) => (dispatch: Dispatch<CompanyActions>) => {
    dispatch({type: CompanyActionTypes.ACTIVE_APARTMENT, payload: apartment});
}
export const createClientActionCreator = (client: FormikValues, apartment: CompanyStreet, archive: CompanyStreet[]) =>
    async (dispatch: Dispatch<CompanyActions|SiteActions>): Promise<void> => {
        try{
            dispatch({type: CompanyActionTypes.IS_LOADING, payload:true})
            const newClient = await companyApi.createClient(client, apartment);
            if(newClient!== undefined){
                const updateArchive = archive.map( street => {
                    if(street.addressId === apartment.addressId) {
                        street.clients = [...street.clients, newClient]
                    }
                    return street;
                });
                dispatch({type: CompanyActionTypes.CREATE_CLIENTS, payload: updateArchive});
            }else dispatch({type: SiteActionTypes.ERROR, payload: 'Не удалось создать клиента'})
        }catch (err){
            dispatch({type: SiteActionTypes.ERROR, payload: err.toString()});
        }finally {
            dispatch({type: CompanyActionTypes.IS_LOADING, payload: false});
        }
}
export const RemoveClientActionCreator = (id: number, bindId: string,  apartment: CompanyStreet, archive: CompanyStreet[]) => async (dispatch: Dispatch<CompanyActions | CompanyActions>):Promise<void> => {
    try{
        await companyApi.removeClient(bindId);
        const newArchive = archive.map(streets => {
            if(streets.addressId === apartment.addressId){
                streets.clients = streets.clients.filter((client: Client) => client.id!==id);
            }
            return streets;
        });
        dispatch({type: CompanyActionTypes.REMOVE_CLIENTS, payload: newArchive});
    }catch (err){
        dispatch({type: CompanyActionTypes.IS_LOADING, payload: true});

    }
}

