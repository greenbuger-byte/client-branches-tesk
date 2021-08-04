import {Client} from "./client";

export enum CompanyActionTypes {
    LOAD_COMPANIES = "COMPANY.LOAD_COMPANIES",
    LOAD_STREETS = "COMPANY.LOAD_STREETS",
    ACTIVE_COMPANY = "COMPANY.ACTIVE_COMPANY",
    ACTIVE_STREET = "COMPANY.ACTIVE_STREET",
    ACTIVE_HOUSE = "COMPANY.ACTIVE_HOUSE",
    ACTIVE_APARTMENT = "COMPANY.ACTIVE_APARTMENT",
    IS_LOADING = "COMPANY.IS_LOADING",
    LOAD_HOUSES = "COMPANY.LOAD_HOUSES",
    LOAD_ARCHIVE = "COMPANY.LOAD_ARCHIVE",
    LOAD_APARTMENTS = "COMPANY.LOAD_APARTMENTS",
    LOAD_CLIENTS = "COMPANY.LOAD_CLIENTS",
    CREATE_CLIENTS  = "COMPANY.CREATE_CLIENTS",
    REMOVE_CLIENTS = "COMPANY.REMOVE_CLIENTS"
}

export interface Company {
    id: number;
    name: string;
}
export interface CompanyStreet {
    "clients": Client[],
    "accounts": any,
    "addressId": number,
    "streetId": number,
    "houseId": number,
    "streetName": string,
    "building": string,
    "corpus": string,
    "flat": string
}

export interface CompanyState {
    companyList: Company[];
    activeCompany: Company | null;
    streetsArchive: CompanyStreet[] | null; //==> неотсортированный архивный список
    streets: CompanyStreet[] | null;
    houses: CompanyStreet[] | null;
    apartments: CompanyStreet[] | null;
    activeStreet: CompanyStreet | null;
    activeHouse: CompanyStreet | null;
    activeApartment: CompanyStreet | null;
    loading: boolean
}

interface LoadCompanyAction {
    type: CompanyActionTypes.LOAD_COMPANIES;
    payload: Company[];
}

interface LoadStreetsCompanyAction {
    type: CompanyActionTypes.LOAD_STREETS;
    payload: CompanyStreet[] | null
}

interface ActiveCompanyAction {
    type: CompanyActionTypes.ACTIVE_COMPANY;
    payload: Company | null;
}

interface ActiveStreetCompanyAction{
    type: CompanyActionTypes.ACTIVE_STREET;
    payload: CompanyStreet | null
}

interface IsLoadingCompanyAction {
    type: CompanyActionTypes.IS_LOADING;
    payload: boolean
}
interface LoadStreetsArchive {
    type: CompanyActionTypes.LOAD_ARCHIVE;
    payload: CompanyStreet[];
}
interface LoadHousesCompanyAction {
    type: CompanyActionTypes.LOAD_HOUSES;
    payload: CompanyStreet[] | null;
}

interface LoadApartmentsAction {
    type: CompanyActionTypes.LOAD_APARTMENTS;
    payload: CompanyStreet[] | null;
}

interface ActiveHouseAction {
    type: CompanyActionTypes.ACTIVE_HOUSE;
    payload: CompanyStreet | null;
}

interface ActiveApartmentsAction {
    type: CompanyActionTypes.ACTIVE_APARTMENT;
    payload: CompanyStreet | null;
}

interface LoadClientAction {
    type: CompanyActionTypes.LOAD_CLIENTS;
    payload: CompanyStreet | null
}

interface CreateClientAction {
    type: CompanyActionTypes.CREATE_CLIENTS;
    payload: CompanyStreet[];
}
interface RemoveClientAction {
    type: CompanyActionTypes.REMOVE_CLIENTS;
    payload: CompanyStreet[];
}
export type CompanyActions = ActiveCompanyAction
    | LoadCompanyAction
    | ActiveStreetCompanyAction
    | IsLoadingCompanyAction
    | LoadStreetsCompanyAction
    | LoadStreetsArchive
    | LoadHousesCompanyAction
    | ActiveHouseAction
    | LoadApartmentsAction
    | ActiveApartmentsAction
    | LoadClientAction
    | CreateClientAction
    | RemoveClientAction;