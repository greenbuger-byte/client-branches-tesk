import {CompanyActions, CompanyActionTypes, CompanyState} from "../../types/company";

const initialState: CompanyState = {
    companyList: [],
    activeStreet: null,
    streetsArchive: null,
    streets: null,
    houses: null,
    apartments: null,
    activeCompany: null,
    activeHouse:  null,
    activeApartment: null,
    loading: false
}

export const companyReducer = (state: CompanyState = initialState, action: CompanyActions): CompanyState => {
    switch (action.type){
        case CompanyActionTypes.LOAD_COMPANIES:
            return {...state, companyList: action.payload};
        case CompanyActionTypes.LOAD_ARCHIVE:
            return {...state, streetsArchive: action.payload};
        case CompanyActionTypes.LOAD_STREETS:
            return {...state, streets: action.payload};
        case CompanyActionTypes.LOAD_HOUSES:
            return {...state, houses: action.payload}
        case CompanyActionTypes.LOAD_APARTMENTS:
            return {...state, apartments: action.payload}
        case CompanyActionTypes.LOAD_CLIENTS:
            return {...state}
        case CompanyActionTypes.ACTIVE_COMPANY:
            return {...state, activeCompany: action.payload};
        case CompanyActionTypes.ACTIVE_STREET:
            return {...state, activeStreet: action.payload};
        case CompanyActionTypes.ACTIVE_HOUSE:
            return {...state, activeHouse: action.payload};
        case CompanyActionTypes.ACTIVE_APARTMENT:
            return {...state, activeApartment: action.payload};
        case CompanyActionTypes.CREATE_CLIENTS:
            return {...state, streetsArchive: action.payload };
        case CompanyActionTypes.REMOVE_CLIENTS:
            return {...state, streetsArchive: action.payload}
        case CompanyActionTypes.IS_LOADING:
            return {...state, loading: action.payload};
        default:
            return {...state}
    }
}